export interface MatchGraph {
  month: number;
  matchCount: number;
  __typename: string;
}

export interface MatchLive {
  matchId: number;
  spectators: number;
  gameTime: number;
  averageRank: number;
  league: null;
  players: Player[];
  playbackData: WelcomePlaybackData;
  isParsing: boolean;
  __typename: string;
  radiantScore: number;
  direScore: number;
  radiantTeam: null;
  direTeam: null;
  serverSteamId: string;
  winRateValues: number[];
  durationValues: number[];
  liveWinRateValues: LiveWinRateValue[];
}

export interface MatchLiveCal {
  match: MatchLive;
  netWorth: any;
  wrr: any;
}

export interface LiveWinRateValue {
  winRate: number;
  __typename: string;
}

export interface WelcomePlaybackData {
  buildingEvents: BuildingEvent[];
  __typename: string;
  radiantScore: any[];
  direScore: any[];
}

export interface BuildingEvent {
  npcId: number;
  isAlive: boolean;
  __typename: string;
  isRadiant: boolean;
  type: string;
  indexId: number;
  time: number;
  positionX: number;
  positionY: number;
}

export enum BuildingEventTypename {
  MatchLiveBuildingDetailType = "MatchLiveBuildingDetailType",
}

export interface Player {
  heroId: number;
  numKills: number;
  numDeaths: number;
  numAssists: number;
  steamAccount: SteamAccount;
  __typename: PlayerTypename;
  isRadiant: boolean;
  playbackData: PlayerPlaybackData;
  level: number;
  networth: number;
}

export enum PlayerTypename {
  MatchLivePlayerType = "MatchLivePlayerType",
}

export interface PlayerPlaybackData {
  positionEvents: PositionEvent[];
  __typename: PlaybackDataTypename;
}

export enum PlaybackDataTypename {
  MatchPlayerLivePlaybackDataType = "MatchPlayerLivePlaybackDataType",
}

export interface PositionEvent {
  x: number;
  y: number;
  time: number;
  __typename: PositionEventTypename;
}

export enum PositionEventTypename {
  MatchLivePlayerPositionDetailType = "MatchLivePlayerPositionDetailType",
}

export interface SteamAccount {
  id: number;
  name: string;
  proSteamAccount?: ProSteamAccount;
  avatar: string;
  isAnonymous: boolean;
  smurfFlag: number;
  __typename: string;
}

export interface ProSteamAccount {
  name: string;
  team: Team;
  __typename: string;
}

export interface Team {
  id: number;
  tag: string;
  name: string;
  __typename: string;
}

// Match Detail
export interface MatchDetail {
  id: number;
  durationSeconds: number;
  endDateTime: number;
  gameMode: string;
  didRadiantWin: boolean;
  statsDateTime: number;
  radiantKills: number[];
  direKills: number[];
  players: PlayerMatchDetail[];
  __typename: string;
  winRates: number[];
  radiantNetworthLeads: number[];
  towerDeaths: TowerDeath[];
  chatEvents: ChatEvent[];
  rank: number;
  pickBans: PickBan[];
  radiantTeam: null;
  direTeam: null;
  series: null;
  analysisOutcome: string;
  lobbyType: string;
  regionId: number;
  league: null;
  bottomLaneOutcome: string;
  midLaneOutcome: string;
  topLaneOutcome: string;
  radiantExperienceLeads: number[];
}

export interface ChatEvent {
  isRadiant: boolean;
  time: number;
  value: number;
  fromHeroId: number | null;
  type: number;
  __typename: ChatEventTypename;
}

export enum ChatEventTypename {
  MatchStatsChatEventType = "MatchStatsChatEventType",
}

export interface PickBan {
  heroId: number;
  order: number | null;
  isPick: boolean;
  letter: number | null;
  __typename: PickBanTypename;
  bannedHeroId: number | null;
  playerIndex: number;
  isRadiant: boolean;
  wasBannedSuccessfully: boolean | null;
}

export enum PickBanTypename {
  MatchStatsPickBanType = "MatchStatsPickBanType",
}

export interface PlayerMatchDetail {
  isRadiant: boolean;
  position: string;
  heroId: number;
  level: number;
  neutral0Id: number;
  steamAccount: SteamAccountMatchDetail;
  stats: Stats;
  abilities: Ability[];
  __typename: PlayerTypename;
  award: string;
  imp: number;
  lane: Lane;
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
  heroAverage: HeroAverage[];
  playerSlot: number;
  heroHealing: number;
  partyId: number | null;
  backpack0Id: number | null;
  backpack1Id: number | null;
  backpack2Id: number | null;
  dotaPlus: null;
}

export enum PlayerTypename {
  MatchPlayerType = "MatchPlayerType",
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

export interface HeroAverage {
  time: number;
  kills: number;
  deaths: number;
  assists: number;
  networth: number;
  xp: number;
  cs: number;
  dn: number;
  heroDamage: number;
  towerDamage: number;
  __typename: HeroAverageTypename;
}

export enum HeroAverageTypename {
  HeroPositionTimeDetailType = "HeroPositionTimeDetailType",
}

export enum Lane {
  MidLane = "MID_LANE",
  OffLane = "OFF_LANE",
  SafeLane = "SAFE_LANE",
}

export interface Stats {
  inventoryReport: InventoryReport[];
  itemPurchases: ItemPurchase[];
  level: number[];
  __typename: StatsTypename;
  lastHitsPerMinute: number[];
  networthPerMinute: number[];
  actionsPerMinute: number[];
  runes: Rune[];
  allTalks: AllTalk[];
  chatWheels: ChatWheel[];
  killEvents: KillEvent[];
  deathEvents: DeathEvent[];
  impPerMinute: number[];
  campStack: number[];
  heroDamageReceivedPerMinute: number[];
  assistEvents: AssistEvent[];
  spiritBearInventoryReport: null;
  goldPerMinute: number[];
  experiencePerMinute: number[];
  deniesPerMinute: number[];
  matchPlayerBuffEvent: MatchPlayerBuffEvent[];
  wards: Ward[];
  healPerMinute: number[];
  heroDamagePerMinute: number[];
  towerDamagePerMinute: number[];
}

export enum StatsTypename {
  MatchPlayerStatsType = "MatchPlayerStatsType",
}

export interface AllTalk {
  time: number;
  message: string;
  pausedTick: number;
  __typename: string;
}

export interface AssistEvent {
  time: number;
  __typename: AssistEventTypename;
}

export enum AssistEventTypename {
  MatchPlayerStatsAssistEventType = "MatchPlayerStatsAssistEventType",
}

export interface ChatWheel {
  time: number;
  chatWheelId: number;
  __typename: ChatWheelTypename;
}

export enum ChatWheelTypename {
  MatchPlayerStatsChatWheelEventType = "MatchPlayerStatsChatWheelEventType",
}

export interface DeathEvent {
  time: number;
  attacker: number | null;
  target: number;
  __typename: DeathEventTypename;
  timeDead: number;
  goldLost: number;
}

export enum DeathEventTypename {
  MatchPlayerStatsDeathEventType = "MatchPlayerStatsDeathEventType",
}

export interface InventoryReport {
  backPack0: BackPack0 | null;
  backPack1: BackPack0 | null;
  backPack2: BackPack0 | null;
  item0: BackPack0 | null;
  item1: BackPack0 | null;
  item2: BackPack0 | null;
  item3: BackPack0 | null;
  item4: BackPack0 | null;
  item5: BackPack0 | null;
  neutral0: BackPack0 | null;
  __typename: InventoryReportTypename;
}

export enum InventoryReportTypename {
  MatchPlayerInventoryType = "MatchPlayerInventoryType",
}

export interface BackPack0 {
  itemId: number;
  charges: number | null;
  __typename: BackPack0Typename;
}

export enum BackPack0Typename {
  MatchPlayerInventoryObjectType = "MatchPlayerInventoryObjectType",
}

export interface ItemPurchase {
  time: number;
  itemId: number;
  __typename: ItemPurchaseTypename;
}

export enum ItemPurchaseTypename {
  MatchPlayerItemPurchaseEventType = "MatchPlayerItemPurchaseEventType",
}

export interface KillEvent {
  time: number;
  target: number;
  __typename: KillEventTypename;
  gold: number;
  xp: number | null;
}

export enum KillEventTypename {
  MatchPlayerStatsKillEventType = "MatchPlayerStatsKillEventType",
}

export interface MatchPlayerBuffEvent {
  abilityId: null;
  itemId: number | null;
  time: number;
  stackCount: number | null;
  __typename: string;
}

export interface Rune {
  time: number;
  rune: string;
  action: Action;
  __typename: RuneTypename;
}

export enum RuneTypename {
  MatchPlayerStatsRuneEventType = "MatchPlayerStatsRuneEventType",
}

export enum Action {
  Pickup = "PICKUP",
}

export interface Ward {
  positionX: number;
  positionY: number;
  time: number;
  type: number;
  __typename: WardTypename;
}

export enum WardTypename {
  MatchPlayerStatsWardEventType = "MatchPlayerStatsWardEventType",
}

export interface SteamAccountMatchDetail {
  id: number;
  name: string;
  proSteamAccount: null;
  isAnonymous: boolean;
  smurfFlag: number | null;
  __typename: SteamAccountTypename;
  seasonRank: number | null;
  seasonLeaderboardRank: null;
}

export enum SteamAccountTypename {
  SteamAccountType = "SteamAccountType",
}

export interface TowerDeath {
  attacker: number | null;
  npcId: number;
  time: number;
  isRadiant: boolean;
  __typename: TowerDeathTypename;
}

export enum TowerDeathTypename {
  MatchStatsTowerDeathType = "MatchStatsTowerDeathType",
}

export interface Track {
  name: string;
  duration: number;
}

export interface PlayerTimeline extends TeamSort {
  heroId: number;
  partyId: number | null;
  role: string;
  lane: string;
  lv: number;
  kills: number;
  deaths: number;
  assists: number;
  networth: number;
  imp: number;
  numLastHits: number;
  numDenies: number;
  goldPerMinute: number;
  experiencePerMinute: number;
  heroDamage: number;
  towerDamage: number;
  heroHealing: number;
  inventory: InventoryReport | null;
  steamAccount: SteamAccountMatchDetail;
}

export interface TeamSort {
  position?: string;
  role?: string;
  lane: string;
}
