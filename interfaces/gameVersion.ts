export interface GameVersion {
  id: number;
  name: string;
  asOfDateTime: number;
}

export interface WinGameVersion {
  gameVersionId: number;
  heroId: number;
  winCount: number;
  matchCount: number;
  __typename: string;
}
