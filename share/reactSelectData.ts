export type ItemList = {
  value: string;
  label: string;
  customAbbreviation?: string | null;
  img?: boolean;
  size?: string;
};

export const durations: ItemList[] = [
  { value: "HOUR", label: "8 hours" },
  { value: "DAY", label: "8 days" },
  { value: "WEEK", label: "8 weeks" },
  { value: "MONTH", label: "8 months" },
];

export const ranks: ItemList[] = [
  { value: "", label: "all rank tiers" },
  {
    value: "IMMORTAL",
    label: "immortal",
    customAbbreviation: "/seasonal_rank/medal_8.png",
  },
  {
    value: "DIVINE",
    label: "divine",
    customAbbreviation: "/seasonal_rank/medal_7.png",
  },
  {
    value: "ANCIENT",
    label: "ancient",
    customAbbreviation: "/seasonal_rank/medal_6.png",
  },
  {
    value: "LEGEND",
    label: "legend",
    customAbbreviation: "/seasonal_rank/medal_5.png",
  },
  {
    value: "ARCHON",
    label: "archon",
    customAbbreviation: "/seasonal_rank/medal_4.png",
  },
  {
    value: "CRUSADER",
    label: "crusader",
    customAbbreviation: "/seasonal_rank/medal_3.png",
  },
  {
    value: "GUARDIAN",
    label: "guardian",
    customAbbreviation: "/seasonal_rank/medal_2.png",
  },
  {
    value: "HERALD",
    label: "herald",
    customAbbreviation: "/seasonal_rank/medal_1.png",
  },
];

export const positions: ItemList[] = [
  { value: "", label: "all positions", customAbbreviation: null },
  {
    value: "POSITION_1",
    label: "safe lane",
    customAbbreviation: "/HeroType/carry.svg",
    img: false,
    size: "20px",
  },
  {
    value: "POSITION_2",
    label: "mid lane",
    customAbbreviation: "/HeroType/mid.svg",
    img: false,
    size: "20px",
  },
  {
    value: "POSITION_3",
    label: "off lane",
    customAbbreviation: "/HeroType/offlane.svg",
    img: false,
    size: "20px",
  },
  {
    value: "POSITION_4",
    label: "soft support",
    customAbbreviation: "/HeroType/sp1.svg",
    img: false,
    size: "20px",
  },
  {
    value: "POSITION_5",
    label: "hard support",
    customAbbreviation: "/HeroType/sp2.svg",
    img: false,
    size: "20px",
  },
];

export const regions = [
  { value: "", label: "all regions" },
  {
    value: "CHINA",
    label: "china",
  },
  {
    value: "SEA",
    label: "sea asia",
  },
  {
    value: "NORTH_AMERICA",
    label: "north america",
  },
  {
    value: "SOUTH_AMERICA",
    label: "south america",
  },
  {
    value: "EUROPE",
    label: "europe",
  },
];

export const gameModes = [
  { value: "", label: "all game modes" },
  {
    value: "ALL_PICK",
    label: "all pick",
  },
  {
    value: "CAPTAINS_MODE",
    label: "captain's mode",
  },
  {
    value: "ALL_PICK_RANKED",
    label: "ranked all pick",
  },
  {
    value: "TURBO",
    label: "turbo",
  },
];
