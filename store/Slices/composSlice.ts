import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { viLanguage } from "../../languages";
import { RootState } from "../store";
import { Hero, HeroesStatus } from "../../interfaces/heroes";
import { ComposData } from "../../interfaces/state";
import remove from "lodash/remove";

const initialState: ComposData = {
  //   language: viLanguage,
  heroesStatus: null,
  radiants: [],
  dires: [],
};

export const composSlice = createSlice({
  name: "compos",
  initialState,
  reducers: {
    setHeroesStatus: (state, action: PayloadAction<HeroesStatus>) => {
      state.heroesStatus = action.payload;
    },
    addRadiant: (state, action: PayloadAction<Hero>) => {
      state.radiants.push(action.payload);
    },
    removeRadiant: (state, action: PayloadAction<number>) => {
      remove(state.radiants, (hero) => hero.id === action.payload);
    },
    addDire: (state, action: PayloadAction<Hero>) => {
      state.dires.push(action.payload);
    },
    removeDire: (state, action: PayloadAction<number>) => {
      remove(state.dires, (hero) => hero.id === action.payload);
    },
    clear: (state) => {
      state.dires = [];
      state.radiants = [];
    },
  },
});

export const {
  setHeroesStatus,
  addRadiant,
  removeRadiant,
  removeDire,
  addDire,
  clear,
} = composSlice.actions;

export default composSlice.reducer;
