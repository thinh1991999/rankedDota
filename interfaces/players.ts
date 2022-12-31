export interface Stratz {
  page: Page;
  __typename: string;
}

export interface Page {
  players: Players;
  __typename: string;
}

export interface Players {
  steamAccountByRank: SteamAccountByRank[];
  __typename: string;
}

export interface SteamAccountByRank {
  rank: number | null;
  playerCount: number;
  __typename: string;
}

export interface Matches {
  matchmakingStats: MatchmakingStat[];
  __typename: string;
}

export interface MatchmakingStat {
  timestamp: number;
  australia: number;
  austria: number;
  brazil: number;
  chile: number;
  dubai: number;
  europe: number;
  india: number;
  japan: number;
  perfectWorldTelecom: number;
  perfectWorldTelecomGuangdong: number;
  perfectWorldTelecomWuhan: number;
  perfectWorldTelecomZhejiang: number;
  perfectWorldUnicom: number;
  perfectWorldUnicomTianjin: number;
  peru: number;
  singapore: number;
  southAfrica: number;
  stockholm: number;
  taiwan: number;
  usEast: number;
  usWest: number;
  __typename: string;
}

export interface Leaderboard {
  coaching: Coaching;
  __typename: string;
}

export interface Coaching {
  players: Player[];
  __typename: string;
}

export interface Player {
  steamAccount: SteamAccount;
  matchCount: number;
  winCount: number;
  rating: number;
  __typename: string;
}

export interface SteamAccount {
  id: number;
  seasonRank: number | null;
  seasonLeaderboardRank: null;
  avatar: string;
  lastMatchRegionId: number | null;
  name: string;
  proSteamAccount: null;
  isAnonymous: boolean;
  smurfFlag: number | null;
  __typename: string;
}

export interface Season {
  playerCount?: number;
  players: PlayerSeason[];
  countryData?: CountryDatum[];
  positionData?: PositionDatum[];
  teamData?: Team[];
  __typename?: string;
  name?: string;
  founded?: number;
  members?: string[];
}

export interface CountryDatum {
  countryCode: null | string;
  playerCount: number;
  __typename: CountryDatumTypename;
}

export enum CountryDatumTypename {
  SteamAccountSeasonActiveLeaderboardCountryDataType = "SteamAccountSeasonActiveLeaderboardCountryDataType",
}

export interface PlayerSeason {
  steamAccountId: number;
  steamAccount: SteamAccountSeason;
  rank: number;
  rankShift: number;
  position: null | string;
  __typename: string;
}

export enum PlayerTypename {
  SteamAccountSeasonActiveLeaderboardRankType = "SteamAccountSeasonActiveLeaderboardRankType",
}

export interface SteamAccountSeason {
  id: number;
  countryCode: null | string;
  isAnonymous: boolean;
  proSteamAccount: ProSteamAccount | null;
  name: string;
  __typename: SteamAccountTypename;
}

export enum SteamAccountTypename {
  SteamAccountType = "SteamAccountType",
}

export interface ProSteamAccount {
  countries: string[];
  __typename: ProSteamAccountTypename;
  name: string;
  team: Team;
}

export enum ProSteamAccountTypename {
  ProSteamAccountType = "ProSteamAccountType",
}

export interface Team {
  tag?: string;
  id: number;
  name: string;
  __typename: TeamDatumTypename;
}

export enum TeamDatumTypename {
  TeamType = "TeamType",
}

export interface PositionDatum {
  position: string;
  playerCount: number;
  __typename: string;
}

export interface Album {
  name: string;
  artist: ArtistClass;
  tracks: Track[];
}

export interface ArtistClass {
  name: string;
  founded: number;
  members: string[];
}

export interface Track {
  name: string;
  duration: number;
}
