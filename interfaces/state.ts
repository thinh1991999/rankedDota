import { AbilityDetail, Hero } from "./heroes";
import { Item } from "./item";

export interface Root {
  globalData: GlobalData;
}

export interface GlobalData {
  abilitiesData: AbilityDetail[];
  items: Item[];
  heroes: Hero[];
  loading: boolean;
}
