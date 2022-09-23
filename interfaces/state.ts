import { AbilityDetail, Hero } from "./heroes";
import { Item } from "./item";
import { GameVersion } from "./gameVersion";

export interface Root {
  globalData: GlobalData;
}

export interface GlobalData {
  abilitiesData: AbilityDetail[];
  items: Item[];
  heroes: Hero[];
  gameVersions: GameVersion[];
  loading: boolean;
}
