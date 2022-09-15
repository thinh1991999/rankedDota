export interface Item {
  id: number;
  name: string;
  displayName: string;
  shortName: string;
  isSupportFullItem: null;
  language: Language;
  stat: Stat;
  attributes: Attribute[];
  components: null;
  image: string;
}

export interface Attribute {
  name: string;
  value: string;
}

export interface Language {
  displayName: string;
}

export interface Stat {
  behavior: number;
  unitTargetType: number;
  unitTargetTeam: number;
  unitTargetFlags: number;
  fightRecapLevel: number;
  sharedCooldown: string;
  cost: number;
  shopTags: string;
  aliases: string;
  quality: string;
  isSellable: boolean;
  isDroppable: boolean;
  isPurchasable: boolean;
  isSideShop: boolean;
  isStackable: boolean;
  isPermanent: boolean;
  isHideCharges: boolean;
  isRequiresCharges: boolean;
  isDisplayCharges: boolean;
  isSupport: boolean;
  isAlertable: null;
  isTempestDoubleClonable: boolean;
  stockMax: number;
  initialCharges: number;
  initialStock: number;
  stockTime: number;
  initialStockTime: number;
  isRecipe: boolean;
  needsComponents: boolean;
  upgradeItem: null;
  upgradeRecipe: null;
  itemResult: null;
  neutralItemDropTime: null;
  neutralItemTier: null;
}
