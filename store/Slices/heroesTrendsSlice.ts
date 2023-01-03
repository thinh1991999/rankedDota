import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import forEach from "lodash/forEach";
import orderBy from "lodash/orderBy";
import findIndex from "lodash/findIndex";
import findLastIndex from "lodash/findLastIndex";

import {
  HeroesMetaTrends,
  HeroTrends,
  SortedType,
} from "../../interfaces/heroes";
import { HeroesTrendsData } from "../../interfaces/state";
import stratsApiService from "../../services/stratsApi.service";

const initialState: HeroesTrendsData = {
  heroesTrends: null,
  loading: false,
  dataHandled: [],
  sorted: {
    type: "CURRENT_WR",
    status: true,
  },
  searchName: "",
  maxPr: 0,
  errMess: null,
  dataRange: {
    begin: 0,
    end: 0,
  },
};

const getSort = (
  arr: HeroTrends[],
  type: SortedType,
  status: boolean
): HeroTrends[] => {
  return orderBy(
    arr,
    (a) => {
      const {
        winRate: { data },
        pickRate: { data: prData },
        matches,
      } = a;
      const startWr = data[0].wr;
      const currentWr = data[data.length - 1].wr;
      const diffWr = currentWr - startWr;
      const startPr = prData[0].pr;
      const currentPr = prData[prData.length - 1].pr;
      const diffPr = currentPr - startPr;
      switch (type) {
        case "START_WR":
          return startWr;
        case "CURRENT_WR":
          return currentWr;
        case "DIFFER_WR":
          return diffWr;
        case "START_PR":
          return startPr;
        case "CURRENT_PR":
          return currentPr;
        case "DIFFER_PR":
          return diffPr;
        case "MATCHES":
          return matches;
        default:
          break;
      }
    },
    status ? "desc" : "asc"
  );
};

const calculateInfo = (
  heroesTrends: HeroesMetaTrends,
  type: SortedType,
  status: boolean
) => {
  const { winDay, winGameVersion } = heroesTrends;
  const heroes: HeroTrends[] = [];
  let startTime = 1000000000000;
  let endTime = 0;
  let totalMatches: {
    time: number;
    count: number;
  }[] = [];
  let maxPr = 0;
  forEach(winDay, (win) => {
    const { matchCount, timestamp } = win;
    const checkIdx = findIndex(
      totalMatches,
      (total) => total.time === timestamp
    );
    if (!timestamp) return;
    if (timestamp > endTime) {
      endTime = timestamp;
    } else {
      startTime = timestamp;
    }
    if (checkIdx === -1) {
      totalMatches.push({
        time: timestamp,
        count: matchCount,
      });
    } else {
      totalMatches[checkIdx].count += matchCount;
    }
  });
  forEach(winDay, (win) => {
    const { heroId, matchCount, winCount, gameVersionId, timestamp } = win;
    if (!timestamp) return;
    const matchesTimeIdx = findIndex(
      totalMatches,
      (total) => total.time === timestamp
    );
    const pr = (matchCount * 1000) / totalMatches[matchesTimeIdx].count;
    if (pr > maxPr) {
      maxPr = pr;
    }
    const prValue = {
      time: timestamp,
      matchCount: matchCount,
      pr,
    };
    const wrValue = {
      time: timestamp,
      matchCount: matchCount,
      wr: (winCount * 100) / matchCount,
    };
    const checkIdx = findIndex(heroes, (hero) => hero.id === heroId);
    if (checkIdx === -1) {
      heroes.push({
        id: heroId,
        winRate: {
          data: [wrValue],
        },
        pickRate: {
          data: [prValue],
        },
        matches: matchCount,
      });
    } else {
      const lastIdxWr = findLastIndex(
        heroes[checkIdx].winRate.data,
        (d) => d.time <= timestamp
      );
      heroes[checkIdx].winRate.data.splice(lastIdxWr + 1, 0, wrValue);
      const lastIdxPr = findLastIndex(
        heroes[checkIdx].pickRate.data,
        (d) => d.time <= timestamp
      );
      heroes[checkIdx].pickRate.data.splice(lastIdxPr + 1, 0, prValue);
      heroes[checkIdx].matches += matchCount;
    }
  });
  // Calculate versions
  const arrVersions: {
    id: number;
    winGameVersion: {
      id: number;
      wr: number;
      pr: number;
      matches: number;
    }[];
  }[] = [];
  const versionMatches: {
    id: number;
    count: number;
  }[] = [];
  forEach(winGameVersion, (win) => {
    const { matchCount, gameVersionId } = win;
    if (!gameVersionId) return;
    const idxCheck = findIndex(
      versionMatches,
      (version) => version.id === gameVersionId
    );
    if (idxCheck === -1) {
      versionMatches.push({
        id: gameVersionId,
        count: matchCount,
      });
    } else {
      versionMatches[idxCheck].count += matchCount;
    }
  });
  forEach(winGameVersion, (win) => {
    const { heroId, matchCount, winCount, gameVersionId, timestamp } = win;
    if (!gameVersionId) return;
    const idxCheck = findIndex(arrVersions, (a) => a.id === heroId);
    const idxVersion = findIndex(
      versionMatches,
      (version) => version.id === gameVersionId
    );
    const matches = versionMatches[idxVersion].count;
    const value = {
      id: gameVersionId,
      wr: (winCount * 100) / matchCount,
      pr: (matchCount * 1000) / matches,
      matches,
    };
    if (idxCheck === -1) {
      arrVersions.push({
        id: heroId,
        winGameVersion: [value],
      });
    } else {
      arrVersions[idxCheck].winGameVersion?.push(value);
    }
  });
  forEach(heroes, (heroes) => {
    const idx = findIndex(arrVersions, (a) => a.id === heroes.id);
    if (idx !== -1) {
      heroes.winGameVersion = arrVersions[idx].winGameVersion;
    }
  });
  return {
    info: getSort(heroes, type, status),
    maxPr,
    dataRange: {
      begin: startTime,
      end: endTime,
    },
  };
};

export const fetchHeroesMetaTrends = createAsyncThunk(
  "fetchHeroesMetaTrends",
  async ({
    bracketIds,
    positions = [],
    regionIds,
    gameModeIds,
  }: {
    bracketIds: string | null | undefined;
    positions?: string[];
    regionIds?: string | null | undefined;
    gameModeIds?: string | null | undefined;
  }) => {
    const result = await stratsApiService.getHeroesMetaTrends(
      bracketIds,
      positions,
      regionIds,
      gameModeIds
    );
    const {
      data: { heroStats },
      errors,
    } = result.data;
    if (errors) return errors[0].message as string;
    return heroStats as HeroesMetaTrends;
  }
);

export const heroesTrendsSlice = createSlice({
  name: "heroesTrends",
  initialState,
  reducers: {
    setHeroesTrends: (state, action: PayloadAction<HeroesMetaTrends>) => {
      const { type, status } = state.sorted;
      const infor = calculateInfo(action.payload, type, status);
      state.heroesTrends = action.payload;
      state.dataHandled = infor.info;
      state.maxPr = infor.maxPr;
      state.dataRange = infor.dataRange;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSorted: (state, action: PayloadAction<SortedType>) => {
      const { type, status } = state.sorted;
      if (type === action.payload) {
        state.dataHandled = getSort(state.dataHandled, type, !status);
        state.sorted.status = !status;
      } else {
        state.dataHandled = getSort(state.dataHandled, action.payload, true);
        state.sorted.type = action.payload;
        state.sorted.status = true;
      }
    },
    setSearchName: (state, action: PayloadAction<string>) => {
      state.searchName = action.payload;
    },
    setErrMess: (state, action: PayloadAction<string>) => {
      state.errMess = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchHeroesMetaTrends.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchHeroesMetaTrends.fulfilled, (state, action) => {
      if (typeof action.payload === "string") {
        state.errMess = action.payload;
        state.loading = false;
        return;
      }
      const { type, status } = state.sorted;
      const infor = calculateInfo(action.payload, type, status);
      state.heroesTrends = action.payload;
      state.dataHandled = infor.info;
      state.maxPr = infor.maxPr;
      state.dataRange = infor.dataRange;
      state.errMess = null;
      state.loading = false;
    });
  },
});

export const {
  setHeroesTrends,
  setLoading,
  setSorted,
  setSearchName,
  setErrMess,
} = heroesTrendsSlice.actions;

export default heroesTrendsSlice.reducer;
