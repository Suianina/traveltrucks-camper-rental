import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import campersReducer from "./campers/slice";
import { filterReducer } from "./filters/filtersSlice.js";

const persistAuthConfig = {
  key: "campers",
  storage,
  whitelist: ["favoriteItem"],
};

const persistedCampersReducer = persistReducer(
  persistAuthConfig,
  campersReducer
);

export const store = configureStore({
  reducer: {
    campers: persistedCampersReducer,
    filters: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
