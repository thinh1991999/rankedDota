import React, { useEffect, useMemo, useState } from "react";
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
import { drawLinePluginChart, getGradient, nFormatter } from "../../../share";
import moment from "moment";
import { useAppSelector } from "../../../store/hook";
import {
  COLOR_CHART_PINK_BORDER,
  COLOR_CHART_PINK,
} from "../../../share/constant";
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
  // Tooltip Element
  const { chart, tooltip } = context;
  const {
    dataset: { data },
    dataIndex,
  } = tooltip.dataPoints[0];
  const { pr, matchCount } = data[dataIndex];
  let tooltipEl = chart.canvas.parentNode.querySelector("div");

  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.style.background = "#0d1b21";
    tooltipEl.style.borderRadius = "3px";
    tooltipEl.style.color = "white";
    tooltipEl.style.width = "150px";
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
    titleLines.forEach((title: any) => {
      const titleEl = document.createElement("h6");
      titleEl.style.textAlign = "start";
      titleEl.style.fontSize = "14px";
      titleEl.innerText = title;
      headerDiv.appendChild(titleEl);
    });

    const bodyDiv = document.createElement("div");
    bodyDiv.style.padding = "5px 10px";
    bodyLines.forEach((body: any, i: number) => {
      const wrDiv = document.createElement("div");
      wrDiv.style.backgroundColor = "inherit";
      wrDiv.style.borderWidth = "0";
      wrDiv.style.display = "flex";
      wrDiv.style.justifyContent = "space-between";
      const span = document.createElement("span");
      span.style.fontSize = "14px";
      span.innerHTML = "Pick Rate";
      span.style.fontSize = "14px";
      const span2 = document.createElement("span");
      span2.style.fontSize = "14px";
      span2.style.color = "rgba(245, 40, 145, 0.8)";
      span2.style.fontSize = "14px";
      span2.innerHTML = Number(pr).toFixed(1) + "%";

      wrDiv.appendChild(span);
      wrDiv.appendChild(span2);
      bodyDiv.appendChild(wrDiv);
    });
    const wrDiv = document.createElement("div");
    wrDiv.style.backgroundColor = "inherit";
    wrDiv.style.borderWidth = "0";
    wrDiv.style.display = "flex";
    wrDiv.style.justifyContent = "space-between";
    const span = document.createElement("span");
    span.style.fontSize = "14px";
    span.innerHTML = "Match Count";
    const span2 = document.createElement("span");
    span2.style.fontSize = "14px";
    span2.style.color = "yellow";
    span2.innerHTML = nFormatter(matchCount, 1);
    wrDiv.appendChild(span);
    wrDiv.appendChild(span2);
    bodyDiv.appendChild(wrDiv);

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
  const center = data.length / 2;
  if (dataIndex < center) {
    tooltipEl.style.left = positionX + tooltip.caretX + 80 + "px";
  } else if (dataIndex > center) {
    tooltipEl.style.left = positionX + tooltip.caretX - 80 + "px";
  } else {
    tooltipEl.style.left = positionX + tooltip.caretX + "px";
  }
  tooltipEl.style.top = positionY + tooltip.caretY + "px";
  tooltipEl.style.font = tooltip.options.bodyFont.string;
};

const PrChart = ({
  data,
}: {
  data: {
    time: number;
    pr: number;
    matchCount: number;
  }[];
}) => {
  const maxPr = useAppSelector((state) => state.heroesTrends.maxPr);

  const [chartData, setChartData] = useState<any>(null);

  const options: ChartOptions<"line"> = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top" as const,
          display: false,
        },
        title: {
          display: false,
          text: "Chart.js Line Chart",
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
        mode: "nearest",
        intersect: false,
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          min: 0,
          max: maxPr,
          display: false,
        },
      },
    };
  }, [maxPr]);
  useEffect(() => {
    setChartData({
      labels: data.map((val) => {
        const momenta = moment.unix(val.time).format("MMMM DD, YYYY");
        return momenta;
      }),
      datasets: [
        {
          data: data,
          borderColor: COLOR_CHART_PINK_BORDER,
          borderWidth: 1,
          pointRadius: 0,
          fill: true,
          backgroundColor: COLOR_CHART_PINK,
          parsing: {
            xAxisKey: "time",
            yAxisKey: "pr",
          },
        },
      ],
    });
  }, [data]);

  return (
    <div className="w-[130px] h-[40px] relative">
      {chartData && (
        <Line
          options={options}
          data={chartData}
          plugins={[drawLinePluginChart]}
        />
      )}
    </div>
  );
};

export default PrChart;
