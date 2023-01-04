import React, { useEffect, useState, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import forEach from "lodash/forEach";
import cloneDeep from "lodash/cloneDeep";
import reverse from "lodash/reverse";
import moment from "moment";
import { Matches } from "../../../interfaces/players";
import { getRandomRgba } from "../../../share/ultils";
import { drawLinePluginChart } from "../../../share";
import { useGetStylesTheme } from "../../../share/customHooks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const externalTooltipHandler = (context: any) => {
  const { chart, tooltip } = context;
  const dataPoints = tooltip.dataPoints;

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
    tootipContainer.classList.add("tooltipPlayersQueue");
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
    forEach(dataPoints, (item) => {
      const {
        dataset: { label, borderColor },
        raw,
      } = item;
      const wrDiv = document.createElement("div");
      wrDiv.style.backgroundColor = "inherit";
      wrDiv.style.borderWidth = "0";
      wrDiv.style.display = "flex";
      wrDiv.style.justifyContent = "space-between";
      wrDiv.style.margin = "10px 0";
      const span = document.createElement("span");
      span.style.fontSize = "14px";
      span.style.textTransform = "capitalize";
      span.innerHTML = label;
      span.style.color = borderColor;
      const span2 = document.createElement("span");
      span2.style.fontSize = "14px";
      span2.style.color = "rgba(255, 255, 255, 0.6)";
      span2.innerHTML = raw;
      wrDiv.appendChild(span);
      wrDiv.appendChild(span2);
      bodyDiv.appendChild(wrDiv);
    });
    const divRoot = tooltipEl.querySelector(".tooltipPlayersQueue");
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
  const { dataIndex } = dataPoints[0];

  const center = chart.data.labels.length / 2;
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

const Chart = ({ matches }: { matches: Matches | null }) => {
  const { styles } = useGetStylesTheme();
  const [chartData, setChartData] = useState<ChartData<"line"> | null>(null);
  const options: ChartOptions<"line"> = useMemo(() => {
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
            color: styles?.tick,
            padding: 10,
            autoSkip: false,
            callback(tickValue, index, ticks) {
              const time = this.getLabelForValue(index);
              const momentTime = moment.unix(Number(time));
              if (momentTime.minutes() >= 50 && momentTime.hours() === 7)
                return momentTime.format("HH:mm");
            },
          },
          grid: {
            color: "rgba(107, 107, 107, 0.5)",
            tickLength: 8,
            display: false,
          },
        },
        y: {
          ticks: {
            color: styles?.tick,
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
  }, [styles]);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const htmlLegendPlugin = {
    id: "htmlLegend",
    getNewDatasets: (
      chartData: ChartData<"line"> | null,
      clear: boolean,
      index: number
    ): ChartData<"line"> | null => {
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
      ul.style.justifyContent = "center";
      items.forEach((item: any, idx: number) => {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.padding = "5px 8px";
        li.style.alignItems = "center";
        li.style.fontSize = "0.9rem";
        li.style.marginLeft = "20px";
        li.style.cursor = "pointer";
        li.style.textTransform = "capitalize";
        const handleMouseenter = () => {
          const newData = this.getNewDatasets(chartData, false, idx);
          setHoverIdx(idx);
          idx !== hoverIdx && setChartData(cloneDeep(newData));
        };
        li.removeEventListener("mouseenter", handleMouseenter);
        li.addEventListener("mouseenter", handleMouseenter);
        const handleMouseleave = () => {
          const newData = this.getNewDatasets(chartData, true, idx);
          setChartData(cloneDeep(newData));
          setHoverIdx(null);
        };
        li.removeEventListener("mouseleave", handleMouseleave);
        li.addEventListener("mouseleave", handleMouseleave);
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
      const jsLegend = document.getElementById("player-queue");
      if (jsLegend) {
        jsLegend.innerHTML = "";
        jsLegend.appendChild(ul);
      }
    },
  };
  useEffect(() => {
    if (!matches) return;
    const { matchmakingStats } = matches;
    const labels: number[] = [];
    const australia: number[] = [];
    const austria: number[] = [];
    const brazil: number[] = [];
    const chile: number[] = [];
    const dubai: number[] = [];
    const europe: number[] = [];
    const india: number[] = [];
    const japan: number[] = [];
    const perfectWorldTelecom: number[] = [];
    const perfectWorldTelecomGuangdong: number[] = [];
    const perfectWorldTelecomWuhan: number[] = [];
    const perfectWorldTelecomZhejiang: number[] = [];
    const perfectWorldUnicom: number[] = [];
    const perfectWorldUnicomTianjin: number[] = [];
    const peru: number[] = [];
    const singapore: number[] = [];
    const southAfrica: number[] = [];
    const stockholm: number[] = [];
    const taiwan: number[] = [];
    const usEast: number[] = [];
    const usWest: number[] = [];
    forEach(reverse(matchmakingStats), (match) => {
      labels.push(match.timestamp);
      australia.push(match.australia);
      austria.push(match.austria);
      brazil.push(match.brazil);
      chile.push(match.chile);
      dubai.push(match.dubai);
      europe.push(match.europe);
      india.push(match.india);
      japan.push(match.japan);
      perfectWorldTelecom.push(match.perfectWorldTelecom);
      perfectWorldTelecomGuangdong.push(match.perfectWorldTelecomGuangdong);
      perfectWorldTelecomWuhan.push(match.perfectWorldTelecomWuhan);
      perfectWorldTelecomZhejiang.push(match.perfectWorldTelecomZhejiang);
      perfectWorldUnicom.push(match.perfectWorldUnicom);
      perfectWorldUnicomTianjin.push(match.perfectWorldUnicomTianjin);
      peru.push(match.peru);
      singapore.push(match.singapore);
      southAfrica.push(match.southAfrica);
      stockholm.push(match.stockholm);
      taiwan.push(match.taiwan);
      usEast.push(match.usEast);
      usWest.push(match.usWest);
    });
    const australiaColors = getRandomRgba();
    const austriaColors = getRandomRgba();
    const brazilColors = getRandomRgba();
    const chileColors = getRandomRgba();
    const dubaiColors = getRandomRgba();
    const europeColors = getRandomRgba();
    const indiaColors = getRandomRgba();
    const japanColors = getRandomRgba();
    const perfectWorldTelecomColors = getRandomRgba();
    const perfectWorldTelecomGuangdongColors = getRandomRgba();
    const perfectWorldTelecomWuhanColors = getRandomRgba();
    const perfectWorldTelecomZhejiangColors = getRandomRgba();
    const perfectWorldUnicomColors = getRandomRgba();
    const perfectWorldUnicomTianjinColors = getRandomRgba();
    const peruColors = getRandomRgba();
    const singaporeColors = getRandomRgba();
    const southAfricaColors = getRandomRgba();
    const stockholmColors = getRandomRgba();
    const taiwanColors = getRandomRgba();
    const usEastColors = getRandomRgba();
    const usWestColors = getRandomRgba();
    setChartData({
      labels,
      datasets: [
        {
          label: "Australia",
          data: australia,
          borderColor: australiaColors.strong,
          fill: true,
          backgroundColor: australiaColors.layer,
          pointRadius: 0,
        },
        {
          label: "austria",
          data: austria,
          borderColor: austriaColors.strong,
          fill: true,
          backgroundColor: austriaColors.layer,
          pointRadius: 0,
        },
        {
          label: "brazil",
          data: brazil,
          borderColor: brazilColors.strong,
          fill: true,
          backgroundColor: brazilColors.layer,
          pointRadius: 0,
        },
        {
          label: "chile",
          data: chile,
          borderColor: chileColors.strong,
          fill: true,
          backgroundColor: chileColors.layer,
          pointRadius: 0,
        },
        {
          label: "dubai",
          data: dubai,
          borderColor: dubaiColors.strong,
          fill: true,
          backgroundColor: dubaiColors.layer,
          pointRadius: 0,
        },
        {
          label: "europe",
          data: europe,
          borderColor: europeColors.strong,
          fill: true,
          backgroundColor: europeColors.layer,
          pointRadius: 0,
        },
        {
          label: "india",
          data: india,
          borderColor: indiaColors.strong,
          fill: true,
          backgroundColor: indiaColors.layer,
          pointRadius: 0,
        },
        {
          label: "japan",
          data: japan,
          borderColor: japanColors.strong,
          fill: true,
          backgroundColor: japanColors.layer,
          pointRadius: 0,
        },
        {
          label: "PW Telecom",
          data: perfectWorldTelecom,
          borderColor: perfectWorldTelecomColors.strong,
          fill: true,
          backgroundColor: perfectWorldTelecomColors.layer,
          pointRadius: 0,
        },
        {
          label: "PW Telecom Guangdong",
          data: perfectWorldTelecomGuangdong,
          borderColor: perfectWorldTelecomGuangdongColors.strong,
          fill: true,
          backgroundColor: perfectWorldTelecomGuangdongColors.layer,
          pointRadius: 0,
        },
        {
          label: "PW Telecom Wuhan",
          data: perfectWorldTelecomWuhan,
          borderColor: perfectWorldTelecomWuhanColors.strong,
          fill: true,
          backgroundColor: perfectWorldTelecomWuhanColors.layer,
          pointRadius: 0,
        },
        {
          label: "PW Telecom Zhejiang",
          data: perfectWorldTelecomZhejiang,
          borderColor: perfectWorldTelecomZhejiangColors.strong,
          fill: true,
          backgroundColor: perfectWorldTelecomZhejiangColors.layer,
          pointRadius: 0,
        },
        {
          label: "PW Unicom",
          data: perfectWorldUnicom,
          borderColor: perfectWorldUnicomColors.strong,
          fill: true,
          backgroundColor: perfectWorldUnicomColors.layer,
          pointRadius: 0,
        },
        {
          label: "PW Unicom Tianjin",
          data: perfectWorldUnicomTianjin,
          borderColor: perfectWorldUnicomTianjinColors.strong,
          fill: true,
          backgroundColor: perfectWorldUnicomTianjinColors.layer,
          pointRadius: 0,
        },
        {
          label: "peru",
          data: peru,
          borderColor: peruColors.strong,
          fill: true,
          backgroundColor: peruColors.layer,
          pointRadius: 0,
        },
        {
          label: "singapore",
          data: singapore,
          borderColor: singaporeColors.strong,
          fill: true,
          backgroundColor: singaporeColors.layer,
          pointRadius: 0,
        },
        {
          label: "South Africa",
          data: southAfrica,
          borderColor: southAfricaColors.strong,
          fill: true,
          backgroundColor: southAfricaColors.layer,
          pointRadius: 0,
        },
        {
          label: "stockholm",
          data: stockholm,
          borderColor: stockholmColors.strong,
          fill: true,
          backgroundColor: stockholmColors.layer,
          pointRadius: 0,
        },
        {
          label: "taiwan",
          data: taiwan,
          borderColor: taiwanColors.strong,
          fill: true,
          backgroundColor: taiwanColors.layer,
          pointRadius: 0,
        },
        {
          label: "US East",
          data: usEast,
          borderColor: usEastColors.strong,
          fill: true,
          backgroundColor: usEastColors.layer,
          pointRadius: 0,
        },
        {
          label: "US West",
          data: usWest,
          borderColor: usWestColors.strong,
          fill: true,
          backgroundColor: usWestColors.layer,
          pointRadius: 0,
        },
      ],
    });
  }, [matches]);

  return (
    <section>
      <h5>Players In Queue</h5>
      <p>Amount of players searching for a game in each region.</p>
      <div className="lg:overflow-visible overflow-x-scroll">
        <div className="h-[600px] relative w-[1208px]">
          {chartData && (
            <Line
              options={options}
              data={chartData}
              plugins={[htmlLegendPlugin, drawLinePluginChart]}
              redraw={true}
            />
          )}
        </div>
      </div>
      <div id="player-queue" className="mt-5 w-full"></div>
    </section>
  );
};

export default Chart;
