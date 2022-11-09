import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Season } from "../../interfaces/players";
import { PlayersLeaderboardData } from "../../interfaces/state";
import { viLanguage } from "../../languages";
import stratsApiService from "../../services/stratsApi.service";
import { RootState } from "../store";

const initialState: PlayersLeaderboardData = {
  season: [],
  loading: false,
};

export const fetchPlayersLeaderboard = createAsyncThunk(
  "playersLeaderboard",
  async (division: number) => {
    const result = await stratsApiService.getPlayersLeaderboards(division);
    const { season } = result.data.data.leaderboard;
    if (!season) return [];
    return (await season) as Season[];
  }
);

export const playersLeaderboardSlice = createSlice({
  name: "playersLeaderboard",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSeason: (state, action: PayloadAction<Season[]>) => {
      state.season = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPlayersLeaderboard.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPlayersLeaderboard.fulfilled, (state, action) => {
      state.season = action.payload;
      state.loading = false;
    });
  },
});

export const { setLoading, setSeason } = playersLeaderboardSlice.actions;

export default playersLeaderboardSlice.reducer;
