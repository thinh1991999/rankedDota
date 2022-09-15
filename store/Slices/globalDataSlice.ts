import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";
import { AbilityDetail } from "../../interfaces/heroes";
import { GlobalData } from "../../interfaces/state";
import stratsApiService from "../../services/stratsApi.service";
import { RootState } from "../store";
import { Item } from "../../interfaces/item";

const initialState: GlobalData = {
  abilitiesData: [],
  items: [],
  loading: true,
};

export const fetchDefaultData = createAsyncThunk(
  "users/fetchByIdStatus",
  async () => {
    interface resultType {
      abilities: AbilityDetail[];
      items: Item[];
    }
    const result = await stratsApiService.getAllDefaultData().then((res) => {
      return res.data.data.constants;
    });
    return (await result) as resultType;
  }
);

export const globalDataSlice = createSlice({
  name: "globalData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDefaultData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchDefaultData.fulfilled, (state, action) => {
      state.abilitiesData = action.payload.abilities;
      state.items = action.payload.items;
      state.loading = false;
    });
    builder.addCase(REHYDRATE, (state) => {});
  },
});

// export const {} = globalDataSlice.actions;

// export const selectAbilitiesData = (state: RootState) =>
//   state.abilitiesData.value as AbilityDetail[];

export default globalDataSlice.reducer;
