export interface Region {
  id: number;
  name: string;
  clientName: null | string;
  displayName: string;
  leaderboardDivision: string | null;
  langKey: null | string;
  latitude: number;
  longitude: number;
  code: null | string;
  matchGroup: number;
  weekendTourneyDivision: null | string;
  __typename: string;
}

export enum Typename {
  RegionType = "RegionType",
}
