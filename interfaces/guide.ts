export interface GuideSymbol {
  heroId: number;
  guides: Guide[];
  __typename: string;
}

export interface Guide {
  heroId: number;
  match: Match;
  matchPlayer: MatchPlayer;
  __typename: string;
}

export interface Match {
  id: number;
  durationSeconds: number;
  players: Player[];
  __typename: string;
}

export interface Player {
  matchId: number;
  steamAccountId: number;
  heroId: number;
  role: Role;
  lane: Lane;
  __typename: PlayerTypename;
}

export enum PlayerTypename {
  MatchPlayerType = "MatchPlayerType",
}

export enum Lane {
  MidLane = "MID_LANE",
  OffLane = "OFF_LANE",
  SafeLane = "SAFE_LANE",
}

export enum Role {
  Core = "CORE",
  HardSupport = "HARD_SUPPORT",
  LightSupport = "LIGHT_SUPPORT",
}

export interface MatchPlayer {
  matchId: number;
  steamAccountId: number;
  heroId: number;
  role: Role;
  lane: Lane;
  steamAccount: SteamAccount;
  assists: number;
  deaths: number;
  imp: number;
  isRadiant: boolean;
  item0Id: number;
  item1Id: number;
  item2Id: number;
  item3Id: number;
  item4Id: null;
  item5Id: number;
  neutral0Id: number;
  kills: number;
  additionalUnit: null;
  stats: Stats;
  level: number;
  __typename: PlayerTypename;
}

export interface Stats {
  abilities: Ability[];
  itemPurchases: ItemPurchase[];
  level: number[];
  __typename: string;
}

export interface Ability {
  abilityId: number;
  time: number;
  __typename: AbilityTypename;
}

export enum AbilityTypename {
  PlayerAbilityType = "PlayerAbilityType",
}

export interface ItemPurchase {
  itemId: number;
  time: number;
  __typename: ItemPurchaseTypename;
}

export enum ItemPurchaseTypename {
  MatchPlayerItemPurchaseEventType = "MatchPlayerItemPurchaseEventType",
}

export interface SteamAccount {
  id: number;
  name: string;
  proSteamAccount: null;
  __typename: string;
}
