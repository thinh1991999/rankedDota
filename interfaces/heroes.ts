export interface HeroPageAll {
  agi: HeroSortType[];
  str: HeroSortType[];
  int: HeroSortType[];
}

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
  ability: AbilityAbility;
  __typename: string;
}

export interface AbilityAbility {
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