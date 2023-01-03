export const homeCards: any = [
  {
    name: "Heros",
    img: "/card1.jpg",
    link: "/heroes",
  },
  {
    name: "Public Matches",
    img: "/card2.jpg",
    link: "/matches/live",
  },
  {
    name: "Pro Matches",
    img: "/card3.jpg",
  },
  {
    name: "Pro Teams",
    img: "/card4.jpg",
    link: "/teams",
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
