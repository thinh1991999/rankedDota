import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { AbilityDetail, Hero } from "../../interfaces/heroes";
import { GlobalData } from "../../interfaces/state";
import stratsApiService from "../../services/stratsApi.service";
import { Item } from "../../interfaces/item";
import { GameVersion } from "../../interfaces/gameVersion";
import { Region } from "../../interfaces/region";
import { talentsData } from "../../share/data";

const initialState: GlobalData = {
  abilitiesData: [],
  regions: [],
  items: [],
  heroes: [],
  gameVersions: [],
  talents: talentsData,
  headerImg: "",
  subHeaderMain: null,
  isTransparentHeader: false,
  showScrollTop: false,
  showNavBarMobile: false,
  loading: true,
};

export const fetchDefaultData = createAsyncThunk(
  "users/fetchByIdStatus",
  async () => {
    interface resultType {
      abilities: AbilityDetail[];
      items: Item[];
      heroes: Hero[];
      gameVersions: GameVersion[];
      regions: Region[];
    }
    const result = await stratsApiService
      .getAllDefaultData()
      .then((res) => {
        return res.data.data.constants;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
    return (await result) as resultType;
  }
);

export const globalDataSlice = createSlice({
  name: "globalData",
  initialState,
  reducers: {
    setHeaderImg: (state, action: PayloadAction<string>) => {
      state.headerImg = action.payload;
    },
    setSubHeaderMain: (state, action: PayloadAction<ReactNode>) => {
      state.subHeaderMain = action.payload;
    },
    setIsTransparentHeader: (state, action: PayloadAction<number>) => {
      const vl = action.payload;
      if (vl >= 200) {
        state.showScrollTop = true;
      } else {
        state.showScrollTop = false;
      }
      if (action.payload > 80 && state.isTransparentHeader) return;
      if (action.payload > 80) {
        state.isTransparentHeader = true;
      } else {
        state.isTransparentHeader = false;
      }
    },
    handleShowNavBarMobile: (state) => {
      state.showNavBarMobile = !state.showNavBarMobile;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDefaultData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchDefaultData.fulfilled, (state, action) => {
      if (action.payload) {
        state.abilitiesData = action.payload.abilities;
        state.items = action.payload.items;
        state.heroes = action.payload.heroes;
        state.gameVersions = action.payload.gameVersions;
        state.regions = action.payload.regions;
        state.loading = false;
      }
    });
  },
});

export const {
  setHeaderImg,
  setSubHeaderMain,
  setIsTransparentHeader,
  handleShowNavBarMobile,
} = globalDataSlice.actions;

// export const selectAbilitiesData = (state: RootState) =>
//   state.abilitiesData.value as AbilityDetail[];

export default globalDataSlice.reducer;
