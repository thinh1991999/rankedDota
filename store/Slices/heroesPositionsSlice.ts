import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MetaPositions } from "../../interfaces/heroes";
import { HeroesPositionsData } from "../../interfaces/state";
import stratsApiService from "../../services/stratsApi.service";

const initialState: HeroesPositionsData = {
  heroesPositions: null,
  loading: false,
  errMess: null,
};

export const fetchHeroesMetaPositions = createAsyncThunk(
  "fetchHeroesMetaPositions",
  async ({
    bracketIds,
    gameModeIds,
  }: {
    bracketIds: string | null | undefined;
    gameModeIds?: string | null | undefined;
  }) => {
    const result = await stratsApiService.getHeroMetaPositions(
      bracketIds,
      gameModeIds
    );
    const { data, errors } = result.data;
    if (errors) return errors[0].message as string;
    return data as MetaPositions;
  }
);

export const heroesPositionsSlice = createSlice({
  name: "heroesPositions",
  initialState,
  reducers: {
    setHeroesPositions: (state, action: PayloadAction<MetaPositions>) => {
      state.heroesPositions = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setErrMess: (state, action: PayloadAction<string>) => {
      state.errMess = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchHeroesMetaPositions.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchHeroesMetaPositions.fulfilled, (state, action) => {
      if (typeof action.payload === "string") {
        state.errMess = action.payload;
        state.loading = false;
        return;
      }
      state.heroesPositions = action.payload;
      state.errMess = null;
      state.loading = false;
    });
  },
});

export const { setLoading, setHeroesPositions, setErrMess } =
  heroesPositionsSlice.actions;

export default heroesPositionsSlice.reducer;
