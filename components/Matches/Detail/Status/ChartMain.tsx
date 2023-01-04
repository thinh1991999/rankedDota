import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  ChartOptions,
  Filler,
  ChartData,
  ScriptableLineSegmentContext,
  ChartDataset,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import isInteger from "lodash/isInteger";
import forEach from "lodash/forEach";
import cloneDeep from "lodash/cloneDeep";
import range from "lodash/range";
import max from "lodash/max";
import { useAppSelector } from "../../../../store";
import {
  COLOR_CHART_RADIANT_BG,
  COLOR_CHART_DIRE_BG,
  CLOCK_ICON_HTML,
  COLOR_GOLD_NW,
  RADIANT_ICON,
  DIRE_ICON,
  COLOR_EXP,
} from "../../../../share/constant";
import {
  drawLinePluginChart,
  nFormatter,
  formatTime,
  getGradient,
} from "../../../../share";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Filler
);

const externalTooltipHandler = (context: any) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  if (tooltip.dataPoints.length !== 2) return;
  const {
    dataset: { data: dataNw },
    dataIndex: idxNw,
  } = tooltip.dataPoints[0];
  const {
    dataset: { data: dataExp },
    dataIndex: idxExp,
  } = tooltip.dataPoints[1];
  const vlNw: number = dataNw[idxNw];
  const vlExp: number = dataExp[idxExp];
  let tooltipEl = chart.canvas.parentNode.querySelector("div");
  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.style.background = "#0d1b21";
    tooltipEl.style.borderRadius = "3px";
    tooltipEl.style.color = "white";
    tooltipEl.style.width = "180px";
    tooltipEl.style.border = "1px solid gray";
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = "none";
    tooltipEl.style.position = "absolute";
    tooltipEl.style.transform = "translate(-50%, 0)";
    tooltipEl.style.transition = "all .1s ease";
    tooltipEl.style.zIndex = "99999";
    const tootipContainer = document.createElement("div");
    tootipContainer.classList.add("tootipContainer");
    tootipContainer.style.width = "100%";
    tootipContainer.style.margin = "0px";
    tooltipEl.appendChild(tootipContainer);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }
  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map((b: any) => b.lines);
    const headerDiv = document.createElement("div");
    headerDiv.style.padding = "5px 10px";
    headerDiv.style.borderBottom = "1px solid gray";
    titleLines.forEach((title: number) => {
      const wrapDiv = document.createElement("div");
      wrapDiv.style.display = "flex";
      wrapDiv.style.justifyContent = "space-start";
      wrapDiv.style.alignItems = "center";
      const titleEl = document.createElement("h6");
      const iconTime = document.createElement("div");
      iconTime.innerHTML = CLOCK_ICON_HTML;
      titleEl.style.textAlign = "start";
      titleEl.style.marginLeft = "4px";
      titleEl.innerText = formatTime(title * 60 * 1000);
      wrapDiv.appendChild(iconTime);
      wrapDiv.appendChild(titleEl);
      headerDiv.appendChild(wrapDiv);
    });
    const bodyDiv = document.createElement("div");
    bodyDiv.style.padding = "5px 10px";

    // Network
    const wrDivNw = document.createElement("div");
    wrDivNw.style.backgroundColor = "inherit";
    wrDivNw.style.borderWidth = "0";
    wrDivNw.style.display = "flex";
    wrDivNw.style.justifyContent = "space-between";
    wrDivNw.style.alignItems = "center";
    const leftNw = document.createElement("div");
    leftNw.style.display = "flex";
    leftNw.style.alignItems = "center";
    const imgNwTitle = document.createElement("img");
    imgNwTitle.src = vlNw >= 0 ? RADIANT_ICON : DIRE_ICON;
    imgNwTitle.style.height = "15px";
    imgNwTitle.style.width = "15px";
    imgNwTitle.style.borderRadius = "4px";
    const spanNwTitle = document.createElement("span");
    spanNwTitle.style.fontSize = "14px";
    spanNwTitle.innerHTML = vlNw >= 0 ? "Radiant" : "Dire";
    spanNwTitle.style.marginLeft = "5px";
    leftNw.appendChild(imgNwTitle);
    leftNw.appendChild(spanNwTitle);
    const rightNw = document.createElement("div");
    rightNw.style.display = "flex";
    rightNw.style.alignItems = "center";
    const imgNwGold = document.createElement("img");
    imgNwGold.src = "/gold.png";
    imgNwGold.style.height = "10px";
    imgNwGold.style.width = "15px";
    const spanNwValue = document.createElement("span");
    spanNwValue.style.fontSize = "14px";
    spanNwValue.style.color = COLOR_GOLD_NW;
    spanNwValue.style.marginLeft = "5px";
    spanNwValue.innerHTML = nFormatter(vlNw >= 0 ? vlNw : -vlNw, 1);
    rightNw.appendChild(imgNwGold);
    rightNw.appendChild(spanNwValue);
    wrDivNw.appendChild(leftNw);
    wrDivNw.appendChild(rightNw);
    bodyDiv.appendChild(wrDivNw);

    // EXP
    const divExp = document.createElement("div");
    divExp.style.backgroundColor = "inherit";
    divExp.style.borderWidth = "0";
    divExp.style.display = "flex";
    divExp.style.justifyContent = "space-between";
    divExp.style.alignItems = "center";
    const leftExp = document.createElement("div");
    leftExp.style.display = "flex";
    leftExp.style.alignItems = "center";
    const imgExpTitle = document.createElement("img");
    imgExpTitle.src = vlExp >= 0 ? RADIANT_ICON : DIRE_ICON;
    imgExpTitle.style.height = "15px";
    imgExpTitle.style.width = "15px";
    imgExpTitle.style.borderRadius = "4px";
    const spanExpTitle = document.createElement("span");
    spanExpTitle.style.fontSize = "14px";
    spanExpTitle.innerHTML = vlExp >= 0 ? "Radiant" : "Dire";
    spanExpTitle.style.marginLeft = "5px";
    leftExp.appendChild(imgExpTitle);
    leftExp.appendChild(spanExpTitle);
    const rightExp = document.createElement("div");
    rightExp.style.display = "flex";
    rightExp.style.alignItems = "center";
    // const imgNwGold = document.createElement("img");
    // imgNwGold.src = "/gold.png";
    // imgNwGold.style.height = "15px";
    // imgNwGold.style.width = "15px";
    const spanExpValue = document.createElement("span");
    spanExpValue.style.fontSize = "14px";
    spanExpValue.style.color = COLOR_EXP;
    spanExpValue.style.marginLeft = "5px";
    spanExpValue.innerHTML = nFormatter(vlExp >= 0 ? vlExp : -vlExp, 1) + " XP";
    // rightNw.appendChild(imgNwGold);
    rightExp.appendChild(spanExpValue);
    divExp.appendChild(leftExp);
    divExp.appendChild(rightExp);
    bodyDiv.appendChild(divExp);
    // const wrDiv = document.createElement("div");
    // wrDiv.style.backgroundColor = "inherit";
    // wrDiv.style.borderWidth = "0";
    // wrDiv.style.display = "flex";
    // wrDiv.style.justifyContent = "space-between";
    // const span = document.createElement("span");
    // span.style.fontSize = "14px";
    // span.innerHTML = "Match Count";
    // const span2 = document.createElement("span");
    // span2.style.fontSize = "14px";
    // span2.style.color = "yellow";
    // // span2.innerHTML = nFormatter(matchCount, 1);
    // wrDiv.appendChild(span);
    // wrDiv.appendChild(span2);
    // bodyDiv.appendChild(wrDivNw);

    const divRoot = tooltipEl.querySelector(".tootipContainer");
    // Remove old children
    while (divRoot?.firstChild) {
      divRoot.firstChild.remove();
    }

    // Add new children
    divRoot.appendChild(headerDiv);
    divRoot.appendChild(bodyDiv);
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  const center = dataNw.length / 2;
  if (idxNw < center) {
    tooltipEl.style.left = positionX + tooltip.caretX + 10 + "px";
  } else if (idxNw > center) {
    tooltipEl.style.left = positionX + tooltip.caretX - 190 + "px";
  } else {
    tooltipEl.style.left = positionX + tooltip.caretX + "px";
  }
  tooltipEl.style.top = "50%";
  tooltipEl.style.transform = "translateY(-50%)";
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.top = positionY + tooltip.caretY + "px";
  tooltipEl.style.font = tooltip.options.bodyFont.string;
};

const pluginSeekTime = {
  id: "plug",
  beforeDraw: (chart: ChartJS) => {
    var ctx = chart.ctx;
    const labels = chart.data.labels as number[];
    const currTime = chart.data.datasets[0].data[0] || 0;
    var xAxis = chart.scales.x;
    var yAxis = chart.scales.y;
    ctx.save();
    const topY = chart.scales.y.top;
    const bottomY = chart.scales.y.bottom;
    var xCurr = xAxis.getPixelForValue(Number(currTime));
    labels.forEach((l, i) => {
      var x = xAxis.getPixelForValue(i);
      if (
        (x && (i % 5 === 0 || i === labels.length - 1) && i <= currTime) ||
        i === 0 ||
        i === labels.length - 1
      ) {
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "gray";
        ctx.stroke();
      }
    });
    yAxis.ticks.forEach((t, i) => {
      var x = yAxis.getPixelForTick(i);
      ctx.beginPath();
      if (i === 0 || i === yAxis.ticks.length - 1) {
        ctx.moveTo(xAxis.left, x);
        ctx.lineTo(xAxis.right, x);
      } else {
        ctx.moveTo(xAxis.left, x);
        ctx.lineTo(xCurr, x);
      }
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "gray";
      ctx.stroke();
    });
    if (currTime < labels.length - 1) {
      ctx.beginPath();
      ctx.moveTo(xCurr, topY);
      ctx.lineTo(xCurr, bottomY);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "white";
      ctx.stroke();
    }
    ctx.restore();
  },
};

const overTimeSeek = (ctx: ScriptableLineSegmentContext, timeSeek: number) => {
  return ctx.p1DataIndex <= timeSeek ? undefined : "rgba(162, 161, 161, 0.4)";
};

const ChartMain = () => {
  const matchDetail = useAppSelector((state) => state.matchDetail.matchDetail);
  const timeSeek = useAppSelector((state) => state.matchDetail.timeSeek);
  const [dataChart, setDataChart] = useState<ChartData | null>(null);
  const [options, setOptions] = useState<ChartOptions>();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const htmlLegendPlugin = {
    id: "htmlLegend",
    getNewDatasets: (
      chartData: ChartData | null,
      clear: boolean,
      index: number
    ): ChartData | null => {
      if (chartData) {
        const newChartData = { ...chartData };
        forEach(newChartData.datasets, (item: ChartDataset, idx) => {
          if (clear) {
            item.hidden = false;
          } else {
            if (idx !== index) {
              item.hidden = false;
            } else {
              item.hidden = true;
            }
          }
        });
        return newChartData;
      }
      return null;
    },
    beforeRender(chart: any) {
      const items = chart.options.plugins.legend.labels.generateLabels(chart);
      const ul = document.createElement("ul");
      ul.style.display = "flex";
      ul.style.justifyContent = "end";
      items.forEach((item: any, idx: number) => {
        if (idx === 0) return;
        const img = document.createElement("img");
        img.src =
          idx === 1 ? "/ExtendIcon/networth.svg" : "/ExtendIcon/exp.svg";
        img.style.marginRight = "4px";
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.alignItems = "center";
        li.style.fontSize = "0.9rem";
        li.style.marginLeft = "20px";
        li.style.cursor = "pointer";
        li.style.padding = "5px 10px";
        li.addEventListener("mouseenter", () => {
          li.style.border = "1px solid rgba(176, 176, 176, 0.2)";
          li.style.borderRadius = "4px";
          const newData = this.getNewDatasets(dataChart, false, idx);
          newData &&
            idx !== hoverIdx && [
              setDataChart(cloneDeep(newData)),
              setHoverIdx(idx),
            ];
        });
        li.addEventListener("mouseleave", () => {
          li.style.border = "unset";
          li.style.borderRadius = "0";
          const newData = this.getNewDatasets(dataChart, true, idx);
          console.log(newData);
          newData && [setDataChart(cloneDeep(newData)), setHoverIdx(null)];
        });
        li.appendChild(img);
        li.appendChild(document.createTextNode(item.text));
        ul.appendChild(li);
      });
      const jsLegend = document.getElementById("graphs-match-detail");
      if (jsLegend) {
        jsLegend.innerHTML = "";
        jsLegend.appendChild(ul);
      }
    },
  };

  useEffect(() => {
    if (!matchDetail) return;
    const { durationSeconds, radiantExperienceLeads, radiantNetworthLeads } =
      matchDetail;
    const arr: number[] = [];
    const timeUtc = moment.duration(durationSeconds * 1000).asMinutes();
    range(timeUtc).forEach((item) => {
      arr.push(item);
    });
    if (!isInteger(timeUtc)) arr.push(timeUtc);
    const maxY = max(radiantNetworthLeads.concat(radiantExperienceLeads));
    setDataChart({
      labels: arr,
      datasets: [
        {
          label: "CurrTime",
          data: [timeSeek],
          showLine: false,
        },
        {
          label: "Net Worth",
          data: radiantNetworthLeads,
          borderWidth: 1,
          borderColor: function (context: any) {
            const chart = context.chart;
            const { ctx, chartArea, scales } = chart;
            if (!chartArea) {
              return;
            }
            return getGradient(ctx, chartArea, scales);
          },
          pointRadius: 0,
          tension: 0.5,
          segment: {
            borderColor: (ctx) => {
              return overTimeSeek(ctx, timeSeek);
            },
            backgroundColor: (ctx) => {
              return overTimeSeek(ctx, timeSeek);
            },
          },
          fill: {
            target: {
              value: 0,
            },
            above: COLOR_CHART_RADIANT_BG,
            below: COLOR_CHART_DIRE_BG,
          },
        },
        {
          label: "Experience",
          data: radiantExperienceLeads,
          borderWidth: 1,
          tension: 0.5,
          borderColor: "gray",
          pointRadius: 0,
          segment: {
            borderColor: (ctx) => {
              return overTimeSeek(ctx, timeSeek);
            },
            backgroundColor: (ctx) => {
              return overTimeSeek(ctx, timeSeek);
            },
          },
          fill: {
            target: {
              value: 0,
            },
            above: "rgba(48, 47, 47, 1)",
            below: "rgba(48, 47, 47, 1)",
          },
        },
      ],
    });
    if (maxY) {
      setOptions({
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
            displayColors: false,
            enabled: false,
            external: externalTooltipHandler,
          },
        },
        hover: {
          mode: "index",
          intersect: false,
        },
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              display: true,
              callback: (value, idx, ticks) => {
                const nbVl = Number(value);
                if (idx === ticks.length - 1) {
                  if (nbVl % 5 === 0) {
                    return formatTime(nbVl * 60 * 1000);
                  } else {
                    return "";
                  }
                } else {
                  if (nbVl % 5 === 0) return formatTime(nbVl * 60 * 1000);
                }
              },
              padding: 10,
            },
            grid: {
              color: "rgba(107, 107, 107, 0.5)",
              tickLength: 0,
              display: false,
              // drawTicks:false
            },
          },
          y: {
            ticks: {
              stepSize: maxY / 2,
              display: true,
              callback: (value) => {
                const nb = Number(value);
                const result =
                  nb >= 0
                    ? nFormatter(Number(value), 1)
                    : "-" + nFormatter(-Number(value), 1);
                return result;
              },
              padding: 10,
            },
            min: -maxY,
            max: maxY,
            weight: 10,
            grid: {
              color: "rgba(107, 107, 107, 0.5)",
              tickLength: 0,
              display: false,
            },
          },
        },
      });
    }
  }, [matchDetail, timeSeek]);

  return (
    <>
      <div className="h-[200px] p-5 relative">
        {dataChart && (
          <Chart
            type="line"
            width={50}
            height={50}
            options={options}
            data={dataChart}
            plugins={[drawLinePluginChart, pluginSeekTime, htmlLegendPlugin]}
            redraw={true}
          />
        )}
      </div>
      <div id="graphs-match-detail" className="flex justify-center "></div>
    </>
  );
};

export default ChartMain;
