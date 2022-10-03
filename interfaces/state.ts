import { AbilityDetail, Hero, HeroesStatus } from "./heroes";
import { Item } from "./item";
import { GameVersion } from "./gameVersion";

export interface Root {
  globalData: GlobalData;
  compos: ComposData;
}

export interface GlobalData {
  abilitiesData: AbilityDetail[];
  items: Item[];
  heroes: Hero[];
  gameVersions: GameVersion[];
  loading: boolean;
}

export interface ComposData {
  heroesStatus: HeroesStatus | null;
  radiants: Hero[];
  dires: Hero[];
}
