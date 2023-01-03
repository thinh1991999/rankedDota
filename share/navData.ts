export interface HeaderNav {
  name: string;
  icon?: string;
  fatherLink?: string;
  link: string;
  hint?: string;
  sub?: string;
  childs?: HeaderNav[];
}

export const headerNavs: HeaderNav[] = [
  {
    name: "Heros",
    link: "/heroes",
    icon: "/hero.svg",
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
    icon: "/HeaderNav/playersSub.svg",
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
    icon: "/HeaderNav/matches.svg",
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
    icon: "/HeaderNav/combosSub.svg",
  },
  {
    name: "Teams",
    link: "/teams",
    icon: "/HeaderNav/teamsSub.svg",
  },
];

export const heroesNavs: HeaderNav[] = [
  {
    name: "Overview",
    link: "/heroes",
    hint: "/heroes",
  },
  {
    name: "Meta",
    link: "/heroes/meta/trends",
    hint: "/heroes/meta/trends",
    fatherLink: "/heroes/meta/trends",
    childs: [
      {
        name: "Trends",
        link: "/heroes/meta/trends",
        hint: "/heroes/meta/trends",
        sub: "Win and pick rate leaderboard",
      },
      {
        name: "Positions",
        link: "/heroes/meta/positions",
        hint: "/heroes/meta/positions",
        sub: "Success rating by positions",
      },
    ],
  },
  {
    name: "Guides",
    link: "/heroes/guides",
    hint: "/heroes/guides",
  },
];

export const playersNavs: HeaderNav[] = [
  {
    name: "Rank",
    link: "/players/ranks",
    hint: "/players/ranks",
  },
  {
    name: "Queue",
    link: "/players/queue",
    hint: "/players/queue",
  },
  {
    name: "Highlights",
    link: "/players/highlights",
    hint: "/players/highlights",
  },
  {
    name: "Leaderboard",
    fatherLink: "/players/leaderboards",
    link: "/players/leaderboards/world?divisionId=0",
    hint: "/players/leaderboards/world",
    childs: [
      {
        name: "World",
        link: "/players/leaderboards/world?divisionIds=0",
        hint: "/players/leaderboards/world",
      },
      {
        name: "Coaches",
        link: "/players/leaderboards/coaches",
        hint: "/players/leaderboards/coaches",
      },
    ],
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

export const matchesNav = [
  {
    name: "Live",
    link: "/matches/live",
    hint: "/matches/live",
  },
  {
    name: "Graphs",
    link: "/matches/graphs",
    hint: "/matches/graphs",
  },
];
