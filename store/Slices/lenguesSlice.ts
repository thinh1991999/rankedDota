import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Data, Lengue, Live } from "../../interfaces/lengues";
import { Lengues } from "../../interfaces/state";

const initialState: Lengues = {
  lengues: null,
  data: null,
  live: null,
};

export const lenguesSlice = createSlice({
  name: "lengues",
  initialState,
  reducers: {
    setLengue: (state, action: PayloadAction<Lengue[] | null>) => {
      state.lengues = action.payload;
    },
    setData: (state, action: PayloadAction<Data[] | null>) => {
      state.data = action.payload;
    },
    setLive: (state, action: PayloadAction<Live | null>) => {
      state.live = action.payload;
    },
  },
});

export const { setLengue, setData, setLive } = lenguesSlice.actions;

export default lenguesSlice.reducer;
