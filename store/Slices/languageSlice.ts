import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { viLanguage } from "../../languages";
import { RootState } from "../store";

const initialState: any = {
  language: viLanguage,
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
    },
  },
});

export const { changeLanguage } = languageSlice.actions;

export const selectLanguage = (state: RootState) => state.language.value;

export default languageSlice.reducer;
