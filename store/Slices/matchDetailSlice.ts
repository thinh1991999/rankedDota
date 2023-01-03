import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MatchDetailData } from "../../interfaces/state";
import range from "lodash/range";
import isInteger from "lodash/isInteger";

import { MatchDetail } from "../../interfaces/matches";
import moment from "moment";
import stratsApiService from "../../services/stratsApi.service";

const initialState: MatchDetailData = {
  loading: true,
  matchDetail: null,
  timeSeek: 0,
  timesLabel: [],
  currSeconds: 0,
  errMess: null,
};

export const fetchMatchDetail = createAsyncThunk(
  "fetchMatchDetail",
  async ({ id }: { id: number }) => {
    const result = await stratsApiService.getMatchDetail(id);
    const {
      data: { match },
      errors,
    } = result.data;
    if (errors) return errors[0].message as string;
    return match as MatchDetail;
  }
);

export const matchDetailSlice = createSlice({
  name: "matchDetail",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setMatchDetail: (state, action: PayloadAction<MatchDetail>) => {
      const { durationSeconds } = action.payload;
      const arr: number[] = [];
      const timeUtc = moment.duration(durationSeconds * 1000).asMinutes();
      range(timeUtc).forEach((item) => {
        arr.push(item);
      });
      if (!isInteger(timeUtc)) arr.push(timeUtc);
      state.matchDetail = action.payload;
      state.timesLabel = arr;
      state.timeSeek = arr.length - 1;
      state.currSeconds = arr[arr.length - 1];
    },
    setTimeSeek: (state, action: PayloadAction<number>) => {
      state.timeSeek = action.payload;
    },
    setErrMess: (state, action: PayloadAction<string | null>) => {
      state.errMess = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchMatchDetail.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      fetchMatchDetail.fulfilled,
      (state, action: PayloadAction<MatchDetail | string>) => {
        if (typeof action.payload === "string") {
          state.errMess = action.payload;
          state.loading = false;
          return;
        }
        const { durationSeconds } = action.payload;
        const arr: number[] = [];
        const timeUtc = moment.duration(durationSeconds * 1000).asMinutes();
        range(timeUtc).forEach((item) => {
          arr.push(item);
        });
        if (!isInteger(timeUtc)) arr.push(timeUtc);
        state.matchDetail = action.payload;
        state.timesLabel = arr;
        state.timeSeek = arr.length - 1;
        state.currSeconds = arr[arr.length - 1];
        state.loading = false;
      }
    );
  },
});

export const { setMatchDetail, setTimeSeek, setErrMess, setLoading } =
  matchDetailSlice.actions;

export default matchDetailSlice.reducer;
