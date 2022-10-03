import _ from "lodash";
import { Item } from "../interfaces/item";
import moment from "moment";
import { Hero } from "../interfaces/heroes";

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
        icon: "",
      };
  }
};

export const nFormatter = (num: number, digits: number) => {
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
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
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
