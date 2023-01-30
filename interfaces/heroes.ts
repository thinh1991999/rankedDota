export interface HeroSortType {
  id: number;
  name: string;
  displayName: string;
  shortName: string;
  aliases: string[];
  gameVersionId: number;
  // stats: HeroStats;
}

// Hero
export interface Hero {
  id: number;
  name: string;
  displayName: string;
  shortName: string;
  aliases: string[];
  gameVersionId: number;
  abilities: AbilityElement[];
  roles: Role[];
  language: WelcomeLanguage;
  talents: Talent[];
  stats?: Stats;
}

export interface AbilityElement {
  slot: number;
  gameVersionId: number;
  abilityId: number;
  ability: AbilityDetail;
  __typename?: string;
}

export interface AbilityDetail {
  id: number;
  name: string;
  uri: null | string;
  language: AbilityLanguage;
  stat: Stat;
  attributes: Attribute[] | null;
  drawMatchPage?: boolean;
  isTalent: boolean;
  __typename?: string;
}

export interface Attribute {
  name: string;
  value: string;
  requiresScepter?: boolean;
  linkedSpecialBonusAbilityId: number | null;
}

export interface AbilityLanguage {
  displayName: string;
  lore: null | string;
  attributes: string[];
  aghanimDescription: null | string;
  shardDescription: null | string;
  description: string[];
  notes: string[];
}

export interface Stat {
  abilityId: number;
  type: number;
  behavior: number;
  unitTargetType: number;
  unitTargetTeam: number;
  unitTargetFlags: number;
  unitDamageType: number;
  spellImmunity: number;
  modifierSupportValue: number;
  modifierSupportBonus: number;
  isOnCastbar: boolean;
  isOnLearnbar: boolean;
  fightRecapLevel: number;
  isGrantedByScepter: boolean;
  hasScepterUpgrade: boolean;
  maxLevel: null | number;
  levelsBetweenUpgrades: number;
  requiredLevel: number;
  hotKeyOverride: null | string;
  displayAdditionalHeroes: boolean;
  isUltimate: boolean;
  duration: string;
  charges: string;
  chargeRestoreTime: string;
  isGrantedByShard: boolean;
  dispellable: string;
  manaCost?: number[];
  cooldown?: number[];
}

export interface WelcomeLanguage {
  displayName: string;
  lore: string;
  hype: string;
}

export interface Role {
  roleId: string;
  level: number;
}

export interface Stats {
  enabled: boolean;
  heroUnlockOrder: number;
  team: boolean;
  cMEnabled: boolean;
  newPlayerEnabled: boolean;
  attackType: string;
  startingArmor: number;
  startingMagicArmor: number;
  startingDamageMin: number;
  startingDamageMax: number;
  attackRate: number;
  attackAnimationPoint: number;
  attackAcquisitionRange: number;
  attackRange: number;
  primaryAttribute: string;
  strengthBase: number;
  strengthGain: number;
  intelligenceBase: number;
  intelligenceGain: number;
  agilityBase: number;
  agilityGain: number;
  hpRegen: number;
  mpRegen: number;
  moveSpeed: number;
  moveTurnRate: number;
  hpBarOffset: number;
  visionDaytimeRange: number;
  visionNighttimeRange: number;
  complexity: number;
  __typename?: string;
}

export interface Talent {
  abilityId: number;
  slot: number;
}
// Hero main

// export interface HeroMain {
//   heroStats: HeroStats;
//   constants: Constants;
//   leaderboard: Leaderboard;
// }

// export interface Constants {
//   hero: ConstantsHero;
//   __typename: string;
//   items: Item[];
// }

// export interface ConstantsHero {
//   id: number;
//   abilities: HeroAbility[];
//   __typename: string;
//   language: Language;
//   aliases: any[] | null;
// }

// export interface HeroAbility {
//   abilityId: number;
//   ability: SteamAccountClass;
//   __typename: string;
// }

// export interface SteamAccountClass {
//   id: number;
//   name: string;
//   stat?: AbilityStat;
//   __typename: string;
//   proSteamAccount?: null;
// }

// export interface AbilityStat {
//   maxLevel: number | null;
//   behavior: number;
//   unitTargetTeam: number;
//   unitTargetType: number;
//   hasScepterUpgrade: boolean;
//   isGrantedByScepter: boolean;
//   isGrantedByShard: boolean;
//   isUltimate: boolean;
//   __typename: string;
// }

// export interface Language {
//   hype: string;
//   lore: string;
//   __typename: string;
// }

// export interface Item {
//   id: number;
//   stat: ItemStat | null;
//   __typename: ItemTypename;
// }

// export enum ItemTypename {
//   ItemType = "ItemType",
// }

// export interface ItemStat {
//   neutralItemTier: NeutralItemTier | null;
//   __typename: StatTypename;
// }

// export enum StatTypename {
//   ItemStatType = "ItemStatType",
// }

// export enum NeutralItemTier {
//   Tier1 = "TIER_1",
//   Tier2 = "TIER_2",
//   Tier3 = "TIER_3",
//   Tier4 = "TIER_4",
//   Tier5 = "TIER_5",
// }

// export interface HeroStats {
//   guide: HeroStatsGuide[];
//   __typename: string;
//   purchasePattern: PurchasePattern;
//   purchasePatternStats: PurchasePatternStat[];
//   itemNeutral: ItemNeutral[];
//   itemBootPurchase: ItemBootPurchase[];
//   heroVsHeroMatchup: HeroVsHeroMatchup;
//   winGameVersion: Win[];
//   winDay: Win[];
//   winHour: Win[];
//   abilityMaxLevel: AbilityMaxLevel[];
//   abilityMinLevel: AbilityMaxLevel[];
//   talent: AbilityMaxLevel[];
//   position: PositionElement[];
//   laneOutcomeWith_POSITION_1: LaneOutcome[];
//   laneOutcomeWith_POSITION_2: LaneOutcome[];
//   laneOutcomeWith_POSITION_3: LaneOutcome[];
//   laneOutcomeWith_POSITION_4: LaneOutcome[];
//   laneOutcomeWith_POSITION_5: LaneOutcome[];
//   laneOutcomeAgainst_POSITION_1: LaneOutcome[];
//   laneOutcomeAgainst_POSITION_2: LaneOutcome[];
//   laneOutcomeAgainst_POSITION_3: LaneOutcome[];
//   laneOutcomeAgainst_POSITION_4: LaneOutcome[];
//   laneOutcomeAgainst_POSITION_5: LaneOutcome[];
//   rampages: Rampage[];
// }

// export interface AbilityMaxLevel {
//   abilityId: number;
//   level?: number;
//   winCount: number;
//   matchCount: number;
//   __typename: AbilityMaxLevelTypename;
// }

// export enum AbilityMaxLevelTypename {
//   HeroAbilityMaxType = "HeroAbilityMaxType",
//   HeroAbilityMinType = "HeroAbilityMinType",
//   HeroAbilityTalentType = "HeroAbilityTalentType",
// }

// export interface HeroStatsGuide {
//   heroId: number;
//   guides: GuideGuide[];
//   __typename: string;
// }

// export interface GuideGuide {
//   heroId: number;
//   match: GuideMatch;
//   matchPlayer: MatchPlayer;
//   __typename: string;
// }

// export interface GuideMatch {
//   id: number;
//   durationSeconds: number;
//   players: PurplePlayer[];
//   __typename: string;
// }

// export interface PurplePlayer {
//   matchId: number;
//   steamAccountId: number;
//   heroId: number;
//   position: PositionEnum;
//   __typename: PlayerTypename;
// }

// export enum PlayerTypename {
//   MatchPlayerType = "MatchPlayerType",
// }

// export enum PositionEnum {
//   Position1 = "POSITION_1",
//   Position2 = "POSITION_2",
//   Position3 = "POSITION_3",
//   Position4 = "POSITION_4",
//   Position5 = "POSITION_5",
// }

// export interface MatchPlayer {
//   matchId: number;
//   steamAccountId: number;
//   heroId: number;
//   position: PositionEnum;
//   steamAccount: SteamAccountClass;
//   assists: number;
//   deaths: number;
//   imp: number;
//   isRadiant: boolean;
//   item0Id: number;
//   item1Id: number;
//   item2Id: number;
//   item3Id: number;
//   item4Id: number;
//   item5Id: number;
//   neutral0Id: number;
//   kills: number;
//   additionalUnit: null;
//   stats: StatsMatchPlayer;
//   level: number;
//   abilities: PurpleAbility[];
//   __typename: PlayerTypename;
// }

// export interface PurpleAbility {
//   abilityId: number;
//   time: number;
//   __typename: AbilityTypename;
// }

// export enum AbilityTypename {
//   PlayerAbilityType = "PlayerAbilityType",
// }

// export interface StatsMatchPlayer {
//   itemPurchases: ItemPurchase[];
//   level: number[];
//   __typename: string;
// }

// export interface ItemPurchase {
//   itemId: number;
//   time: number;
//   __typename: ItemPurchaseTypename;
// }

// export enum ItemPurchaseTypename {
//   MatchPlayerItemPurchaseEventType = "MatchPlayerItemPurchaseEventType",
// }

// export interface HeroVsHeroMatchup {
//   advantage: Advantage[];
//   disadvantage: Advantage[];
//   __typename: string;
// }

// export interface Advantage {
//   with: V[];
//   vs: V[];
//   __typename: string;
// }

// export interface V {
//   heroId2: number;
//   synergy: number;
//   matchCount: number;
//   winCount: number;
//   __typename: VTypename;
// }

// export enum VTypename {
//   HeroStatsHeroDryadType = "HeroStatsHeroDryadType",
// }

// export interface ItemBootPurchase {
//   itemId: number;
//   matchCount: number;
//   winCount: number;
//   timeAverage?: number;
//   __typename: ItemBootPurchaseTypename;
//   instance?: number;
//   wasGiven?: boolean;
// }

// export enum ItemBootPurchaseTypename {
//   HeroItemBootPurchaseType = "HeroItemBootPurchaseType",
//   HeroItemPurchaseType = "HeroItemPurchaseType",
//   HeroItemStartingPurchaseType = "HeroItemStartingPurchaseType",
// }

// export interface ItemNeutral {
//   itemId: number;
//   equippedMatchCount: number;
//   equippedMatchWinCount: number;
//   __typename: ItemNeutralTypename;
// }

// export enum ItemNeutralTypename {
//   HeroNeutralItemType = "HeroNeutralItemType",
// }

// export interface LaneOutcome {
//   heroId2: number;
//   matchCount: number;
//   winCount: number;
//   lossCount: number;
//   drawCount: number;
//   stompWinCount: number;
//   stompLossCount: number;
//   __typename: LaneOutcomeAgainstPOSITION1___Typename;
// }

// export enum LaneOutcomeAgainstPOSITION1___Typename {
//   HeroLaneOutcomeType = "HeroLaneOutcomeType",
// }

// export interface PositionElement {
//   position: PositionEnum;
//   matchCount: number;
//   winCount: number;
//   __typename: PositionTypename;
// }

// export enum PositionTypename {
//   HeroPositionTimeDetailType = "HeroPositionTimeDetailType",
// }

// export interface PurchasePattern {
//   startingItems: ItemBootPurchase[];
//   earlyGame: ItemBootPurchase[];
//   midGame: ItemBootPurchase[];
//   lateGame: ItemBootPurchase[];
//   __typename: string;
// }

// export interface PurchasePatternStat {
//   time: number;
//   matchCount: number;
//   __typename: PositionTypename;
// }

// export interface RampageMatch {
//   id: number;
//   rank: number;
//   endDateTime: number;
//   players: FluffyPlayer[];
//   __typename: string;
// }

// export interface FluffyPlayer {
//   steamAccountId: number;
//   isRadiant: boolean;
//   heroId: number;
//   __typename: PlayerTypename;
// }

// export interface SteamAccount {
//   avatar: string;
//   id: number;
//   name: string;
//   proSteamAccount: ProSteamAccount | null;
//   isAnonymous: boolean;
//   smurfFlag: number;
//   __typename: SteamAccountTypename;
// }

// export enum SteamAccountTypename {
//   SteamAccountType = "SteamAccountType",
// }

// export interface ProSteamAccount {
//   name: string;
//   __typename: string;
// }

// export interface Win {
//   timestamp?: number;
//   heroId: number;
//   winCount: number;
//   matchCount: number;
//   __typename: WinDayTypename;
//   gameVersionId?: number;
// }

// export enum WinDayTypename {
//   HeroWinDayType = "HeroWinDayType",
//   HeroWinGameVersionType = "HeroWinGameVersionType",
//   HeroWinHourType = "HeroWinHourType",
// }

// export interface Leaderboard {
//   hero: HeroElement[];
//   __typename: string;
// }

// export interface HeroElement {
//   position: PositionEnum;
//   impAverage: number;
//   steamAccount: SteamAccount;
//   __typename: string;
// }

// export interface Track {
//   name: string;
//   duration: number;
// }

export interface HeroMain {
  heroStats: HeroStats;
  constants: Constants;
  leaderboard: Leaderboard;
}

export interface Constants {
  hero: ConstantsHero;
  __typename: string;
  items: Item[];
}

export interface ConstantsHero {
  id: number;
  abilities: HeroAbility[];
  __typename: string;
  language: Language;
  aliases: string[];
}

export interface HeroAbility {
  abilityId: number;
  ability: SteamAccountClass;
  __typename: string;
}

export interface SteamAccountClass {
  id: number;
  name: string;
  stat?: AbilityStat;
  __typename: string;
  proSteamAccount?: null;
}

export interface AbilityStat {
  maxLevel: number | null;
  behavior: number;
  unitTargetTeam: number;
  unitTargetType: number;
  hasScepterUpgrade: boolean;
  isGrantedByScepter: boolean;
  isGrantedByShard: boolean;
  isUltimate: boolean;
  __typename: string;
}

export interface Language {
  hype: string;
  lore: string;
  __typename: string;
}

export interface Item {
  id: number;
  stat: ItemStat | null;
  __typename: ItemTypename;
}

export enum ItemTypename {
  ItemType = "ItemType",
}

export interface ItemStat {
  neutralItemTier: NeutralItemTier | null;
  __typename: StatTypename;
}

export enum StatTypename {
  ItemStatType = "ItemStatType",
}

export enum NeutralItemTier {
  Tier1 = "TIER_1",
  Tier2 = "TIER_2",
  Tier3 = "TIER_3",
  Tier4 = "TIER_4",
  Tier5 = "TIER_5",
}

export interface HeroStats {
  guide: HeroStatsGuide[];
  __typename: string;
  itemStartingPurchase: ItemFullPurchaseElement[];
  itemFullPurchase: ItemFullPurchaseElement[];
  purchasePatternStats: PurchasePatternStat[];
  itemNeutral: ItemNeutral[];
  itemBootPurchase: ItemFullPurchaseElement[];
  heroVsHeroMatchup: HeroVsHeroMatchup;
  winGameVersion: Win[];
  winDay: Win[];
  winHour: Win[];
  abilityMaxLevel: AbilityMaxLevel[];
  abilityMinLevel: AbilityMaxLevel[];
  talent: AbilityMaxLevel[];
  position: PositionElement[];
  laneOutcomeWith_POSITION_1: LaneOutcome[];
  laneOutcomeWith_POSITION_2: LaneOutcome[];
  laneOutcomeWith_POSITION_3: LaneOutcome[];
  laneOutcomeWith_POSITION_4: LaneOutcome[];
  laneOutcomeWith_POSITION_5: LaneOutcome[];
  laneOutcomeAgainst_POSITION_1: LaneOutcome[];
  laneOutcomeAgainst_POSITION_2: LaneOutcome[];
  laneOutcomeAgainst_POSITION_3: LaneOutcome[];
  laneOutcomeAgainst_POSITION_4: LaneOutcome[];
  laneOutcomeAgainst_POSITION_5: LaneOutcome[];
  rampages: Rampage[];
}

export interface AbilityMaxLevel {
  abilityId: number;
  level?: number;
  winCount: number;
  matchCount: number;
  __typename: AbilityMaxLevelTypename;
}

export enum AbilityMaxLevelTypename {
  HeroAbilityMaxType = "HeroAbilityMaxType",
  HeroAbilityMinType = "HeroAbilityMinType",
  HeroAbilityTalentType = "HeroAbilityTalentType",
}

export interface HeroStatsGuide {
  heroId: number;
  guides: GuideGuide[];
  __typename: string;
}

export interface GuideGuide {
  heroId: number;
  match: GuideMatch;
  matchPlayer: MatchPlayer;
  __typename: string;
}

export interface GuideMatch {
  id: number;
  durationSeconds: number;
  players: PurplePlayer[];
  __typename: string;
}

export interface PurplePlayer {
  matchId: number;
  steamAccountId: number;
  heroId: number;
  position: PositionEnum;
  __typename: PlayerTypename;
}

export enum PlayerTypename {
  MatchPlayerType = "MatchPlayerType",
}

export enum PositionEnum {
  Position1 = "POSITION_1",
  Position2 = "POSITION_2",
  Position3 = "POSITION_3",
  Position4 = "POSITION_4",
  Position5 = "POSITION_5",
}

export interface MatchPlayer {
  matchId: number;
  steamAccountId: number;
  heroId: number;
  position: PositionEnum;
  steamAccount: SteamAccountClass;
  assists: number;
  deaths: number;
  imp: number;
  isRadiant: boolean;
  item0Id: number;
  item1Id: number;
  item2Id: number;
  item3Id: number | null;
  item4Id: number;
  item5Id: number | null;
  neutral0Id: number;
  kills: number;
  additionalUnit: null;
  stats: Stats;
  level: number;
  abilities: PurpleAbility[];
  __typename: PlayerTypename;
}

export interface PurpleAbility {
  abilityId: number;
  time: number;
  __typename: AbilityTypename;
}

export enum AbilityTypename {
  PlayerAbilityType = "PlayerAbilityType",
}

export interface Stats {
  itemPurchases: ItemPurchase[];
  level: number[];
  // __typename:    string;
}

export interface ItemPurchase {
  itemId: number;
  time: number;
  __typename: ItemPurchaseTypename;
}

export enum ItemPurchaseTypename {
  MatchPlayerItemPurchaseEventType = "MatchPlayerItemPurchaseEventType",
}

export interface HeroVsHeroMatchup {
  advantage: Advantage[];
  disadvantage: Advantage[];
  __typename: string;
}

export interface Advantage {
  with: V[];
  vs: V[];
  __typename: string;
}

export interface V {
  heroId2: number;
  synergy: number;
  matchCount: number;
  winCount: number;
  __typename: VTypename;
}

export enum VTypename {
  HeroStatsHeroDryadType = "HeroStatsHeroDryadType",
}

// export interface ItemBootPurchase {
//   itemId: number;
//   matchCount: number;
//   winCount: number;
//   timeAverage: number;
//   __typename: string;
// }

export interface ItemFullPurchaseElement {
  itemId: number;
  time?: number;
  winCount: number;
  matchCount: number;
  instance?: number;
  timeAverage?: number;
  __typename: string;
  wasGiven?: boolean;
}

export interface ItemNeutral {
  itemId: number;
  equippedMatchCount: number;
  equippedMatchWinCount: number;
  __typename: ItemNeutralTypename;
}

export enum ItemNeutralTypename {
  HeroNeutralItemType = "HeroNeutralItemType",
}

export interface LaneOutcome {
  heroId2: number;
  matchCount: number;
  winCount: number;
  lossCount: number;
  drawCount: number;
  stompWinCount: number;
  stompLossCount: number;
  __typename: LaneOutcomeAgainstPOSITION1___Typename;
}

export enum LaneOutcomeAgainstPOSITION1___Typename {
  HeroLaneOutcomeType = "HeroLaneOutcomeType",
}

export interface PositionElement {
  position: PositionEnum;
  matchCount: number;
  winCount: number;
  __typename: PositionTypename;
}

export enum PositionTypename {
  HeroPositionTimeDetailType = "HeroPositionTimeDetailType",
}

export interface PurchasePatternStat {
  time: number;
  matchCount: number;
  __typename: PositionTypename;
}

export interface RampageMatch {
  id: number;
  rank: number;
  endDateTime: number;
  players: FluffyPlayer[];
  __typename: string;
}

export interface FluffyPlayer {
  steamAccountId: number;
  isRadiant: boolean;
  heroId: number;
  __typename: PlayerTypename;
}

export interface SteamAccount {
  avatar: string;
  id: number;
  name: string;
  proSteamAccount: null;
  isAnonymous: boolean;
  smurfFlag: number;
  __typename: string;
}

export interface Win {
  timestamp?: number;
  heroId: number;
  winCount: number;
  matchCount: number;
  __typename: WinDayTypename;
  gameVersionId?: number;
}

export enum WinDayTypename {
  HeroWinDayType = "HeroWinDayType",
  HeroWinGameVersionType = "HeroWinGameVersionType",
  HeroWinHourType = "HeroWinHourType",
}

export interface Leaderboard {
  hero: HeroElement[];
  __typename: string;
}

export interface HeroElement {
  position: PositionEnum;
  impAverage: number;
  steamAccount: SteamAccount;
  __typename: string;
}

export interface Track {
  name: string;
  duration: number;
}

// Hero Header

export interface HeroHeader {
  constants: ConstantsHeroHeader;
  heroStats: HeroStats;
}

export interface ConstantsHeroHeader {
  hero: HeroClass;
  __typename: string;
}

export interface HeroClass {
  id: number;
  stats: StatsHeroClass;
  roles: Role[];
  __typename?: string;
}

export interface Role {
  roleId: string;
  __typename?: string;
}

export interface StatsHeroClass {
  attackType: string;
  complexity: number;
  primaryAttribute: string;
  strengthBase: number;
  strengthGain: number;
  agilityBase: number;
  agilityGain: number;
  intelligenceBase: number;
  intelligenceGain: number;
  __typename: string;
}

export interface HeroStats {
  POSITION_1: Position[];
  POSITION_2: Position[];
  POSITION_3: Position[];
  POSITION_4: Position[];
  POSITION_5: Position[];
  __typename: string;
}

export interface Position {
  heroId: number;
  matchCount: number;
  winCount: number;
  __typename: Typename;
}

export enum Typename {
  HeroWinDayType = "HeroWinDayType",
}

export interface Track {
  name: string;
  duration: number;
}

// Rampage
export interface Rampage {
  match: Match;
  steamAccount: SteamAccount;
  __typename: string;
}

export interface Match {
  id: number;
  rank: number;
  endDateTime: number;
  players: Player[];
  __typename: string;
}

export interface Player {
  steamAccountId: number;
  isRadiant: boolean;
  heroId: number;
  __typename: Typename;
}

export enum Typename {
  MatchPlayerType = "MatchPlayerType",
}

export interface HeroesStatus {
  POSITION_1: HeroStatus[];
  POSITION_2: HeroStatus[];
  POSITION_3: HeroStatus[];
  POSITION_4: HeroStatus[];
  POSITION_5: HeroStatus[];
}

export interface HeroStatus {
  heroId: number;
  matchCount: number;
  winCount: number;
  __typename: string;
}

export interface RoleStatus {
  matchCount: number;
  winCount: number;
  lossCount: number;
  drawCount: number;
  stompWinCount: number;
  stompLossCount: number;
  partners: Against[];
  against: Against[];
  __typename: string;
}

export interface Against {
  heroId: number;
  matchCount: number;
  winCount: number;
  __typename: Typename;
}

export enum Typename {
  HeroLaneOutcomeHeroObjectType = "HeroLaneOutcomeHeroObjectType",
}

// Matchups
export interface HeroVsHeroMatchup {
  advantage: Advantage[];
  disadvantage: Advantage[];
  __typename: string;
}

export interface MatchupDetail {
  heroId2: number;
  synergy: number;
  matchCount: number;
  winCount: number;
  __typename: string;
}

// Leaderboards

export interface LeaderBoardPage {
  position: string;
  impAverage: number;
  steamAccount: SteamAccount;
  __typename: string;
}

// TalentsTree
export interface TreeBranchInfo {
  slot: number;
  actived?: boolean;
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  gradientTransform: string;
  stop: {
    offset: number;
    color: string;
  }[];
  dPath: string;
}

// Hero/Meta/Trends
export interface HeroesMetaTrends {
  winDay: Win[];
  winGameVersion: Win[];
  winHour: Win[];
  __typename: string;
}

export interface HeroTrends {
  id: number;
  winRate: {
    data: {
      time: number;
      wr: number;
      matchCount: number;
    }[];
  };
  pickRate: {
    data: {
      time: number;
      pr: number;
      matchCount: number;
    }[];
  };
  winGameVersion?: {
    id: number;
    wr: number;
    pr: number;
    matches: number;
  }[];
  matches: number;
}

export type SortedType =
  | "START_WR"
  | "CURRENT_WR"
  | "DIFFER_WR"
  | "START_PR"
  | "CURRENT_PR"
  | "DIFFER_PR"
  | "RATING"
  | "MATCHES"
  | null;

export interface MetaPositions {
  heroesPos1: HeroesPos;
  heroesPos2: HeroesPos;
  heroesPos3: HeroesPos;
  heroesPos4: HeroesPos;
  heroesPos5: HeroesPos;
}

export interface HeroesPos {
  winDay: WinDay[];
  __typename: string;
}

export interface WinDay {
  heroId: number;
  matchCount: number;
  winCount: number;
  __typename: Typename;
}
