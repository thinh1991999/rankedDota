import {
  Action,
  configureStore,
  EnhancedStore,
  Reducer,
  combineReducers,
  ThunkAction,
  AnyAction,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import globalDataSlice from "./Slices/globalDataSlice";
import { Root } from "../interfaces/state";
import composSlice from "./Slices/composSlice";
import matchDetailSlice from "./Slices/matchDetailSlice";
import lenguesSlice from "./Slices/lenguesSlice";
import playersLeaderboardSlice from "./Slices/playersLeaderboardSlice";
import heroesTrendsSlice from "./Slices/heroesTrendsSlice";
import heroesPositionsSlice from "./Slices/heroesPositionsSlice";
import { ThunkMiddleware } from "redux-thunk";

export const makeStore = () => {
  const isServer = typeof window === "undefined";
  const combinedReducer = combineReducers({
    globalData: globalDataSlice,
    compos: composSlice,
    matchDetail: matchDetailSlice,
    lengues: lenguesSlice,
    playersLeaderboard: playersLeaderboardSlice,
    heroesTrends: heroesTrendsSlice,
    heroesPositions: heroesPositionsSlice,
  });
  if (isServer) {
    return configureStore({
      reducer: combinedReducer,
    });
  } else {
    const { persistStore, persistReducer } = require("redux-persist");
    const storage = require("redux-persist/lib/storage").default;

    const persistConfig = {
      key: "root",
      storage,
    };

    const persistedReducer: Reducer<Root> = persistReducer(
      persistConfig,
      combinedReducer
    );

    // const store: EnhancedStore<Root, Action> & {
    //   __persistor?: any;
    // } = configureStore({
    //   reducer: persistedReducer,
    //   devTools: true,
    // });
    const store: EnhancedStore<
      Root,
      AnyAction,
      [ThunkMiddleware<Root, AnyAction, undefined>]
    > = configureStore({
      reducer: persistedReducer,
      devTools: true,
    });
    // store.__persistor = persistStore(store);
    return store;
  }
};

type Store = ReturnType<typeof makeStore>;
export type AppDispatch = Store["dispatch"];
export type RootState = ReturnType<Store["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const wrapper = createWrapper(makeStore, {
  debug: true,
});
