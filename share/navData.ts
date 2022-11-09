type HeaderNav = {
  name: string;
  link: string;
  sub?: string;
  childs?: HeaderNav[];
};

export const headerNavs: HeaderNav[] = [
  {
    name: "Heros",
    link: "/heroes",
    childs: [
      {
        name: "Overview",
        link: "/heroes",
      },
      {
        name: "Meta",
        link: "/",
        childs: [
          {
            name: "Trends",
            link: "/heroes/meta/trends",
            sub: "Win and pick rate leaderboard",
          },
          {
            name: "Positions",
            link: "/heroes/meta/positions",
            sub: "Success rating by positions",
          },
        ],
      },
      {
        name: "Guides",
        link: "/heroes/guides",
      },
    ],
  },
  {
    name: "Players",
    link: "/players/ranks",
    childs: [
      {
        name: "Rank",
        link: "/players/ranks",
      },
      {
        name: "Queue",
        link: "/players/queue",
      },
      {
        name: "Highlights",
        link: "/players/highlights",
      },
      {
        name: "Leaderboard",
        link: "/players/leaderboards/world?divisionId=0",
        childs: [
          {
            name: "World",
            link: "/players/leaderboards/world?divisionId=0",
          },
          {
            name: "Coaches",
            link: "/players/leaderboards/coaches",
          },
        ],
      },
    ],
  },
  {
    name: "Matches",
    link: "/matches/live",
    childs: [
      {
        name: "Live",
        link: "/matches/live",
      },
      {
        name: "Graphs",
        link: "/matches/graphs",
      },
    ],
  },
  {
    name: "Combos",
    link: "/combos",
  },
  {
    name: "Teams",
    link: "/teams",
  },
];

export const mathDetailNav = [
  {
    title: "Overview",
  },
  {
    title: "Scoreboard",
  },
  {
    title: "Builds",
    childs: [
      {
        title: "Summary",
      },
      {
        title: "Timeline",
      },
    ],
  },
  {
    title: "lanes",
    childs: [
      {
        title: "Summary",
      },
      {
        title: "Positions",
      },
    ],
  },
  {
    title: "log",
  },
  {
    title: "Graphs",
  },
  {
    title: "maps",
  },
  {
    title: "Focus",
  },
  {
    title: "Performance",
  },
  {
    title: "Farm",
  },
  {
    title: "Playback",
  },
];
