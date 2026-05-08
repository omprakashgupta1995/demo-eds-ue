export default async function decorate(block) {
  // 1. Parse the Universal Editor DOM
  // The first child contains the parent fields (the richtext ul)
  const filterRow = block.children[0];
  const ul = filterRow ? filterRow.querySelector("ul") : null;
  const tabNames = ul
    ? Array.from(ul.querySelectorAll("li")).map((li) => li.textContent.trim())
    : [];

  // The remaining children are the 'fund-chart-item' rows containing the data URLs
  const itemRows = Array.from(block.children).slice(1);

  // Map the tab names to their respective JSON URLs
  const tabData = tabNames.map((name, index) => {
    const row = itemRows[index];
    let url = "";
    if (row) {
      const a = row.querySelector("a");
      url = a ? a.href : row.textContent.trim();
    }
    return { name, url };
  });

  // 2. Build the UI Layout
  block.innerHTML = ""; // Clear raw authored DOM

  const topBar = document.createElement("div");
  topBar.className = "chart-top-bar";

  // Create Tabs UI
  const tabsContainer = document.createElement("ul");
  tabsContainer.className = "filter-tabs";

  // Create CAGR Text Element
  const cagrDisplay = document.createElement("div");
  cagrDisplay.className = "cagr-display";
  cagrDisplay.innerHTML = `CAGR <span class="cagr-val">--</span>`;

  topBar.append(tabsContainer);
  topBar.append(cagrDisplay);
  block.append(topBar);

  const chartDiv = document.createElement("div");
  chartDiv.className = "amcharts-container";
  block.append(chartDiv);

  // 3. Bulletproof amCharts Loader for EDS
  const loadAmCharts = async () => {
    if (window.am5) return;
    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.append(script);
      });

    // Must load in exactly this order!
    await loadScript("https://cdn.amcharts.com/lib/5/index.js");
    await loadScript("https://cdn.amcharts.com/lib/5/xy.js");
    await loadScript("https://cdn.amcharts.com/lib/5/themes/Animated.js");
  };

  try {
    await loadAmCharts();
  } catch (error) {
    console.error("Failed to load amCharts", error);
    chartDiv.innerHTML = "<p>Error loading chart library.</p>";
    return;
  }

  // Map to the global variables created by the amCharts scripts
  const am5 = window.am5;
  const am5xy = window.am5xy;
  const am5themes_Animated = window.am5themes_Animated;

  // 4. Initialize the Chart (Empty State)
  const root = am5.Root.new(chartDiv);
  root.setThemes([am5themes_Animated.new(root)]);

  const chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true,
      paddingLeft: 0,
    }),
  );

  // Cursors
  const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
  cursor.lineX.set("forceHidden", true);
  cursor.lineY.set("forceHidden", true);

  const xAxis = chart.xAxes.push(
    am5xy.DateAxis.new(root, {
      baseInterval: { timeUnit: "day", count: 1 },
      renderer: am5xy.AxisRendererX.new(root, {
        minorGridEnabled: true,
        minGridDistance: 80,
      }),
    }),
  );

  const yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
    }),
  );

  // Define Colors
  const fundColor = am5.color(0x6b81ff); // Blue
  const benchmarkColor = am5.color(0xff9800); // Orange

  // Series 1: Large and Midcap Fund (Blue)
  const seriesFund = chart.series.push(
    am5xy.LineSeries.new(root, {
      name: "Large and Midcap Fund",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "fundValue",
      valueXField: "date",
      stroke: fundColor,
      tooltip: am5.Tooltip.new(root, { labelText: "{valueY}" }),
    }),
  );
  seriesFund.fills.template.setAll({
    fillOpacity: 0.2,
    visible: true,
    fill: fundColor,
  });

  // Series 2: Benchmark (Orange)
  const seriesBenchmark = chart.series.push(
    am5xy.LineSeries.new(root, {
      name: "TRI NFT LM 250",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "benchmarkValue",
      valueXField: "date",
      stroke: benchmarkColor,
    }),
  );
  seriesBenchmark.fills.template.setAll({
    fillOpacity: 0.2,
    visible: true,
    fill: benchmarkColor,
  });

  // Add Scrollbar
  chart.set(
    "scrollbarX",
    am5.Scrollbar.new(root, { orientation: "horizontal" }),
  );

  // Add Legend at the bottom
  const legend = chart.children.push(
    am5.Legend.new(root, {
      centerX: am5.p50,
      x: am5.p50,
      y: am5.percent(100),
      marginTop: 20,
    }),
  );
  legend.data.setAll(chart.series.values);

  // 5. JavaScript CAGR Calculator
  const calculateCAGR = (data) => {
    if (!data || data.length < 2) return 0;

    // Sort just in case data comes back out of order
    const sorted = [...data].sort((a, b) => a.date - b.date);
    const initialVal = sorted[0].fundValue;
    const finalVal = sorted[sorted.length - 1].fundValue;

    // Calculate time difference in years
    const msDiff = sorted[sorted.length - 1].date - sorted[0].date;
    const years = msDiff / (1000 * 60 * 60 * 24 * 365.25);

    if (years <= 0 || initialVal <= 0) return 0;

    const cagr = (Math.pow(finalVal / initialVal, 1 / years) - 1) * 100;
    return cagr.toFixed(2);
  };

  // 6. Data Fetching and Update Logic
  const updateChartData = async (tab) => {
    let data = [];

    try {
      if (tab.url) {
        // If author provided a URL, fetch the real data
        const response = await fetch(tab.url);
        const json = await response.json();
        data = json.data;
      } else {
        // FALLBACK: Generate dummy data if no URL is provided
        let days =
          tab.name === "1Y"
            ? 365
            : tab.name === "3Y"
              ? 1095
              : tab.name === "5Y"
                ? 1825
                : 3000;
        let date = new Date().getTime() - days * 86400000; // go back 'days' amount from today
        let fVal = 10000,
          bVal = 10000;

        for (let i = 0; i < days; i++) {
          fVal += Math.random() * 100 - 45;
          bVal += Math.random() * 80 - 38;
          data.push({
            date: date + i * 86400000,
            fundValue: fVal,
            benchmarkValue: bVal,
          });
        }
      }
    } catch (e) {
      console.error("Failed to load chart data:", e);
      return;
    }

    // Update the chart series (amCharts will animate this automatically)
    seriesFund.data.setAll(data);
    seriesBenchmark.data.setAll(data);

    // Zoom out to show full new range
    xAxis.zoom(0, 1, 1000);

    // Update the CAGR text dynamically
    const cagrPercent = calculateCAGR(data);
    cagrDisplay.innerHTML = `CAGR ${tab.name} <span>${cagrPercent}%</span>`;
  };

  // 7. Wire up the Tab Buttons
  tabData.forEach((tab, index) => {
    const li = document.createElement("li");
    li.textContent = tab.name;

    // Set the first tab as active by default
    if (index === 0) li.classList.add("active");

    li.addEventListener("click", () => {
      // Manage active state classes
      tabsContainer
        .querySelectorAll("li")
        .forEach((el) => el.classList.remove("active"));
      li.classList.add("active");

      // Update the chart with new data
      updateChartData(tab);
    });

    tabsContainer.append(li);
  });

  // Load the initial data for the first tab
  if (tabData.length > 0) {
    updateChartData(tabData[0]);
    seriesFund.appear(1000);
    seriesBenchmark.appear(1000);
    chart.appear(1000, 100);
  }
}
