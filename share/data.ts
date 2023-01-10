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
    hint: "/heroes",
    icon: "/hero.svg",
    childs: [
      {
        name: "Overview",
        link: "/heroes",
        hint: "/heroes",
      },
      {
        name: "Meta",
        link: "heroes/meta/trends",
        hint: "heroes/meta/trends",
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
      // {
      //   name: "Guides",
      //   link: "/heroes/guides",
      //   hint: "/heroes/guides",
      // },
    ],
  },
  {
    name: "Players",
    link: "/players/ranks",
    hint: "/players/ranks",
    icon: "/HeaderNav/playersSub.svg",
    childs: [
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
      // {
      //   name: "Highlights",
      //   link: "/players/highlights",
      //   hint: "/players/highlights",

      // },
      {
        name: "Leaderboard",
        link: "/players/leaderboards/world?divisionId=0",
        hint: "/players/leaderboards/world",
        childs: [
          {
            name: "World",
            link: "/players/leaderboards/world?divisionId=0",
            hint: "/players/leaderboards/world",
          },
          {
            name: "Coaches",
            link: "/players/leaderboards/coaches",
            hint: "/players/leaderboards/coaches",
          },
        ],
      },
    ],
  },
  {
    name: "Matches",
    link: "/matches/live",
    hint: "/matches/live",
    icon: "/HeaderNav/matches.svg",
    childs: [
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
    ],
  },
  {
    name: "Combos",
    link: "/combos",
    hint: "/combos",
    icon: "/HeaderNav/combosSub.svg",
  },
  {
    name: "Teams",
    link: "/teams",
    hint: "/teams",
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
  // {
  //   name: "Guides",
  //   link: "/heroes/guides",
  //   hint: "/heroes/guides",
  // },
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
  // {
  //   name: "Highlights",
  //   link: "/players/highlights",
  //   hint: "/players/highlights",
  // },
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
    name: "Combos",
    img: "/card3.jpg",
    link: "/combos",
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

export const towerPos = [
  { npcId: 41, x: 10, y: 184, type: "TOWER", isRadiant: true },
  { npcId: 47, x: 187, y: 23, type: "TOWER", isRadiant: false },
  { npcId: 38, x: 19.0354, y: 184, type: "TOWER", isRadiant: true },
  { npcId: 44, x: 187, y: 33.0394, type: "TOWER", isRadiant: false },
  { npcId: 40, x: 52.189, y: 227.925, type: "TOWER", isRadiant: true },
  { npcId: 49, x: 222, y: 67, type: "TOWER", isRadiant: false },
  { npcId: 43, x: 52.189, y: 217.886, type: "TOWER", isRadiant: true },
  { npcId: 46, x: 232.04, y: 67, type: "TOWER", isRadiant: false },
  { npcId: 42, x: 39, y: 191, type: "TOWER", isRadiant: true },
  { npcId: 48, x: 193, y: 53, type: "TOWER", isRadiant: false },
  { npcId: 39, x: 46.0276, y: 197.024, type: "TOWER", isRadiant: true },
  { npcId: 45, x: 200.027, y: 59.0236, type: "TOWER", isRadiant: false },
  { npcId: 26, x: 45, y: 23, type: "TOWER", isRadiant: false },
  { npcId: 29, x: 119, y: 21, type: "TOWER", isRadiant: false },
  { npcId: 32, x: 180, y: 25, type: "TOWER", isRadiant: false },
  { npcId: 28, x: 225, y: 149, type: "TOWER", isRadiant: false },
  { npcId: 18, x: 204, y: 222, type: "TOWER", isRadiant: true },
  { npcId: 16, x: 18, y: 91, type: "TOWER", isRadiant: true },
  { npcId: 19, x: 18, y: 136, type: "TOWER", isRadiant: true },
  { npcId: 22, x: 13, y: 177, type: "TOWER", isRadiant: true },
  { npcId: 21, x: 117, y: 224, type: "TOWER", isRadiant: true },
  { npcId: 24, x: 57.2046, y: 221.902, type: "TOWER", isRadiant: true },
  { npcId: 31, x: 225, y: 115, type: "TOWER", isRadiant: false },
  { npcId: 34, x: 225, y: 72, type: "TOWER", isRadiant: false },
  { npcId: 33, x: 191, y: 59, type: "TOWER", isRadiant: false },
  { npcId: 35, x: 203, y: 42, type: "TOWER", isRadiant: false },
  { npcId: 35, x: 209.024, y: 48.0236, type: "TOWER", isRadiant: false },
  { npcId: 30, x: 162, y: 86, type: "TOWER", isRadiant: false },
  { npcId: 27, x: 131.516, y: 110.433, type: "TOWER", isRadiant: false },
  { npcId: 17, x: 96, y: 144, type: "TOWER", isRadiant: true },
  { npcId: 20, x: 67, y: 166, type: "TOWER", isRadiant: true },
  { npcId: 23, x: 45, y: 188, type: "TOWER", isRadiant: true },
  { npcId: 25, x: 27, y: 201, type: "TOWER", isRadiant: true },
  { npcId: 25, x: 33.0234, y: 207.024, type: "TOWER", isRadiant: true },
  { npcId: 50, x: 23, y: 207, type: "FORT", isRadiant: true },
  { npcId: 51, x: 211, y: 36, type: "FORT", isRadiant: false },
];

export const talentsData = [
  {
    slot: 0,
    x1: -19.9316,
    y1: 40.4932,
    x2: 2.7414,
    y2: 63.1662,
    gradientTransform: "matrix(-1 0 0 1 26.8457 0)",
    stop: [
      {
        offset: 0.1257,
        color: "rgb(231, 189, 118)",
      },
      {
        offset: 0.1298,
        color: "rgb(230, 187, 116)",
      },
      {
        offset: 0.2466,
        color: "rgb(212, 142, 78)",
      },
      {
        offset: 0.3335,
        color: "rgb(204, 117, 59)",
      },
      {
        offset: 0.3803,
        color: "rgb(201, 108, 53)",
      },
      {
        offset: 0.8908,
        color: "rgb(201, 109, 52)",
      },
      {
        offset: 0.9078,
        color: "rgb(204, 116, 57)",
      },
      {
        offset: 0.9366,
        color: "rgb(210, 134, 71)",
      },
      {
        offset: 0.9734,
        color: "rgb(222, 167, 99)",
      },
      {
        offset: 0.9891,
        color: "rgb(229, 185, 114)",
      },
    ],
    dPath:
      "M51,44.716c0,0-6.586,6.584-9.823,6.805c-3.235,0.224-7.032,0-7.032,0s-7.024,1.732-7.024,7.368V63 l-3.195-0.014c0,0,0-3.782,0-5.571c0-6.857,10.052-7.567,10.052-7.567S39.057,41.979,51,44.716z",
    id: "1r",
  },
  {
    slot: 2,
    id: "2r",
    x1: -21.8032,
    y1: 28.7007,
    x2: 8.0713,
    y2: 58.5753,
    gradientTransform: "matrix(-1 0 0 1 27.5703 0)",
    stop: [
      {
        offset: 0.0938,
        color: "rgb(231, 189, 118)",
      },
      {
        offset: 0.3301,
        color: "rgb(201, 108, 53)",
      },
      {
        offset: 0.5241,
        color: "rgb(201, 110, 54)",
      },
      {
        offset: 0.6135,
        color: "rgb(203, 115, 57)",
      },
      {
        offset: 0.6814,
        color: "rgb(206, 124, 64)",
      },
      {
        offset: 0.7385,
        color: "rgb(210, 136, 74)",
      },
      {
        offset: 0.7888,
        color: "rgb(217, 154, 89)",
      },
      {
        offset: 0.8337,
        color: "rgb(226, 178, 108)",
      },
      {
        offset: 0.844,
        color: "rgb(229, 185, 114)",
      },
      {
        offset: 1,
        color: "rgb(242, 214, 139)",
      },
    ],
    dPath:
      "M51,30.326c0,0-5.745,9.07-9.517,9.495c-3.1,0.348-6.542,0.107-8.12,0.262 c-3.069,0.301-6.257,1.351-6.257,5.667V63h-3.182c0,0,0-17.488,0-18.454c0-0.964,0.006-5.235,7.093-6.584 c1.208-0.232,3.688-0.281,4.913-0.281C35.931,37.681,40.451,29.951,51,30.326z",
  },
  {
    slot: 4,
    id: "3r",
    x1: -12.814,
    y1: 14.5498,
    x2: 13.2803,
    y2: 59.7464,
    gradientTransform: "matrix(-1 0 0 1 31.5703 0)",
    stop: [
      {
        offset: 0.0938,
        color: "rgb(231, 189, 118)",
      },
      {
        offset: 0.2261,
        color: "rgb(201, 108, 53)",
      },
      {
        offset: 0.3757,
        color: "rgb(201, 110, 54)",
      },
      {
        offset: 0.4915,
        color: "rgb(204, 117, 59)",
      },
      {
        offset: 0.5961,
        color: "rgb(208, 129, 67)",
      },
      {
        offset: 0.694,
        color: "rgb(213, 145, 81)",
      },
      {
        offset: 0.7864,
        color: "rgb(222, 169, 101)",
      },
      {
        offset: 0.8335,
        color: "rgb(229, 185, 114)",
      },
      {
        offset: 1,
        color: "rgb(242, 214, 139)",
      },
    ],
    dPath:
      "M46.969,16.042c0,0-0.669,3.435-2.898,6.315c-2.232,2.878-4.147,4.891-6.489,4.891 c-2.344,0-6.208-0.01-7.68,0.868c-1.837,1.095-2.803,3.213-2.803,5.373c0,0.976,0,29.511,0,29.511h-3.174V33.489 c0,0,0.086-3.859,3.103-6.426c1.651-1.405,2.911-2.141,5.295-2.141c0.907,0,2.041-0.019,2.041-0.019s1.785-4.153,5.187-6.203 C42.954,16.651,46.969,16.042,46.969,16.042z",
  },
  {
    slot: 6,
    id: "4r",
    x1: -7.8799,
    y1: 3.667,
    x2: 23.3677,
    y2: 57.7894,
    gradientTransform: "",
    stop: [
      {
        offset: 0.0938,
        color: "rgb(231, 189, 118)",
      },
      {
        offset: 0.2261,
        color: "rgb(201, 108, 53)",
      },
      {
        offset: 0.4401,
        color: "rgb(207, 126, 65)",
      },
      {
        offset: 0.5891,
        color: "rgb(215, 148, 84)",
      },
      {
        offset: 0.7544,
        color: "rgb(228, 183, 113)",
      },
      {
        offset: 0.7585,
        color: "rgb(229, 185, 114)",
      },
      {
        offset: 1,
        color: "rgb(242, 214, 139)",
      },
    ],
    dPath:
      "M39.967,0c0,0,0.803,7.891-2.625,11.654c-3.426,3.761-5.551,2.683-7.765,3.097 c-1.969,0.369-2.479,1.772-2.479,3.984c0,2.212,0,44.209,0,44.209h-3.101c0,0-0.073-43.305-0.073-44.209 c0-0.905,0.02-4.906,3.793-6.115c1.592-0.509,2.335-0.376,2.917-2.293C31.218,8.408,33.04,1.99,39.967,0z",
  },
  {
    slot: 1,
    x1: -43.2212,
    y1: 40.4932,
    x2: -20.5475,
    y2: 63.1668,
    gradientTransform: "matrix(1 0 0 1 47.457 0)",
    stop: [
      {
        offset: 0.1257,
        color: "rgb(231, 189, 118)",
      },
      {
        offset: 0.1298,
        color: "rgb(230, 187, 116)",
      },
      {
        offset: 0.2466,
        color: "rgb(212, 142, 78)",
      },
      {
        offset: 0.3335,
        color: "rgb(204, 117, 59)",
      },
      {
        offset: 0.3803,
        color: "rgb(201, 108, 53)",
      },
      {
        offset: 0.8908,
        color: "rgb(201, 109, 52)",
      },
      {
        offset: 0.9078,
        color: "rgb(204, 116, 57)",
      },
      {
        offset: 0.9366,
        color: "rgb(210, 134, 71)",
      },
      {
        offset: 0.9734,
        color: "rgb(222, 167, 99)",
      },
      {
        offset: 0.9891,
        color: "rgb(229, 185, 114)",
      },
    ],
    dPath:
      "M0.013,44.716c0,0,6.586,6.584,9.823,6.805c3.236,0.224,7.033,0,7.033,0s7.024,1.732,7.024,7.368V63 l3.195-0.014c0,0,0-3.782,0-5.571c0-6.857-10.053-7.567-10.053-7.567S11.957,41.979,0.013,44.716z",
    id: "1l",
  },
  {
    slot: 3,
    id: "2l",
    x1: 1.6265,
    y1: 28.7007,
    x2: 31.5003,
    y2: 58.5746,
    gradientTransform: "matrix(1 0 0 1 47.457 0)",
    stop: [
      {
        offset: 0.0938,
        color: "rgb(231, 189, 118)",
      },
      {
        offset: 0.3301,
        color: "rgb(201, 108, 53)",
      },
      {
        offset: 0.5241,
        color: "rgb(201, 110, 54)",
      },
      {
        offset: 0.6135,
        color: "rgb(203, 115, 57)",
      },
      {
        offset: 0.6814,
        color: "rgb(206, 124, 64)",
      },
      {
        offset: 0.7385,
        color: "rgb(210, 136, 74)",
      },
      {
        offset: 0.7888,
        color: "rgb(217, 154, 89)",
      },
      {
        offset: 0.8337,
        color: "rgb(226, 178, 108)",
      },
      {
        offset: 0.844,
        color: "rgb(229, 185, 114)",
      },
      {
        offset: 1,
        color: "rgb(242, 214, 139)",
      },
    ],
    dPath:
      "M0,30.326c0,0,5.744,9.07,9.516,9.495c3.1,0.348,6.542,0.107,8.122,0.262 c3.068,0.301,6.256,1.351,6.256,5.667V63h3.181c0,0,0-17.488,0-18.454c0-0.964-0.006-5.235-7.093-6.584 c-1.207-0.232-3.687-0.281-4.913-0.281C15.068,37.681,10.547,29.951,0,30.326z",
  },
  {
    slot: 5,
    id: "3l",
    x1: 6.6157,
    y1: 14.5508,
    x2: 32.7095,
    y2: 59.7465,
    gradientTransform: "",
    stop: [
      {
        offset: 0.0938,
        color: "rgb(231, 189, 118)",
      },
      {
        offset: 0.2261,
        color: "rgb(201, 108, 53)",
      },
      {
        offset: 0.3757,
        color: "rgb(201, 110, 54)",
      },
      {
        offset: 0.4915,
        color: "rgb(204, 117, 59)",
      },
      {
        offset: 0.5961,
        color: "rgb(208, 129, 67)",
      },
      {
        offset: 0.694,
        color: "rgb(213, 145, 81)",
      },
      {
        offset: 0.7864,
        color: "rgb(222, 169, 101)",
      },
      {
        offset: 0.8335,
        color: "rgb(229, 185, 114)",
      },
      {
        offset: 1,
        color: "rgb(242, 214, 139)",
      },
    ],
    dPath:
      "M4.031,16.042c0,0,0.669,3.435,2.899,6.315c2.232,2.878,4.147,4.891,6.489,4.891 c2.344,0,6.208-0.01,7.68,0.868c1.837,1.095,2.803,3.213,2.803,5.373c0,0.976,0,29.511,0,29.511h3.173V33.489 c0,0-0.085-3.859-3.102-6.426c-1.651-1.405-2.911-2.141-5.294-2.141c-0.908,0-2.041-0.019-2.041-0.019s-1.785-4.153-5.188-6.203 C8.046,16.651,4.031,16.042,4.031,16.042z",
  },
  {
    slot: 7,
    id: "4l",
    x1: 4.6816,
    y1: 3.666,
    x2: 35.9297,
    y2: 57.7892,
    gradientTransform: "",
    stop: [
      {
        offset: 0.0938,
        color: "rgb(231, 189, 118)",
      },
      {
        offset: 0.2261,
        color: "rgb(201, 108, 53)",
      },
      {
        offset: 0.4401,
        color: "rgb(207, 126, 65)",
      },
      {
        offset: 0.5891,
        color: "rgb(215, 148, 84)",
      },
      {
        offset: 0.7544,
        color: "rgb(228, 183, 113)",
      },
      {
        offset: 0.7585,
        color: "rgb(229, 185, 114)",
      },
      {
        offset: 1,
        color: "rgb(242, 214, 139)",
      },
    ],
    dPath:
      "M11.033,0c0,0-0.802,7.891,2.625,11.654c3.426,3.761,5.55,2.683,7.765,3.097 c1.969,0.369,2.479,1.772,2.479,3.984c0,2.212,0,44.209,0,44.209h3.101c0,0,0.072-43.305,0.072-44.209 c0-0.905-0.019-4.906-3.792-6.115c-1.592-0.509-2.334-0.376-2.918-2.293C19.782,8.408,17.96,1.99,11.033,0z",
  },
];
