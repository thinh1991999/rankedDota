import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import languageSlice from "./Slices/languageSlice";
import themeSlice from "./Slices/themeSlice";
import rootSlice from "./Slices/rootSlice";

export const makeStore = () => {
  const isServer = typeof window === "undefined";
  const combinedReducer = combineReducers({
    root: rootSlice,
    theme: themeSlice,
    language: languageSlice,
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

    const persistedReducer = persistReducer(persistConfig, combinedReducer);

    const store: any = configureStore({
      reducer: persistedReducer,
      devTools: true,
    });

    store.__persistor = persistStore(store);

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
export const store = makeStore();
