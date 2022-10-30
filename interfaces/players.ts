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
