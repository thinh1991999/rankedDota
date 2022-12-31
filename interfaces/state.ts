import {
  AbilityDetail,
  Hero,
  HeroesStatus,
  TreeBranchInfo,
  HeroesMetaTrends,
  HeroTrends,
  SortedType,
  MetaPositions,
} from "./heroes";
import { Item } from "./item";
import { GameVersion } from "./gameVersion";
import { MatchDetail } from "./matches";
import { Data, Lengue, Live } from "./lengues";
import { Season } from "./players";
import { ReactNode } from "react";
import { Region } from "./region";

export interface Root {
  globalData: GlobalData;
  compos: ComposData;
  matchDetail: MatchDetailData;
  lengues: Lengues;
  playersLeaderboard: PlayersLeaderboardData;
  heroesTrends: HeroesTrendsData;
  heroesPositions: HeroesPositionsData;
}

export interface GlobalData {
  abilitiesData: AbilityDetail[];
  regions: Region[];
  items: Item[];
  heroes: Hero[];
  gameVersions: GameVersion[];
  talents: TreeBranchInfo[];
  headerImg: string;
  subHeaderMain: ReactNode;
  isTransparentHeader: boolean;
  showScrollTop: boolean;
  showNavBarMobile: boolean;
  loading: boolean;
}

export interface ComposData {
  heroesStatus: HeroesStatus | null;
  radiants: Hero[];
  dires: Hero[];
}

export interface MatchDetailData {
  loading: boolean;
  matchDetail: MatchDetail | null;
  timeSeek: number;
  timesLabel: number[];
  currSeconds: number;
  errMess: null | string;
}

export interface Lengues {
  lengues: Lengue[] | null;
  data: Data[] | null;
  live: Live | null;
}

export interface PlayersLeaderboardData {
  season: Season | null;
  loading: boolean;
}

export interface HeroesTrendsData {
  heroesTrends: HeroesMetaTrends | null;
  loading: boolean;
  dataHandled: HeroTrends[];
  sorted: {
    type: SortedType;
    status: boolean;
  };
  searchName: string;
  maxPr: number;
  errMess: string | null;
  dataRange: {
    begin: number;
    end: number;
  };
}

export interface HeroesPositionsData {
  heroesPositions: MetaPositions | null;
  loading: boolean;
  errMess: string | null;
}
