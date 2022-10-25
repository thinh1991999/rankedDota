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
  didRadiantWin: boolean;
  statsDateTime: number | null;
  stats: WelcomeStats;
  players: PlayerMatchDetail[];
  __typename: string;
  topLaneOutcome?: string;
  bottomLaneOutcome?: string;
  midLaneOutcome?: string;
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

export interface WelcomeStats {
  radiantKills: number[];
  direKills: number[];
  __typename: string;
  winRates: number[];
  radiantNetworthLeads: number[];
  towerStatus: TowerStatus[];
  towerDeaths: TowerDeath[];
  chatEvents: ChatEvent[];
  pickBans: PickBan[];
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

export interface TowerStatus {
  towers: Tower[];
  __typename: string;
}

export interface Tower {
  npcId: number;
  hp: number;
  __typename: TowerTypename;
}

export enum TowerTypename {
  MatchStatsTowerReportObjectType = "MatchStatsTowerReportObjectType",
}

export interface PlayerMatchDetail {
  role: string;
  lane: string;
  heroId: number;
  level: number;
  neutral0Id: number;
  steamAccount: SteamAccountMatchDetail;
  stats: Stats;
  __typename: string;
  isRadiant: boolean;
  award: string;
  imp: number;
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
  partyId: null;
  position: string;
  backpack0Id: null;
  backpack1Id: null;
  backpack2Id: null;
  dotaPlus: null;
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
  __typename: string;
}

export interface Stats {
  abilities: Ability[];
  itemPurchases: ItemPurchase[];
  __typename: string;
  level: number[];
  lastHitsPerMinute: number[];
  networthPerMinute: number[];
  actionsPerMinute: number[];
  tripsFountainPerMinute: number[];
  farmDistributionReport: FarmDistributionReport[];
  assistEvents: AssistEvent[];
  runes: Rune[];
  allTalks: any[];
  chatWheels: ChatWheel[];
  killEvents: KillEvent[];
  deathEvents: DeathEvent[];
  impPerMinute2: number[];
  campStack: number[];
  heroDamageReceivedPerMinute: number[];
  inventoryReport: InventoryReport[];
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

export interface Ability {
  abilityId: number;
  time: number;
  level: number;
  __typename: AbilityTypename;
}

export enum AbilityTypename {
  PlayerAbilityType = "PlayerAbilityType",
}

export interface AssistEvent {
  target: number;
  __typename: string;
  time: number;
}

export interface ChatWheel {
  time: number;
  chatWheelId: number;
  __typename: string;
}

export interface DeathEvent {
  time: number;
  attacker: number;
  target: number;
  __typename: string;
  timeDead: number;
  goldLost: number;
}

export interface FarmDistributionReport {
  other: CreepType[];
  creepType: CreepType[];
  neutralLocation: NeutralLocation[];
  ancientLocation: any[];
  __typename: string;
}

export interface CreepType {
  id: number;
  count: number;
  __typename: CreepTypeTypename;
}

export enum CreepTypeTypename {
  MatchPlayerStatsFarmDistributionObjectType = "MatchPlayerStatsFarmDistributionObjectType",
}

export interface NeutralLocation {
  count: number;
  __typename: CreepTypeTypename;
}

export interface InventoryReport {
  backPack0: BackPack0 | null;
  backPack1: null;
  backPack2: null;
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
  charges?: number | null;
  __typename?: BackPack0Typename;
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
  __typename: string;
  gold: number;
  xp: number;
}

export interface MatchPlayerBuffEvent {
  abilityId: null;
  itemId: null;
  time: number;
  stackCount: null;
  __typename: string;
}

export interface Rune {
  time: number;
  rune: string;
  action: string;
  __typename: string;
}

export interface Ward {
  positionX: number;
  positionY: number;
  time: number;
  type: number;
  __typename: string;
}

export interface SteamAccountMatchDetail {
  id: number;
  name: string;
  isAnonymous: boolean;
  smurfFlag: number;
  proSteamAccount: null;
  __typename: string;
  seasonRank: number;
  seasonLeaderboardRank: null;
}

export interface TeamTotalInfo {
  lv: number;
  kills: number;
  deaths: number;
  assists: number;
  nw: number;
  imp: number;
  lh: number;
  dn: number;
  gpm: number;
  xpm: number;
  hd: number;
  td: number;
  hh: number;
}

export interface PlayerTimeline {
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
  inventory: InventoryReport;
  steamAccount: SteamAccountMatchDetail;
}

export interface Team {
  role: string;
  lane: string;
}
