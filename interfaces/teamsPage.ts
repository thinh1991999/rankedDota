export interface Team {
  team_id: number;
  rating: number;
  wins: number;
  losses: number;
  last_match_time: number;
  name: string;
  tag: string;
  logo_url: string;
}

export interface TeamHeader {
  id: number;
  name: string;
  __typename: string;
}

export interface TeamOverview {
  team: DataTeam;
  leagues: League[];
}

export interface League {
  id: number;
  displayName: string;
  region: null | string;
  nodeGroups?: any[];
  __typename: string;
}

export interface DataTeam {
  id: number;
  members: Member[];
  matches: TeamMatch[];
  __typename: TeamTypename;
  series: Series[];
  winCount: number;
  lossCount: number;
  countryCode: null;
  lastMatchDateTime: number;
  dateCreated: null;
}

export enum TeamTypename {
  TeamType = "TeamType",
}

export interface TeamMatch {
  id: number;
  players: PurplePlayer[];
  __typename: MatchTypename;
}

export enum MatchTypename {
  MatchType = "MatchType",
}

export interface PurplePlayer {
  steamAccountId: number;
  isVictory: boolean;
  heroId: number;
  __typename: PurpleTypename;
}

export enum PurpleTypename {
  MatchPlayerType = "MatchPlayerType",
}

export interface Member {
  lastMatchDateTime: number;
  firstMatchDateTime: number;
  player: MemberPlayer;
  __typename: MemberTypename;
}

export enum MemberTypename {
  SteamAccountTeamMemberType = "SteamAccountTeamMemberType",
}

export interface MemberPlayer {
  steamAccountId: number;
  steamAccount: PurpleSteamAccount;
  matchesGroupBy: MatchesGroupBy[];
  __typename: FluffyTypename;
}

export enum FluffyTypename {
  PlayerType = "PlayerType",
}

export interface MatchesGroupBy {
  teamId: number;
  matchCount: number;
  __typename: MatchesGroupByTypename;
}

export enum MatchesGroupByTypename {
  MatchGroupByType = "MatchGroupByType",
}

export interface PurpleSteamAccount {
  id: number;
  name: string;
  avatar: string;
  proSteamAccount: PurpleProSteamAccount;
  __typename: SteamAccountTypename;
}

export enum SteamAccountTypename {
  SteamAccountType = "SteamAccountType",
}

export interface PurpleProSteamAccount {
  name: string;
  countries: string[];
  realName: string;
  position: Position;
  __typename: ProSteamAccountTypename;
}

export enum ProSteamAccountTypename {
  ProSteamAccountType = "ProSteamAccountType",
}

export enum Position {
  Position1 = "POSITION_1",
  Position2 = "POSITION_2",
  Position3 = "POSITION_3",
  Position4 = "POSITION_4",
  Position5 = "POSITION_5",
}

export interface Series {
  id: number;
  teamOne: TeamOneClass;
  teamTwo: TeamOneClass;
  teamOneWins: number;
  teamTwoWins: number;
  nodeType: string;
  matches: SeriesMatch[];
  league: League;
  __typename: string;
}

export interface SeriesMatch {
  startDateTime: number;
  id: number;
  durationSeconds: number;
  radiantTeamId: number;
  didRadiantWin: boolean;
  players: FluffyPlayer[];
  radiantKills: number[];
  direKills: number[];
  pickBans: PickBan[];
  __typename: MatchTypename;
}

export interface PickBan {
  heroId: number;
  isPick: boolean;
  isRadiant: boolean;
  order: number;
  __typename: PickBanTypename;
}

export enum PickBanTypename {
  MatchStatsPickBanType = "MatchStatsPickBanType",
}

export interface FluffyPlayer {
  heroId: number;
  kills: number;
  position: Position;
  steamAccount: FluffySteamAccount;
  __typename: PurpleTypename;
  matchId: number;
  steamAccountId: number;
}

export interface FluffySteamAccount {
  id: number;
  name: string;
  avatar: string;
  isAnonymous: boolean;
  smurfFlag: number;
  proSteamAccount: FluffyProSteamAccount;
  __typename: SteamAccountTypename;
}

export interface FluffyProSteamAccount {
  name: string;
  team: TeamOneClass | null;
  __typename: ProSteamAccountTypename;
}

export interface TeamOneClass {
  id: number;
  tag: Tag;
  __typename: TeamTypename;
  name?: string;
}

export enum Tag {
  AST = "AST",
  Ent = "ENT",
  Fna = "FNA",
  Mg = "MG",
  Ngx = "NGX",
  Og = "OG",
  Rsg = "RSG",
  SEC = "SEC",
  Tln = "TLN",
  Tun = "TUN",
}

export interface Track {
  name: string;
  duration: number;
}
