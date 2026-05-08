// 1. Static Imports for amCharts
import * as am5 from "https://cdn.amcharts.com/lib/5/index.js";
import * as am5xy from "https://cdn.amcharts.com/lib/5/xy.js";
import am5themes_Animated from "https://cdn.amcharts.com/lib/5/themes/Animated.js";

export default async function decorate(block) {
  // 2. Read Authored Content from Universal Editor
  const titleRow = block.children[0];
  const dataRow = block.children[1];

  const titleText = titleRow ? titleRow.textContent.trim() : "";
  let dataUrl = dataRow ? dataRow.textContent.trim() : "";
  if (dataRow && dataRow.querySelector("a")) {
    dataUrl = dataRow.querySelector("a").href;
  }

  // 3. Clean up raw DOM and build layout
  block.innerHTML = "";

  if (titleText) {
    const header = document.createElement("div");
    header.className = "chart-header";
    header.innerHTML = `<h3>${titleText}</h3>`;
    block.append(header);
  }

  const chartDiv = document.createElement("div");
  chartDiv.className = "amcharts-container";
  block.append(chartDiv);

  // 4. Fetch Data (with fallback to generator for testing)
  let chartData = [];
  try {
    if (dataUrl) {
      const response = await fetch(dataUrl);
      const json = await response.json();
      chartData = json.data; // Expects properties: date, fundValue, benchmarkValue
    } else {
      // Fallback: Generate random data if no URL is provided (based on your snippet)
      let date = new Date(2023, 0, 1).getTime();
      let fundValue = 10500;
      let benchmarkValue = 10000;
      for (let i = 0; i < 900; i++) {
        fundValue += Math.round(Math.random() * 100 - 45);
        benchmarkValue += Math.round(Math.random() * 80 - 38);
        chartData.push({
          date: date + i * 86400000, // add days
          fundValue: fundValue,
          benchmarkValue: benchmarkValue,
        });
      }
    }
  } catch (e) {
    console.error("Failed to load chart data:", e);
    return;
  }

  // 5. Initialize amCharts
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

  // Axes
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

  // Define Colors based on your image
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
  seriesFund.data.setAll(chartData);

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
  seriesBenchmark.data.setAll(chartData);

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

  // --- DRAG BUTTON / RANGE LOGIC (From your snippet) ---
  const rangeDate = new Date(
    chartData[Math.round(chartData.length / 1.5)].date,
  ); // Place button at 2/3rds
  const rangeTime = rangeDate.getTime();

  const seriesRangeDataItem = xAxis.makeDataItem({});
  const seriesRange = seriesFund.createAxisRange(seriesRangeDataItem);

  // Create the blue fill pattern you had in your code (adjusted to blue to match button)
  seriesRange.fills.template.setAll({ visible: true, opacity: 0.3 });
  seriesRange.fills.template.set(
    "fillPattern",
    am5.LinePattern.new(root, {
      color: fundColor,
      rotation: 45,
      strokeWidth: 2,
      width: 2000,
      height: 2000,
      fill: am5.color(0xffffff),
    }),
  );
  seriesRange.strokes.template.set("stroke", fundColor);

  xAxis.onPrivate("max", function (value) {
    seriesRangeDataItem.set("endValue", value);
    seriesRangeDataItem.set("value", rangeTime);
  });

  const range = xAxis.createAxisRange(xAxis.makeDataItem({}));
  range.set("value", rangeTime);
  range.get("grid").setAll({ strokeOpacity: 1, stroke: fundColor });

  // Custom blue drag button
  const resizeButton = am5.Button.new(root, {
    themeTags: ["resize", "horizontal"],
    icon: am5.Graphics.new(root, { themeTags: ["icon"] }),
    background: am5.RoundedRectangle.new(root, {
      fill: fundColor,
      cornerRadiusTL: 20,
      cornerRadiusTR: 20,
      cornerRadiusBL: 20,
      cornerRadiusBR: 20,
    }),
  });

  resizeButton.adapters.add("y", () => 0);
  resizeButton.adapters.add("x", (x) =>
    Math.max(0, Math.min(chart.plotContainer.width(), x)),
  );

  resizeButton.events.on("dragged", function () {
    const x = resizeButton.x();
    const position = xAxis.toAxisPosition(x / chart.plotContainer.width());
    const value = xAxis.positionToValue(position);

    range.set("value", value);
    seriesRangeDataItem.set("value", value);
    seriesRangeDataItem.set("endValue", xAxis.getPrivate("max"));
  });

  range.set("bullet", am5xy.AxisBullet.new(root, { sprite: resizeButton }));

  // Animate on load
  seriesFund.appear(1000);
  seriesBenchmark.appear(1000);
  chart.appear(1000, 100);
}
