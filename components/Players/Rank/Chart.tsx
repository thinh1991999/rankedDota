import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartDataset,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { SteamAccountByRank, Stratz } from "../../../interfaces/players";
import _ from "lodash";
import { nFormatter } from "../../../share";
import {
  getImgStratsDota,
  makeArray,
  formatNumber,
} from "../../../share/ultils";
import MyImage from "../../MyImage";
import ToolTip from "../../ToolTip";
import uniqid from "uniqid";
import { getRankName } from "../../../share/ultils";
import { useTheme } from "next-themes";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const externalTooltipHandler = (context: any) => {
  const { chart, tooltip } = context;
  const datasets = chart.data.datasets;
  const totalAcc = datasets[datasets.length - 1].data[0] || 10000000;
  const {
    dataset: { data },
    dataIndex,
    datasetIndex,
    raw,
    label,
  } = tooltip.dataPoints[0];

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
    tootipContainer.classList.add("tooltipPlayersRank");
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
    const bodyDiv = document.createElement("div");
    bodyDiv.style.padding = "5px 10px";
    bodyDiv.style.display = "flex";
    bodyDiv.style.alignItems = "center";

    const imgDiv = document.createElement("div");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "symbol");
    svg.setAttribute("viewBox", "0 0 256 256");
    svg.setAttribute("width", "50");
    svg.setAttribute("height", "50");
    const medal = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "image"
    );
    medal.setAttribute(
      "href",
      getImgStratsDota(`/seasonal_rank/medal_${label}.png`)
    );
    medal.style.width = "100%";
    medal.style.height = "100%";
    const stars = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "image"
    );
    const countStars = datasetIndex - dataIndex * 5 + 1;
    stars.setAttribute(
      "href",
      getImgStratsDota(`/seasonal_rank/star_${countStars}.png`)
    );
    stars.style.width = "100%";
    stars.style.height = "100%";
    svg.appendChild(medal);
    svg.appendChild(stars);
    imgDiv.appendChild(svg);
    imgDiv.append(svg);

    const infoDiv = document.createElement("div");
    infoDiv.style.marginLeft = "8px";
    const titleEl = document.createElement("h6");
    titleEl.style.marginBottom = "8px";
    titleEl.innerHTML = getRankName((dataIndex + 1) * 10) + " " + countStars;
    const bottomDiv = document.createElement("div");
    bottomDiv.style.display = "flex";
    bottomDiv.style.alignItems = "center";
    bottomDiv.style.justifyContent = "space-between";

    const div1 = document.createElement("div");
    const t1 = document.createElement("h6");
    t1.style.fontSize = "14px";
    t1.style.color = "gray";
    t1.innerHTML = "Players";
    const s1 = document.createElement("span");
    s1.style.fontSize = "16px";
    s1.innerHTML = formatNumber(raw);
    div1.appendChild(t1);
    div1.appendChild(s1);

    const div2 = document.createElement("div");
    div2.style.marginLeft = "16px";
    const t2 = document.createElement("h6");
    t2.style.fontSize = "14px";
    t2.style.color = "gray";
    t2.innerHTML = "% of Total";
    const s2 = document.createElement("span");
    s2.style.fontSize = "16px";
    const percent = (raw * 100) / totalAcc;
    s2.innerHTML = percent.toFixed(1) + "%";
    div2.appendChild(t2);
    div2.appendChild(s2);

    bottomDiv.appendChild(div1);
    bottomDiv.appendChild(div2);

    infoDiv.appendChild(titleEl);
    infoDiv.appendChild(bottomDiv);
    bodyDiv.appendChild(imgDiv);
    bodyDiv.appendChild(infoDiv);

    const divRoot = tooltipEl.querySelector(".tooltipPlayersRank");
    // Remove old children
    while (divRoot?.firstChild) {
      divRoot.firstChild.remove();
    }
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

  tooltipEl.style.top = "50%";
  tooltipEl.style.transform = "translateY(-50%)";
  tooltipEl.style.font = tooltip.options.bodyFont.string;
};

const Chart = ({ stratz }: { stratz: Stratz | null }) => {
  const { theme } = useTheme();
  const [chartData, setChartData] = useState<ChartData<"bar"> | null>(null);
  const [options, setOptions] = useState<ChartOptions<"bar"> | null>(null);
  const [customLabels, setCustomLabels] = useState<
    {
      rank: number;
      players: number;
      percent: number;
    }[]
  >([]);

  useEffect(() => {
    if (!stratz) return;
    const {
      page: {
        players: { steamAccountByRank },
      },
    } = stratz;
    const data: SteamAccountByRank[] = [];
    _.forEach(steamAccountByRank, (e) => {
      if (e.rank && e.rank % 10 <= 5) data.push(e);
    });
    const order = _.orderBy(data, (e) => e.rank);
    const totalAcc = _.sumBy(order, (o) => o.playerCount);
    const finalLabels: number[] = [];
    const finalCustomLabels: {
      rank: number;
      players: number;
      percent: number;
    }[] = [];
    const datasets: ChartDataset<"bar", number[]>[] = [];
    _.forEach(order, (o) => {
      if (o.rank) {
        const data = new Array<number>(8);
        const nb = Math.floor(o.rank / 10);
        let bg = "";
        switch (nb) {
          case 1:
            bg = "rgba(67, 247, 53, 0.8)";
            break;
          case 2:
            bg = "rgba(247, 179, 35, 0.8)";
            break;
          case 3:
            bg = "rgba(22, 58, 100, 0.8)";
            break;
          case 4:
            bg = "rgba(22, 100, 90, 0.8)";
            break;
          case 5:
            bg = "rgba(182, 9, 18, 0.8)";
            break;
          case 6:
            bg = "rgba(173, 9, 182, 0.8)";
            break;
          case 7:
            bg = "rgba(21, 7, 133, 0.8)";
            break;
          case 8:
            bg = "rgba(200, 50, 12, 0.8)";
            break;
          default:
            bg = "rgba(67, 247, 53, 0.8)";
            break;
        }
        if (!finalLabels.includes(nb)) finalLabels.push(nb);
        const checkIdxCustomLabel = _.findIndex(
          finalCustomLabels,
          (label) => label.rank === nb
        );
        if (checkIdxCustomLabel !== -1) {
          const newPlayers =
            finalCustomLabels[checkIdxCustomLabel].players + o.playerCount;
          finalCustomLabels[checkIdxCustomLabel].players = newPlayers;
          finalCustomLabels[checkIdxCustomLabel].percent =
            (newPlayers * 100) / totalAcc;
        } else {
          finalCustomLabels.push({
            rank: nb,
            percent: (o.playerCount * 100) / totalAcc,
            players: o.playerCount,
          });
        }
        data[nb - 1] = o.playerCount;
        if (nb === 8) {
          datasets.push({
            data,
            backgroundColor: bg,
            barThickness: 10,
          });
        } else {
          datasets.push({
            data,
            backgroundColor: bg,
            categoryPercentage: 0.5,
            barPercentage: 0.7,
          });
        }
      }
    });
    datasets.push({
      label: "TOTALACC",
      data: [totalAcc],
      hidden: true,
    });
    setCustomLabels(finalCustomLabels);
    setChartData({
      labels: finalLabels,
      datasets,
    });
    setOptions({
      responsive: true,
      skipNull: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
        tooltip: {
          mode: "point",
          intersect: false,
          displayColors: false,
          enabled: false,
          external: externalTooltipHandler,
        },
      },
      maintainAspectRatio: false,
      hover: {
        mode: "point",
        intersect: false,
      },
      scales: {
        x: {
          ticks: {
            color: theme === "dark" ? "white" : "black",
            display: false,
          },
          grid: {
            display: false,
          },
        },
        y: {
          max: 600000,
          ticks: {
            color: theme === "dark" ? "white" : "black",
            stepSize: 150000,
            callback(tickValue, index, ticks) {
              if (typeof tickValue === "number")
                return nFormatter(tickValue, 1);
            },
            padding: 10,
          },
          weight: 10,
          grid: {
            color: "rgba(107, 107, 107, 0.5)",
            tickLength: 0,
          },
        },
      },
    });
  }, [stratz, theme]);

  return (
    <div>
      <p className="py-5 text-sm text-textSecondPrimary-light dark:text-textSecondPrimary-dark">
        Rank distribution is updated the first day of each month. The total
        account count is the total number of Dota 2 accounts ever created.
      </p>
      <div className="bg-layer-light dark:bg-layer-dark rounded-md border border-solid border-borderTender-light dark:border-borderTender-dark overflow-hidden ">
        <div className="px-3 py-1 bg-layerStrong-light dark:bg-layerStrong-dark">
          <h5>Rank Distribution by Medal</h5>
        </div>
        <div className="lg:overflow-hidden overflow-x-scroll py-3">
          <div className="w-[1240px] h-[400px] relative">
            {chartData && options && <Bar options={options} data={chartData} />}
          </div>
          <div className="pl-[48px] w-[1240px] flex items-center justify-between">
            {customLabels.map((lb, idx) => {
              const { rank, players, percent } = lb;
              const img = getImgStratsDota(`/seasonal_rank/medal_${rank}.png`);
              return (
                <div key={idx} className="w-[calc(100%_/_8)]">
                  <div className="flex justify-center ">
                    <div className="w-[50px] h-[50px]">
                      <ToolTip
                        target={
                          <MyImage
                            src={img}
                            width="50px"
                            height="50px"
                            alt=""
                          />
                        }
                        tooltip={
                          <div className="px-2 py-3 flex items-center rounded-md bg-black border border-solid border-borderTender-dark ">
                            <MyImage
                              src={img}
                              width="50px"
                              height="50px"
                              alt=""
                            />
                            <div className="ml-2">
                              <span className="text-base text-textMain-dark">
                                {getRankName(rank * 10)}
                              </span>
                              <div className="flex items-center">
                                <div className="mr-3">
                                  <h6>Players</h6>
                                  <span className="font-bold text-textMain-dark text-base">
                                    {formatNumber(players)}
                                  </span>
                                </div>
                                <div>
                                  <h6>% of Total</h6>
                                  <span className="font-bold text-textMain-dark text-base">
                                    {percent.toFixed(1)} %
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                        id={uniqid()}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
