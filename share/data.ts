import { BsColumnsGap } from "react-icons/bs";
import { MdOutlineTrendingUp } from "react-icons/md";

export const headerNavs: any = [
  {
    name: "Heros",
    childs: [
      {
        name: "All Heros",
        icon: BsColumnsGap,
        link: "/",
      },
      {
        name: "Treanding Heros",
        icon: MdOutlineTrendingUp,
        link: "/",
      },
    ],
  },
  {
    name: "Matches",
    childs: [
      {
        name: "Public Matches",
        icon: BsColumnsGap,
        link: "/",
      },
      {
        name: "Pro",
        icon: MdOutlineTrendingUp,
        link: "/",
      },
    ],
  },
  {
    name: "Teams",
    link: "/teams",
  },
];

export const homeCards: any = [
  {
    name: "Heros",
    img: "/card1.jpg",
    link: "/heroes",
  },
  {
    name: "Public Matches",
    img: "/card2.jpg",
  },
  {
    name: "Pro Matches",
    img: "/card3.jpg",
  },
  {
    name: "Pro Teams",
    img: "/card4.jpg",
  },
];

export const heroRankOptions: {
  title: string;
  query: string;
}[] = [
  {
    title: "All rank tiers",
    query: "",
  },
  {
    title: "Divine - Immortal",
    query: "DIVINE_IMMORTAL",
  },
  {
    title: "Legend - Ancient",
    query: "LEGEND_ANCIENT",
  },
  {
    title: "Crusader - Archon",
    query: "CRUSADER_ARCHON",
  },
  {
    title: "Herald - Guardian",
    query: "HERALD_GUARDIAN",
  },
];
