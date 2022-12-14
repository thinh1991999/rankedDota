import forEach from "lodash/forEach";
import orderBy from "lodash/orderBy";
import moment from "moment";
import React, { useEffect, useState, useMemo } from "react";
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
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { MatchGraph } from "../../../interfaces/matches";
import { nFormatter } from "../../../share";
import { useGetStylesTheme } from "../../../share/customHooks";

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
  const { chart, tooltip } = context;
  const {
    dataset: { data },
    dataIndex,
  } = tooltip.dataPoints[0];
  const sortDataPoints = orderBy(
    tooltip.dataPoints,
    (item) => {
      return item.raw;
    },
    "desc"
  );
  let tooltipEl = chart.canvas.parentNode.querySelector("div");
  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.style.background = "#0d1b21";
    tooltipEl.style.borderRadius = "3px";
    tooltipEl.style.color = "white";
    tooltipEl.style.width = "250px";
    tooltipEl.style.border = "1px solid gray";
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = "none";
    tooltipEl.style.position = "absolute";
    tooltipEl.style.transform = "translate(-50%, 0)";
    tooltipEl.style.transition = "all .1s ease";
    tooltipEl.style.zIndex = "99999";
    const tootipContainer = document.createElement("div");
    tootipContainer.classList.add("tooltipRank");
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

  if (tooltip.body) {
    const title = tooltip.title[0] || 0;
    const titleTime = moment.unix(Number(title)).format("MMMM D, YYYY h:mm A");
    const headerDiv = document.createElement("div");
    headerDiv.style.padding = "5px 10px";
    headerDiv.style.borderBottom = "1px solid gray";
    const titleEl = document.createElement("h6");
    titleEl.style.textAlign = "start";
    titleEl.style.fontSize = "14px";
    titleEl.innerText = titleTime;
    headerDiv.appendChild(titleEl);
    const bodyDiv = document.createElement("div");
    bodyDiv.style.padding = "5px 10px";
    forEach(sortDataPoints, (item) => {
      const {
        dataset: { label, borderColor },
        formattedValue,
      } = item;
      const wrDiv = document.createElement("div");
      wrDiv.style.backgroundColor = "inherit";
      wrDiv.style.borderWidth = "0";
      wrDiv.style.display = "flex";
      wrDiv.style.justifyContent = "space-between";
      wrDiv.style.margin = "10px 0";
      const span = document.createElement("span");
      span.style.fontSize = "14px";
      span.innerHTML = label;
      span.style.color = borderColor;
      const span2 = document.createElement("span");
      span2.style.fontSize = "14px";
      span2.style.color = "rgba(255, 255, 255, 0.6)";
      span2.innerHTML = formattedValue;
      wrDiv.appendChild(span);
      wrDiv.appendChild(span2);
      bodyDiv.appendChild(wrDiv);
    });
    const divRoot = tooltipEl.querySelector(".tooltipRank");
    // Remove old children
    while (divRoot?.firstChild) {
      divRoot.firstChild.remove();
    }
    divRoot.appendChild(headerDiv);
    divRoot.appendChild(bodyDiv);
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  const center = data.length / 2;
  if (dataIndex < center) {
    tooltipEl.style.left = positionX + tooltip.caretX + 10 + "px";
  } else if (dataIndex > center) {
    tooltipEl.style.left = positionX + tooltip.caretX - 260 + "px";
  } else {
    tooltipEl.style.left = positionX + tooltip.caretX + "px";
  }
  // tooltipEl.style.top = positionY + tooltip.caretY + "px";
  tooltipEl.style.top = "50%";
  tooltipEl.style.transform = "translateY(-50%)";
  tooltipEl.style.font = tooltip.options.bodyFont.string;
};

const Rank = ({
  rank,
}: {
  rank: {
    HERALD: MatchGraph[];
    GUARDIAN: MatchGraph[];
    CRUSADER: MatchGraph[];
    ARCHON: MatchGraph[];
    LEGEND: MatchGraph[];
    ANCIENT: MatchGraph[];
    DIVINE: MatchGraph[];
    IMMORTAL: MatchGraph[];
  };
}) => {
  const { styles } = useGetStylesTheme();
  const [data, setData] = useState<ChartData | null>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const options: ChartOptions = useMemo(() => {
    return {
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
            callback: function (val: string, index: number, values: any) {
              if (data?.labels) {
                const value = data.labels[index];
                if (typeof value === "number") {
                  const time = moment.unix(value);
                  const year = time.year();
                  const month = time.month() + 1;
                  const date = time.date();
                  if (month === 1 && date === 1) {
                    return year;
                  }
                }
              }
            },
            color: styles.tick,
            padding: 10,
          },
          grid: {
            color: "rgba(107, 107, 107, 0.5)",
            tickLength: 8,
          },
        } as any,
        y: {
          ticks: {
            callback: function (val: any, index: number, values: any) {
              if (index % 2 === 0) return nFormatter(val, 0);
            },
            color: styles.tick,
            padding: 10,
          },
          weight: 10,
          grid: {
            color: "rgba(107, 107, 107, 0.5)",
            tickLength: 0,
          },
        },
      },
    };
  }, [styles, data]);

  const htmlLegendPlugin = {
    id: "htmlLegend",
    getNewDatasets: (
      chartData: ChartData | null,
      clear: boolean,
      index: number
    ): ChartData | null => {
      if (chartData) {
        const newChartData = { ...chartData };
        forEach(newChartData.datasets, (item: any, idx) => {
          if (clear) {
            item.fill = true;
          } else {
            if (idx !== index) {
              item.fill = false;
            } else {
              item.fill = true;
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
      ul.style.flexWrap = "wrap";
      ul.style.justifyContent = "end";
      items.forEach((item: any, idx: number) => {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.alignItems = "center";
        li.style.fontSize = "0.9rem";
        li.style.padding = "10px";
        li.style.cursor = "pointer";
        li.addEventListener("mouseenter", () => {
          const newData = this.getNewDatasets(data, false, idx);
          setHoverIdx(idx);
          idx !== hoverIdx && setData(newData);
        });
        li.addEventListener("mouseleave", () => {
          const newData = this.getNewDatasets(data, true, idx);
          setData(newData);
          setHoverIdx(null);
        });
        const boxSpan = document.createElement("span");
        boxSpan.style.width = "15px";
        boxSpan.style.height = "15px";
        boxSpan.style.borderRadius = "50%";
        boxSpan.style.backgroundColor = item.strokeStyle;
        boxSpan.style.display = "block";
        boxSpan.style.marginRight = "5px";
        li.appendChild(boxSpan);
        li.appendChild(document.createTextNode(item.text));
        ul.appendChild(li);
      });
      const jsLegend = document.getElementById("graphs-rank");
      if (jsLegend) {
        jsLegend.innerHTML = "";
        jsLegend.appendChild(ul);
      }
    },
  };

  const lineDraw = {
    id: "lineDraw",
    beforeDraw: (chart: ChartJS) => {
      const activeEle = chart.getActiveElements();
      if (activeEle.length <= 0) return;
      const { ctx, scales } = chart;
      const { x } = activeEle[0].element;
      const topY = scales.y.top;
      const bottomY = scales.y.bottom;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "white";
      ctx.stroke();
      ctx.restore();
    },
  };

  useEffect(() => {
    const {
      HERALD,
      GUARDIAN,
      CRUSADER,
      ARCHON,
      LEGEND,
      ANCIENT,
      DIVINE,
      IMMORTAL,
    } = rank;
    const months: number[] = [];
    const labels: number[] = [];
    const dataHerald: number[] = [];
    const dataGuarian: number[] = [];
    const dataCrusader: number[] = [];
    const dataArchon: number[] = [];
    const dataLegend: number[] = [];
    const dataAncient: number[] = [];
    const dataDivine: number[] = [];
    const dataImomortal: number[] = [];
    forEach(HERALD, (match) => {
      const { month } = match;
      if (!months.includes(month)) months.push(month);
    });
    const newMonths = orderBy(months, (month) => month, "asc");
    forEach(newMonths, (month) => {
      labels.push(month);
      const getCheckMatch = (arrMatch: MatchGraph[]) => {
        let total = 0;
        forEach(arrMatch, (match) => {
          if (match.month === month) {
            total += match.matchCount;
          }
        });
        return total;
      };
      dataHerald.push(Math.round(getCheckMatch(HERALD) / 10));
      dataGuarian.push(Math.round(getCheckMatch(GUARDIAN) / 10));
      dataCrusader.push(Math.round(getCheckMatch(CRUSADER) / 10));
      dataArchon.push(Math.round(getCheckMatch(ARCHON) / 10));
      dataLegend.push(Math.round(getCheckMatch(LEGEND) / 10));
      dataAncient.push(Math.round(getCheckMatch(ANCIENT) / 10));
      dataDivine.push(Math.round(getCheckMatch(DIVINE) / 10));
      dataImomortal.push(Math.round(getCheckMatch(IMMORTAL) / 10));
    });
    setData({
      labels,
      datasets: [
        {
          label: "Herald",
          data: dataHerald,
          borderColor: "rgba(41, 255, 92, 1)",
          fill: true,
          backgroundColor: "rgba(41, 255, 92, 0.4)",
          pointRadius: 0,
        },
        {
          label: "Guardian",
          data: dataGuarian,
          borderColor: "rgba(129, 69, 7, 1)",
          fill: true,
          backgroundColor: "rgba(129, 69, 7, 0.4)",
          pointRadius: 0,
        },
        {
          label: "Crusader",
          data: dataCrusader,
          borderColor: "rgba(59, 73, 254, 1)",
          fill: true,
          backgroundColor: "rgba(59, 73, 254, 0.4)",
          pointRadius: 0,
        },
        {
          label: "Archon",
          data: dataArchon,
          borderColor: "rgba(59, 220, 254, 1)",
          fill: true,
          backgroundColor: "rgba(59, 220, 254, 0.4)",
          pointRadius: 0,
        },
        {
          label: "Legend",
          data: dataLegend,
          borderColor: "rgba(254, 59, 59, 1)",
          fill: true,
          backgroundColor: "rgba(254, 59, 59, 0.4)",
          pointRadius: 0,
        },
        {
          label: "Ancient",
          data: dataAncient,
          borderColor: "rgba(207, 59, 254, 1)",
          fill: true,
          backgroundColor: "rgba(207, 59, 254, 0.4)",
          pointRadius: 0,
        },
        {
          label: "Divine",
          data: dataDivine,
          borderColor: "rgba(240, 254, 59, 1)",
          fill: true,
          backgroundColor: "rgba(240, 254, 59, 0.4)",
          pointRadius: 0,
        },
        {
          label: "Immortal",
          data: dataImomortal,
          borderColor: "rgba(254, 191, 59, 1)",
          fill: true,
          backgroundColor: "rgba(254, 191, 59, 0.4)",
          pointRadius: 0,
        },
      ],
    });
  }, [rank]);

  return (
    <section className="p-2 rounded-md bg-layer-light dark:bg-layer-dark">
      <h5>Matches by Rank</h5>
      <div className="h-[300px] relative">
        {data && (
          <Chart
            type="line"
            width={50}
            height={50}
            options={options}
            data={data}
            plugins={[htmlLegendPlugin, lineDraw]}
            redraw={true}
          />
        )}
      </div>
      <div id="graphs-rank" className="mt-5"></div>
    </section>
  );
};

export default Rank;
