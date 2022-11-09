import {
  AbilityDetail,
  Hero,
  HeroesStatus,
  TreeBranchInfo,
  HeroesMetaTrends,
  HeroTrends,
  SortedType,
} from "./heroes";
import { Item } from "./item";
import { GameVersion } from "./gameVersion";
import { MatchDetail } from "./matches";
import { Data, Lengue, Live } from "./lengues";
import { Season } from "./players";

export interface Root {
  globalData: GlobalData;
  compos: ComposData;
  matchDetail: MatchDetailData;
  lengues: Lengues;
  playersLeaderboard: PlayersLeaderboardData;
  heroesTrends: HeroesTrendsData;
}

export interface GlobalData {
  abilitiesData: AbilityDetail[];
  items: Item[];
  heroes: Hero[];
  gameVersions: GameVersion[];
  talents: TreeBranchInfo[];
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
}

export interface Lengues {
  lengues: Lengue[] | null;
  data: Data[] | null;
  live: Live | null;
}

export interface PlayersLeaderboardData {
  season: Season[];
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
