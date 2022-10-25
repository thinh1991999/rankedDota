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
  __typename: Typename;
}

export enum Typename {
  SteamAccountByRankType = "SteamAccountByRankType",
}
