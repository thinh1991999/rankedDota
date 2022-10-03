// export interface MatchGraph {
//   month: number;
//   matchCount: number;
//   __typename: string;
// }

// export interface MatchLive {
//   matchId: number;
//   spectators: number;
//   gameTime: number;
//   averageRank: number;
//   league: null;
//   players: Player[];
//   playbackData: WelcomePlaybackData;
//   isParsing: boolean;
//   __typename: string;
//   radiantScore: number;
//   direScore: number;
//   radiantTeam: null;
//   direTeam: null;
//   serverSteamId: string;
//   winRateValues: number[];
//   durationValues: number[];
//   liveWinRateValues: LiveWinRateValue[];
// }

// export interface LiveWinRateValue {
//   winRate: number;
//   __typename: string;
// }

// export interface WelcomePlaybackData {
//   buildingEvents: BuildingEvent[];
//   __typename: string;
//   radiantScore: any[];
//   direScore: any[];
// }

// export interface BuildingEvent {
//   npcId: number;
//   isAlive: boolean;
//   __typename: string;
//   isRadiant: boolean;
//   type: string;
//   indexId: number;
//   time: number;
//   positionX: number;
//   positionY: number;
// }

// export enum BuildingEventTypename {
//   MatchLiveBuildingDetailType = "MatchLiveBuildingDetailType",
// }

// export interface Player {
//   heroId: number;
//   numKills: number;
//   numDeaths: number;
//   numAssists: number;
//   steamAccount: SteamAccount;
//   __typename: PlayerTypename;
//   isRadiant: boolean;
//   playbackData: PlayerPlaybackData;
//   level: number;
//   networth: number;
// }

// export enum PlayerTypename {
//   MatchLivePlayerType = "MatchLivePlayerType",
// }

// export interface PlayerPlaybackData {
//   positionEvents: PositionEvent[];
//   __typename: PlaybackDataTypename;
// }

// export enum PlaybackDataTypename {
//   MatchPlayerLivePlaybackDataType = "MatchPlayerLivePlaybackDataType",
// }

// export interface PositionEvent {
//   x: number;
//   y: number;
//   time: number;
//   __typename: PositionEventTypename;
// }

// export enum PositionEventTypename {
//   MatchLivePlayerPositionDetailType = "MatchLivePlayerPositionDetailType",
// }

// export interface SteamAccount {
//   id: number;
//   name: string;
//   proSteamAccount?: ProSteamAccount;
//   avatar: string;
//   isAnonymous: boolean;
//   smurfFlag: number;
//   __typename: string;
// }

// export interface ProSteamAccount {
//   name: string;
//   team: Team;
//   __typename: string;
// }

// export interface Team {
//   id: number;
//   tag: string;
//   name: string;
//   __typename: string;
// }

// Match Detail
export interface MatchDetail {
  id: number;
  durationSeconds: number;
  didRadiantWin: boolean;
  statsDateTime: number | null;
  stats: WelcomeStats;
  players: PlayerMatchDetail[];
  __typename: string;
  topLaneOutcome: null;
  bottomLaneOutcome: null;
  midLaneOutcome: null;
  endDateTime: number;
  rank: number;
  radiantTeam: null;
  direTeam: null;
  series: null;
  analysisOutcome: null;
  lobbyType: string;
  gameMode: string;
  regionId: number;
  league: null;
}

export interface PlayerMatchDetail {
  role: null;
  lane: null;
  heroId: number;
  level: number;
  neutral0Id: number;
  steamAccount: SteamAccountMatchDetail;
  stats: PlayerStats;
  __typename: PlayerTypename;
  isRadiant: boolean;
  award: null;
  imp: null;
  additionalUnit: null;
  item0Id: number;
  item1Id: number;
  item2Id: number;
  item3Id: number;
  item4Id: number;
  item5Id: number;
  kills: number;
  deaths: number;
  assists: number;
  networth: number;
  goldPerMinute: number;
  experiencePerMinute: number;
  numLastHits: number;
  numDenies: number;
  heroDamage: number;
  towerDamage: number;
  heroAverage: null;
  playerSlot: number;
  heroHealing: number;
  partyId: number | null;
  position: null;
  backpack0Id: number | null;
  backpack1Id: number | null;
  backpack2Id: number | null;
  dotaPlus: null;
}

export enum PlayerTypename {
  MatchPlayerType = "MatchPlayerType",
}

export interface PlayerStats {
  abilities: Ability[];
  itemPurchases: null;
  __typename: StatsTypename;
  level: null;
  lastHitsPerMinute: null;
  networthPerMinute: null;
  actionsPerMinute: null;
  tripsFountainPerMinute: null;
  farmDistributionReport: null;
  assistEvents: null;
  runes: null;
  allTalks: null;
  chatWheels: null;
  killEvents: null;
  deathEvents: null;
  impPerMinute2: null;
  campStack: null;
  heroDamageReceivedPerMinute: null;
  inventoryReport: null;
  spiritBearInventoryReport: null;
  goldPerMinute: null;
  experiencePerMinute: null;
  deniesPerMinute: null;
  matchPlayerBuffEvent: null;
  wards: null;
  healPerMinute: null;
  heroDamagePerMinute: null;
  towerDamagePerMinute: null;
}

export enum StatsTypename {
  MatchPlayerStatsType = "MatchPlayerStatsType",
}

export interface Ability {
  abilityId: number;
  time: number;
  level: number;
  __typename: AbilityTypename;
}

export enum AbilityTypename {
  PlayerAbilityType = "PlayerAbilityType",
}

export interface SteamAccountMatchDetail {
  id: number;
  name: string;
  isAnonymous: boolean;
  smurfFlag: number | null;
  proSteamAccount: null;
  __typename: SteamAccountTypename;
  seasonRank: number | null;
  seasonLeaderboardRank: null;
}

export enum SteamAccountTypename {
  SteamAccountType = "SteamAccountType",
}

export interface WelcomeStats {
  radiantKills: null;
  direKills: null;
  __typename: string;
  winRates: null;
  radiantNetworthLeads: null;
  towerStatus: null;
  towerDeaths: null;
  chatEvents: null;
  pickBans: null;
  radiantExperienceLeads: null;
}
