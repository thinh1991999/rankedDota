export interface Item {
  id: number;
  name: string;
  displayName: string;
  shortName: string;
  isSupportFullItem: null | boolean;
  language: Language;
  stat: Stat | null;
  attributes: Attribute[] | null;
  components: null | any;
  image: string | null;
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
  shopTags: string | null;
  aliases: string | null;
  quality: string | null;
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
  isAlertable: null | boolean;
  isTempestDoubleClonable: boolean;
  stockMax: number;
  initialCharges: number;
  initialStock: number;
  stockTime: number;
  initialStockTime: number;
  isRecipe: boolean;
  needsComponents: boolean;
  upgradeItem: null | number;
  upgradeRecipe: null | number;
  itemResult: null | number;
  neutralItemDropTime: null | number;
  neutralItemTier: string | null;
}

export interface ItemNeutral {
  itemId: number;
  equippedMatchCount: number;
  equippedMatchWinCount: number;
  __typename: string;
}

export interface ItemBootPurchase {
  matchCount: number;
  events: Event[];
  __typename: string;
}

export interface Event {
  itemId: number;
  matchCount: number;
  winCount: number;
  timeAverage?: number;
  instance?: number;
  wasGiven?: boolean;
  __typename: string;
}

export interface PurchasePattern {
  startingItems: EarlyGame;
  earlyGame: EarlyGame;
  midGame: EarlyGame;
  lateGame: EarlyGame;
  __typename: string;
}

export interface EarlyGame {
  matchCount: number;
  events: Event[];
  __typename: string;
}

export interface Event {
  itemId: number;
  winCount: number;
  matchCount: number;
}
