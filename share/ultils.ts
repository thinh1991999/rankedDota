import _ from "lodash";
import { Item } from "../interfaces/item";
import moment from "moment";
import { Chart as ChartJS } from "chart.js";
import { AbilityDetail, Hero } from "../interfaces/heroes";
import {
  COLOR_CHART_RADIANT_BORDER,
  COLOR_CHART_DIRE_BORDER,
} from "./constant";
import { Team } from "../interfaces/matches";

export const getImgOpenDota = (key: string) => {
  return "https://cdn.cloudflare.steamstatic.com" + key;
};

export const getImgStratsDota = (key: string) => {
  return "https://cdn.stratz.com/images/dota2" + key;
};

export const getFixIndexHero = (value: number): string => {
  return value.toFixed(1);
};

export const getDetailItem = (arr: Item[], id: number): Item | null => {
  let result: Item | null = null;
  _.forEach(arr, (itemm) => {
    if (itemm.id === id) {
      result = itemm;
      return;
    }
  });
  return result;
};

export const getDetaiHero = (arr: Hero[], id: number): Hero | null => {
  let result: Hero | null = null;
  _.forEach(arr, (hero) => {
    if (hero.id === id) {
      result = hero;
      return;
    }
  });
  return result;
};

export const getDetaiAbility = (
  arr: AbilityDetail[],
  id: number
): AbilityDetail | null => {
  let result: AbilityDetail | null = null;
  _.forEach(arr, (abi) => {
    if (abi.id === id) {
      result = abi;
      return;
    }
  });
  return result;
};

export const getTimeBySeconds = (time: number): string => {
  const newTime = moment
    .utc(time * 1000)
    .format(time >= 3600 ? "HH:mm:ss" : "mm:ss");
  return newTime;
};

export const getTypeOfHero = (
  key: string,
  lane?: string
): {
  name: string;
  icon: string;
} => {
  switch (key) {
    case "CORE": {
      if (lane === "OFF_LANE") {
        return {
          name: "Off lane",
          icon: "/HeroType/offlane.svg",
        };
      } else if (lane === "MID_LANE") {
        return {
          name: "Mid lane",
          icon: "/HeroType/mid.svg",
        };
      } else {
        return {
          name: "Safe lane",
          icon: "/HeroType/carry.svg",
        };
      }
    }
    case "pos1":
    case "POSITION_1":
      return {
        name: "Safe lane",
        icon: "/HeroType/carry.svg",
      };
    case "pos2":
    case "POSITION_2":
      return {
        name: "Mid lane",
        icon: "/HeroType/mid.svg",
      };
    case "pos3":
    case "POSITION_3":
      return {
        name: "Off lane",
        icon: "/HeroType/offlane.svg",
      };
    case "pos4":
    case "POSITION_4":
    case "LIGHT_SUPPORT":
      return {
        name: "Soft support",
        icon: "/HeroType/sp1.svg",
      };
    case "pos5":
    case "POSITION_5":
    case "HARD_SUPPORT":
      return {
        name: "Hard support",
        icon: "/HeroType/sp2.svg",
      };
    default:
      return {
        name: "Safe lane",
        icon: "/HeroType/carry.svg",
      };
  }
};

export const nFormatter = (num: number, digits: number) => {
  const numCl = num < 0 ? -num : num;
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return numCl >= item.value;
    });
  const result = item
    ? (numCl / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
  return num < 0 ? "-" + result : result;
};

export const normalizeCoords = (
  x: number,
  y: number
): {
  x: number;
  y: number;
} => {
  const MAX_COORD = 255;
  const HALF_COORD = MAX_COORD / 2;
  const QUARTER_COORD = MAX_COORD / 4;
  return {
    x: ((x - QUARTER_COORD) * MAX_COORD) / HALF_COORD,
    y: ((HALF_COORD - (y - QUARTER_COORD)) * MAX_COORD) / HALF_COORD,
  };
};

export const romanize = (num: number | null): string => {
  if (num === null) return "";
  if (isNaN(num)) return "";
  var digits = String(+num).split(""),
    key = [
      "",
      "C",
      "CC",
      "CCC",
      "CD",
      "D",
      "DC",
      "DCC",
      "DCCC",
      "CM",
      "",
      "X",
      "XX",
      "XXX",
      "XL",
      "L",
      "LX",
      "LXX",
      "LXXX",
      "XC",
      "",
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
    ],
    roman = "",
    i = 3;
  while (i--) {
    const a = digits.pop();
    if (a) {
      roman = (key[+a + i * 10] || "") + roman;
    }
  }
  return Array(+digits.join("") + 1).join("M") + roman;
};

export const getPartyColor = (
  id: number | null
): {
  bg: string;
  text: string;
} => {
  switch (id) {
    case 0:
      return {
        bg: "bg-yellow-500",
        text: "text-yellow-500",
      };
    case 1:
      return {
        bg: "bg-red-500",
        text: "text-red-500",
      };
    case 2:
      return {
        bg: "bg-blue-500",
        text: "text-blue-500",
      };
    case 3:
      return {
        bg: "bg-pink-500",
        text: "text-pink-500",
      };
    case 4:
      return {
        bg: "bg-green-500",
        text: "text-green-500",
      };
    case 5:
      return {
        bg: "bg-orange-500",
        text: "text-orange-500",
      };
    default:
      return {
        bg: "",
        text: "",
      };
  }
};

export const formatNumber = (value: number): string => {
  if (value === 0) return "0";
  return value.toFixed().replace(/./g, function (c, i, a) {
    return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
  });
};

export const formatTime = (input: number) => {
  const time = moment.utc(input);
  const hours = time.hours();
  if (hours > 0) {
    return time.format("HH:mm:ss");
  } else {
    return time.format("mm:ss");
  }
};

export const getGradient = (ctx: any, chartArea: any, scales: any) => {
  let width: number = 0,
    height: number = 0,
    gradient: any;
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;

  if (!gradient || width !== chartWidth || height !== chartHeight) {
    const a = scales.x.getPixelForValue(10);
    const pointAvarage = scales.y.getPixelForValue(50);
    const pointAvarageHeight = pointAvarage - chartArea.top;
    const pointAvaragePercentage = pointAvarageHeight / chartHeight;
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0.5, COLOR_CHART_DIRE_BORDER);
    gradient.addColorStop(0.5, COLOR_CHART_RADIANT_BORDER);
  }
  return gradient;
};

export function sortRolesTeam<T extends Team>(arr: T[]) {
  const newArr = new Array<T>(5);
  _.forEach(arr, (item) => {
    const { role, lane } = item;
    switch (item.role) {
      case "CORE":
        if (lane === "SAFE_LANE") {
          newArr[0] = item;
        } else if (lane === "MID_LANE") {
          newArr[1] = item;
        } else {
          newArr[2] = item;
        }
        break;
      case "LIGHT_SUPPORT": {
        newArr[3] = item;
        break;
      }
      case "HARD_SUPPORT": {
        newArr[4] = item;
        break;
      }
      default:
        break;
    }
  });
  return newArr;
}

export const getRankName = (rank: number): string => {
  if (rank < 20) {
    return "Herald";
  }
  if (rank < 30) {
    return "Guardian";
  }
  if (rank < 40) {
    return "Crusader";
  }
  if (rank < 50) {
    return "Archon";
  }
  if (rank < 60) {
    return "Legend";
  }
  if (rank < 70) {
    return "Ancient";
  }
  if (rank < 80) {
    return "Divine";
  }
  return "Immortal";
};

export function makeArray<T>(size: number, value: T | null = null): T[] {
  const arr = new Array<T>(size);
  if (value !== null)
    for (let i = 0; i < arr.length; i++) {
      arr[i] = value;
    }
  return arr;
}

export function getRandomRgba(): {
  strong: string;
  layer: string;
} {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return {
    strong:
      "rgba(" +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      1 +
      ")",
    layer:
      "rgba(" +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      0.5 +
      ")",
  };
}
