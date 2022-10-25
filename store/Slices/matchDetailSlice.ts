import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MatchDetailData } from "../../interfaces/state";
import _, { isInteger } from "lodash";
import { MatchDetail } from "../../interfaces/matches";
import moment from "moment";

const initialState: MatchDetailData = {
  loading: true,
  matchDetail: null,
  timeSeek: 0,
  timesLabel: [],
  currSeconds: 0,
};

export const matchDetailSlice = createSlice({
  name: "matchDetail",
  initialState,
  reducers: {
    setMatchDetail: (state, action: PayloadAction<MatchDetail>) => {
      state.loading = true;
      const { durationSeconds } = action.payload;
      const arr: number[] = [];
      const timeUtc = moment.duration(durationSeconds * 1000).asMinutes();
      _.range(timeUtc).forEach((item) => {
        arr.push(item);
      });
      if (!isInteger(timeUtc)) arr.push(timeUtc);
      state.matchDetail = action.payload;
      state.timesLabel = arr;
      state.timeSeek = arr.length - 1;
      state.currSeconds = arr[arr.length - 1];
      state.loading = false;
    },
    setTimeSeek: (state, action: PayloadAction<number>) => {
      state.timeSeek = action.payload;
    },
  },
});

export const { setMatchDetail, setTimeSeek } = matchDetailSlice.actions;

export default matchDetailSlice.reducer;
