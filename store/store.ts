import {
  Action,
  configureStore,
  EnhancedStore,
  Reducer,
  combineReducers,
  ThunkAction,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import languageSlice from "./Slices/languageSlice";
import rootSlice from "./Slices/rootSlice";
import globalDataSlice from "./Slices/globalDataSlice";
import { GlobalData, Root } from "../interfaces/state";

export const makeStore = () => {
  const isServer = typeof window === "undefined";
  const combinedReducer = combineReducers({
    // root: rootSlice,
    globalData: globalDataSlice,
    // language: languageSlice,
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
    const store = configureStore({
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
export const wrapper = createWrapper(makeStore, { debug: true });
