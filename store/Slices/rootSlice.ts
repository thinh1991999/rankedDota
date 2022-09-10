import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: any = {
  translateHeader: false,
};

export const rootSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    handleOffBgHeader: (state) => {
      state.translateHeader = false;
    },
    handleOnBgHeader: (state) => {
      state.translateHeader = true;
    },
  },
});

export const { handleOffBgHeader, handleOnBgHeader } = rootSlice.actions;

export const translateHeader = (state: RootState) =>
  state.translateHeader.value;

export default rootSlice.reducer;
