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

const favoritesPersist = persistReducer(
  { key: "favorites", storage },
  favorites
);

const rootReducer = combineReducers({
  campers,
  filters,
  favorites: favoritesPersist,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
