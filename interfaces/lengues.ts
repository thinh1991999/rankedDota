export interface Lengue {
  id: number;
  displayName: string;
  region: string;
  nodeGroups: NodeGroup[];
  __typename: string;
}

export interface Node {
  id: number;
  scheduledTime: number;
  actualTime: number | null;
  teamOne: NodeGroup | null;
  teamTwo: NodeGroup | null;
  teamOneWins: number;
  teamTwoWins: number;
  hasStarted: boolean;
  isCompleted: boolean;
  nodeType: NodeType;
  matches: Match[];
  __typename: NodeTypename;
}

export interface NodeGroup {
  id: number;
  name: string;
  nodes?: Node[];
  __typename: NodeGroupTypename;
  tag?: string;
}

export enum NodeTypename {
  LeagueNodeType = "LeagueNodeType",
}

export interface Match {
  id: number;
  __typename: MatchTypename;
}

export enum MatchTypename {
  MatchType = "MatchType",
}

export enum NodeType {
  BestOfFive = "BEST_OF_FIVE",
  BestOfOne = "BEST_OF_ONE",
  BestOfThree = "BEST_OF_THREE",
  BestOfTwo = "BEST_OF_TWO",
}

export enum NodeGroupTypename {
  LeagueNodeGroupType = "LeagueNodeGroupType",
  TeamType = "TeamType",
}

export interface Data {
  data: DataSort;
}

export interface DataSort {
  league?: PurpleLeague;
  leagues?: LeagueElement[];
  ongoing?: Completed[];
  upcoming?: Completed[];
  completed?: Completed[];
}

export interface Completed {
  id: number;
  displayName: string;
  startDateTime: number;
  endDateTime: number;
  prizePool: number;
  liveMatches: LiveMatch[];
  standings: Standing[];
  matches: PurpleMatch[];
  matchesGroupBy: MatchesGroupByElement[];
  nodeGroups: CompletedNodeGroup[];
  __typename: CompletedTypename;
}

export enum CompletedTypename {
  LeagueType = "LeagueType",
}

export interface LiveMatch {
  matchId: number;
  __typename: string;
}

export interface PurpleMatch {
  id: number;
  radiantTeam: NodeGroup;
  direTeam: NodeGroup;
  didRadiantWin: boolean;
  __typename: MatchTypename;
}

export interface MatchesGroupByElement {
  id: number;
  __typename: MatchTypename;
}

export interface CompletedNodeGroup {
  nodeGroupType: NodeGroupType;
  __typename: NodeGroupTypename;
}

export enum NodeGroupType {
  BracketDoubleAllWinner = "BRACKET_DOUBLE_ALL_WINNER",
  BracketDoubleSeedLoser = "BRACKET_DOUBLE_SEED_LOSER",
  BracketSingle = "BRACKET_SINGLE",
  Gsl = "GSL",
  RoundRobin = "ROUND_ROBIN",
  Showmatch = "SHOWMATCH",
}

export interface Standing {
  standing: number;
  team: NodeGroup;
  __typename: StandingTypename;
}

export enum StandingTypename {
  TeamPrizeType = "TeamPrizeType",
}

export interface PurpleLeague {
  id: number;
  displayName: string;
  prizePool: number;
  startDateTime: number;
  endDateTime: number;
  __typename: CompletedTypename;
}

export interface LeagueElement {
  id: number;
  region: Region | null;
  tier: Tier;
  nodeGroups: NodeGroup[];
  displayName: string;
  __typename: CompletedTypename;
}

export enum Region {
  China = "CHINA",
  Cis = "CIS",
  Europe = "EUROPE",
  Na = "NA",
  Sa = "SA",
  Sea = "SEA",
  Unset = "UNSET",
}

export enum Tier {
  Amateur = "AMATEUR",
  International = "INTERNATIONAL",
  Professional = "PROFESSIONAL",
}

// Live
export interface Live {
  matches: Match[];
  __typename: string;
}

export interface Match {
  matchId: number;
  radiantTeamId: null;
  direTeamId: null;
  gameTime: number;
  spectators: number;
  createdDateTime: number;
  averageRank: number | null;
  radiantTeam: null;
  direTeam: null;
  league: null;
  players: Player[];
  radiantScore: number;
  direScore: number;
  completed: boolean;
  __typename: MatchTypename;
  playbackData: PlaybackData;
}

export enum MatchTypename {
  MatchLiveType = "MatchLiveType",
}

export interface PlaybackData {
  pickBans: Player[];
  __typename: PlaybackDataTypename;
}

export enum PlaybackDataTypename {
  MatchLivePlaybackDataType = "MatchLivePlaybackDataType",
}

export interface Player {
  heroId: number;
  isPick?: boolean;
  isRadiant: boolean;
  __typename: PlayerTypename;
  steamAccount?: SteamAccount;
}

export enum PlayerTypename {
  MatchLivePickBanType = "MatchLivePickBanType",
  MatchLivePlayerType = "MatchLivePlayerType",
}

export interface SteamAccount {
  id: number;
  seasonLeaderboardRank: number | null;
  proSteamAccount: ProSteamAccount | null;
  __typename: SteamAccountTypename;
}

export enum SteamAccountTypename {
  SteamAccountType = "SteamAccountType",
}

export interface ProSteamAccount {
  name: string;
  __typename: ProSteamAccountTypename;
}

export enum ProSteamAccountTypename {
  ProSteamAccountType = "ProSteamAccountType",
}
