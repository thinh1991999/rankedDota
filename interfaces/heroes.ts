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
  stats: Stats;
}

export interface AbilityElement {
  slot: number;
  gameVersionId: number;
  abilityId: number;
  ability: AbilityDetail;
  __typename: string;
}

export interface AbilityDetail {
  id: number;
  name: string;
  uri: null | string;
  language: AbilityLanguage;
  stat: Stat;
  attributes: Attribute[] | null;
  drawMatchPage: boolean;
  isTalent: boolean;
}

export interface Attribute {
  name: string;
  value: string;
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
  maxLevel: null;
  levelsBetweenUpgrades: number;
  requiredLevel: number;
  hotKeyOverride: null;
  displayAdditionalHeroes: boolean;
  isUltimate: boolean;
  duration: string;
  charges: string;
  chargeRestoreTime: string;
  isGrantedByShard: boolean;
  dispellable: string;
  manaCost: number[];
  cooldown: number[];
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
}

export interface Talent {
  abilityId: number;
  slot: number;
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

export interface SteamAccount {
  avatar: string;
  id: number;
  name: string;
  proSteamAccount: null;
  isAnonymous: boolean;
  smurfFlag: number;
  __typename: string;
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

export interface Position {
  position: string;
  matchCount: number;
  winCount: number;
  __typename: string;
}

// Matchups
export interface HeroVsHeroMatchup {
  advantage: Advantage[];
  disadvantage: Advantage[];
  __typename: string;
}

export interface Advantage {
  vs: MatchupDetail[];
  with: MatchupDetail[];
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

export interface LeaderBoard {
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

export interface Win {
  timestamp?: number;
  heroId: number;
  matchCount: number;
  winCount: number;
  __typename: string;
  gameVersionId?: number;
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
