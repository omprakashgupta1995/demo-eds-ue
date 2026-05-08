import * as am5 from "https://cdn.amcharts.com/lib/5/index.js";
import * as am5xy from "https://cdn.amcharts.com/lib/5/xy.js";
import * as am5themes_Animated from "https://cdn.amcharts.com/lib/5/themes/Animated.js";
// NO IMPORTS AT THE TOP! We must inject them safely below.

export default async function decorate(block) {
  try {
    // 1. Parse the Universal Editor DOM securely
    const tabData = Array.from(block.children).map((row) => {
      const nameDiv = row.children[0];
      const urlDiv = row.children[1];

      const name = nameDiv ? nameDiv.textContent.trim() : "Tab";
      let url = "";

      if (urlDiv) {
        const a = urlDiv.querySelector("a");
        url = a ? a.href : urlDiv.textContent.trim();
      }

      // Hide the original row instead of destroying it
      row.style.display = "none";

      return { name, url };
    });

    // 2. Build the Custom UI Layout
    const topBar = document.createElement("div");
    topBar.className = "chart-top-bar";

    const tabsContainer = document.createElement("ul");
    tabsContainer.className = "filter-tabs";

    const cagrDisplay = document.createElement("div");
    cagrDisplay.className = "cagr-display";
    cagrDisplay.innerHTML = `CAGR <span class="cagr-val">--</span>`;

    topBar.append(tabsContainer);
    topBar.append(cagrDisplay);
    block.append(topBar);

    const chartDiv = document.createElement("div");
    chartDiv.className = "amcharts-container";
    block.append(chartDiv);

    if (tabData.length === 0) {
      chartDiv.innerHTML =
        "<p style='padding: 20px; color: gray;'>Please add Tab Items in the Universal Editor.</p>";
      return;
    }

    // 3. Bulletproof amCharts Loader for AEM EDS
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

    await loadAmCharts();

    // Grab the safely injected libraries from the global window object
    const am5 = window.am5;
    const am5xy = window.am5xy;
    const am5themes_Animated = window.am5themes_Animated;

    // 4. Initialize the Chart
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
        paddingRight: 20,
      }),
    );

    // Cursors
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "none",
      }),
    );
    cursor.lineX.set("forceHidden", true);
    cursor.lineY.set("forceHidden", true);

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: false,
          minGridDistance: 80,
        }),
      }),
    );

    // Match the solid blue line at the bottom of the X-axis
    xAxis.get("renderer").setAll({
      strokeOpacity: 1,
      stroke: am5.color(0x4a68f6),
      strokeWidth: 1,
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      }),
    );

    // Hide horizontal grid lines completely
    yAxis.get("renderer").grid.template.setAll({ strokeOpacity: 0 });

    // Make Y-Axis text light gray
    yAxis.get("renderer").labels.template.setAll({ fill: am5.color(0x888888) });

    // Define Colors
    const fundColor = am5.color(0x6b81ff);
    const benchmarkColor = am5.color(0xff9800);

    // Series 1: Large and Midcap Fund (Blue)
    const seriesFund = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Large and Midcap Fund",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "fundValue",
        valueXField: "date",
        stroke: fundColor,
        strokeWidth: 1.5,
        tooltip: am5.Tooltip.new(root, { labelText: "{valueY}" }),
      }),
    );

    // Blue Gradient Fill
    seriesFund.fills.template.setAll({
      visible: true,
      fillOpacity: 1,
      fillGradient: am5.LinearGradient.new(root, {
        stops: [
          { color: fundColor, opacity: 0.3 },
          { color: am5.color(0xffffff), opacity: 0 },
        ],
        rotation: 90,
      }),
    });

    // Add the distinctive Blue Button to the end of the chart line
    seriesFund.bullets.push(function (root, series, dataItem) {
      if (dataItem.dataContext && dataItem.dataContext.isLast) {
        const container = am5.Container.new(root, {
          centerX: am5.p50,
          centerY: am5.p50,
        });

        container.children.push(
          am5.Circle.new(root, {
            radius: 14,
            fill: fundColor,
            stroke: am5.color(0xffffff),
            strokeWidth: 1,
            tooltipText: "Current Value: {valueY}",
          }),
        );

        container.children.push(
          am5.Line.new(root, {
            stroke: am5.color(0xffffff),
            strokeWidth: 2,
            points: [
              { x: -5, y: 0 },
              { x: 5, y: 0 },
            ],
            centerX: am5.p50,
            centerY: am5.p50,
          }),
        );

        return am5.Bullet.new(root, { sprite: container });
      }
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
        strokeWidth: 1.5,
      }),
    );

    // Orange Gradient Fill
    seriesBenchmark.fills.template.setAll({
      visible: true,
      fillOpacity: 1,
      fillGradient: am5.LinearGradient.new(root, {
        stops: [
          { color: benchmarkColor, opacity: 0.2 },
          { color: am5.color(0xffffff), opacity: 0 },
        ],
        rotation: 90,
      }),
    });

    // Add Scrollbar
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, { orientation: "horizontal" }),
    );

    // Legend at the bottom
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        y: am5.percent(100),
        marginTop: 20,
      }),
    );

    // Apply rounded corners directly to the marker template
    legend.markers.template.setAll({
      width: 14,
      height: 14,
      cornerRadiusTL: 10,
      cornerRadiusTR: 10,
      cornerRadiusBR: 10,
      cornerRadiusBL: 10,
    });

    legend.data.setAll(chart.series.values);

    // 4. JavaScript CAGR Calculator
    const calculateCAGR = (data) => {
      if (!data || data.length < 2) return 0;
      const sorted = [...data].sort((a, b) => a.date - b.date);
      const initialVal = sorted[0].fundValue;
      const finalVal = sorted[sorted.length - 1].fundValue;
      const msDiff = sorted[sorted.length - 1].date - sorted[0].date;
      const years = msDiff / (1000 * 60 * 60 * 24 * 365.25);

      if (years <= 0 || initialVal <= 0) return 0;
      const cagr = (Math.pow(finalVal / initialVal, 1 / years) - 1) * 100;
      return cagr.toFixed(2);
    };

    // 5. Data Fetching and Update Logic
    const updateChartData = async (tab) => {
      let data = [];

      try {
        if (tab.url) {
          const response = await fetch(tab.url);
          const json = await response.json();
          data = json.data;
        } else {
          // FALLBACK: Generate dummy data
          let days =
            tab.name === "1Y"
              ? 365
              : tab.name === "3Y"
                ? 1095
                : tab.name === "5Y"
                  ? 1825
                  : 3000;
          let date = new Date().getTime() - days * 86400000;
          let fVal = 10000,
            bVal = 10000;

          for (let i = 0; i < days; i++) {
            fVal += Math.random() * 100 - 45;
            bVal += Math.random() * 80 - 38;
            data.push({
              date: date + i * 86400000,
              fundValue: fVal,
              benchmarkValue: bVal,
              isLast: i === days - 1,
            });
          }
        }

        if (data.length > 0 && tab.url) {
          data[data.length - 1].isLast = true;
        }
      } catch (e) {
        console.error("Failed to load chart data:", e);
        return;
      }

      seriesFund.data.setAll(data);
      seriesBenchmark.data.setAll(data);
      xAxis.zoom(0, 1, 1000);

      const cagrPercent = calculateCAGR(data);
      cagrDisplay.innerHTML = `CAGR ${tab.name} <span>${cagrPercent}%</span>`;
    };

    // 6. Wire up the Tab Buttons
    tabData.forEach((tab, index) => {
      if (!tab.name) return;

      const li = document.createElement("li");
      li.textContent = tab.name;

      if (index === 0) li.classList.add("active");

      li.addEventListener("click", () => {
        tabsContainer
          .querySelectorAll("li")
          .forEach((el) => el.classList.remove("active"));
        li.classList.add("active");
        updateChartData(tab);
      });

      tabsContainer.append(li);
    });

    // Load the initial data
    if (tabData.length > 0) {
      updateChartData(tabData[0]);
      seriesFund.appear(1000);
      seriesBenchmark.appear(1000);
      chart.appear(1000, 100);
    }
  } catch (err) {
    console.error("Chart Render Error:", err);
    block.innerHTML = `<div style="padding: 20px; border: 1px solid red; color: red; background: #fffafb; border-radius: 8px;">
      <strong>Chart Error:</strong> ${err.message}
    </div>`;
  }
}
