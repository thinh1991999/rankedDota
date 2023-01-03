import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import cloneDeepWith from "lodash/cloneDeepWith";
import { PlayerSeason, Season } from "../../interfaces/players";
import { PlayersLeaderboardData } from "../../interfaces/state";
import stratsApiService from "../../services/stratsApi.service";

const initialState: PlayersLeaderboardData = {
  season: null,
  loading: false,
};

export const fetchPlayersLeaderboard = createAsyncThunk(
  "playersLeaderboard",
  async (division: number) => {
    const result = await stratsApiService.getPlayersLeaderboards({
      divisionIdNb: division,
    });
    const { season } = result.data.data.leaderboard;
    if (!season) return null;
    return (await season) as Season;
  }
);

export const playersLeaderboardSlice = createSlice({
  name: "playersLeaderboard",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSeason: (state, action: PayloadAction<Season>) => {
      state.season = action.payload;
    },
    loadMorePlayers: (state, action: PayloadAction<PlayerSeason[]>) => {
      if (!state.season) return;
      const clSeason = cloneDeepWith(state.season);
      clSeason.players = [...clSeason.players, ...action.payload];
      state.season = clSeason;
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

export const { setLoading, setSeason, loadMorePlayers } =
  playersLeaderboardSlice.actions;

export default playersLeaderboardSlice.reducer;
