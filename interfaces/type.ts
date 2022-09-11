export interface Hero {
  id: number;
  name: string;
  localized_name: string;
  primary_attr: string;
  attack_type: string;
  roles: string[];
  img: string;
  icon: string;
  base_health: number;
  base_health_regen: number;
  base_mana: number;
  base_mana_regen: number;
  base_armor: number;
  base_mr: number;
  base_attack_min: number;
  base_attack_max: number;
  base_str: number;
  base_agi: number;
  base_int: number;
  str_gain: number;
  agi_gain: number;
  int_gain: number;
  attack_range: number;
  projectile_speed: number;
  attack_rate: number;
  move_speed: number;
  turn_rate: null;
  cm_enabled: boolean;
  legs: number;
}

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
  stats: HeroStats;
}

export interface HeroStats {
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
