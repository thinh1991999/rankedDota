import _ from "lodash";
import React, { useEffect, useState } from "react";
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
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { GameVersion, WinGameVersion } from "../../interfaces/gameVersion";
import { Hero, Win } from "../../interfaces/heroes";
import { useAppSelector } from "../../store/hook";
import { nFormatter } from "../../share";

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
  const {
    dataset: { data },
    dataIndex,
  } = tooltip.dataPoints[0];
  const { value, matchCount } = data[dataIndex];

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
      span.innerHTML = "Win Rate";
      const span2 = document.createElement("span");
      span2.style.fontSize = "14px";
      span2.style.color = value >= 50 ? "green" : "red";
      span2.innerHTML = Number(value).toFixed(1) + "%";
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

const HeroCharWinrate = ({
  winGameVersions,
  hero,
}: {
  winGameVersions: Win[];
  hero: Hero;
}) => {
  const gameVersions = useAppSelector((state) => state.globalData.gameVersions);
  const [wrChart, setWrChart] = useState<{
    datasets: any;
  }>();
  const [wrAverage, setWrAverage] = useState<number>(0);
  const options: ChartOptions = {
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
      mode: "nearest",
      intersect: false,
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: (c: any) => {
            if (isNaN(Number(c["tick"]["label"]))) return "gray";
            else return "white";
          },
        },
        grid: {
          color: "rgba(107, 107, 107, 0.5)",
          tickLength: 0,
        },
      } as any,
      y: {
        ticks: {
          stepSize: 10,
          display: false,
        },
        suggestedMin: 49,
        suggestedMax: 51,
        weight: 10,
        grid: {
          color: "rgba(107, 107, 107, 0.5)",
          tickLength: 0,
        },
      },
    },
  };

  const extendPlugin = {
    id: "beforeDraw",
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
  function getGradient(ctx: any, chartArea: any, scales: any) {
    let width: number = 0,
      height: number = 0,
      gradient: any;
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
      const pointAvarage = scales.y.getPixelForValue(50);
      const pointAvarageHeight = pointAvarage - chartArea.top;
      const pointAvaragePercentage = pointAvarageHeight / chartHeight;
      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(
        0,
        chartArea.top,
        0,
        chartHeight + chartArea.top
      );
      gradient.addColorStop(pointAvaragePercentage, "rgba(47, 250, 87, 0.5)");
      gradient.addColorStop(pointAvaragePercentage, "rgba(247, 43, 0, 0.5)");
    }
    return gradient;
  }
  useEffect(() => {
    let versions: {
      gameVersion: GameVersion;
      winGameVersion: Win;
    }[] = [];
    const data: {
      label: string;
      value: number;
      matchCount: number;
    }[] = [];
    let totalWr: number = 0;
    _.forEach(winGameVersions, (game) => {
      if (game.heroId === hero.id) {
        const filter = _.filter(
          gameVersions,
          (item) => item.id === game.gameVersionId
        );
        versions.push({
          gameVersion: filter[0],
          winGameVersion: game,
        });
      }
    });
    versions = _.orderBy(versions, (game) => game.gameVersion.asOfDateTime);
    _.forEach(versions, (ver) => {
      const {
        gameVersion: { name },
        winGameVersion: { winCount, matchCount },
      } = ver;
      const wr = (winCount * 100) / matchCount;
      totalWr += wr;
      data.push({
        label: name,
        value: wr,
        matchCount,
      });
    });
    setWrChart({
      datasets: [
        {
          type: "line" as const,
          data,
          tension: 0.5,
          borderWidth: 2,
          borderColor: function (context: any) {
            const chart = context.chart;
            const { ctx, chartArea, scales } = chart;
            if (!chartArea) {
              return;
            }
            return getGradient(ctx, chartArea, scales);
          },
          pointRadius: 0,
          fill: {
            target: {
              value: 50,
            },
            below: "rgba(247, 43, 0, 0.5)",
            above: "rgba(47, 250, 87, 0.5)",
          },
          parsing: {
            xAxisKey: "label",
            yAxisKey: "value",
          },
        },
      ],
    });
    setWrAverage(totalWr / data.length);
  }, [hero, winGameVersions, gameVersions]);
  return (
    <>
      {wrChart && (
        <div className="w-full p-2 rounded-md bg-layer-dark">
          <div className="flex items-center">
            <h6 className="text-xl font-bold">Win Rate</h6>
            <span className="ml-2 text-xl text-green-500 font-bold">
              {wrAverage?.toFixed(1)}%
            </span>
          </div>
          <div className="w-full h-[140px]">
            <Chart
              type="line"
              width={50}
              height={50}
              options={options}
              data={wrChart}
              plugins={[extendPlugin]}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HeroCharWinrate;
