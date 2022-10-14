import { Chart as ChartJS } from "chart.js";
export const drawLinePluginChart = {
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
