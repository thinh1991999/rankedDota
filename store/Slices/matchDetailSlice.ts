import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MatchDetailData } from "../../interfaces/state";
import _ from "lodash";
import { MatchDetail } from "../../interfaces/matches";

const initialState: MatchDetailData = {
  matchDetail: null,
};

export const matchDetailSlice = createSlice({
  name: "matchDetail",
  initialState,
  reducers: {
    setMatchDetail: (state, action: PayloadAction<MatchDetail>) => {
      state.matchDetail = action.payload;
    },
  },
});

export const { setMatchDetail } = matchDetailSlice.actions;

export default matchDetailSlice.reducer;
