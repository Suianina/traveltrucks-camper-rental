// src/redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import campers from "./campersSlice";
import filters from "./filtersSlice";
import favorites from "./favoritesSlice";

import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Персистимо лише список обраних ID
const favoritesPersistConfig = {
  key: "favorites",
  version: 1,
  storage,
  whitelist: ["ids"],
};

const rootReducer = combineReducers({
  campers, // не персистимо (дані з бекенду, пагінація)
  filters, // не персистимо (за ТЗ це не обов’язково)
  favorites: persistReducer(favoritesPersistConfig, favorites),
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta?.env?.MODE !== "production",
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        // Рекомендовані винятки для redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
