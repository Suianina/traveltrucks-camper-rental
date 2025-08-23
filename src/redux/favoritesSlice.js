import { createSlice } from "@reduxjs/toolkit";

/* --- persistence helpers --- */
const LS_KEY = "favorites";

const loadFromLS = () => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
};

/* --- slice --- */
const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { ids: loadFromLS() },
  reducers: {
    toggleFavorite: (state, action) => {
      const id = String(action.payload);
      const i = state.ids.indexOf(id);
      if (i > -1) state.ids.splice(i, 1);
      else state.ids.push(id);
    },
    // опціонально: повне очищення
    clearFavorites: (state) => {
      state.ids = [];
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

/* --- selectors --- */
export const selectFavoriteIds = (state) => state.favorites.ids;
export const selectIsFavorite = (state, id) =>
  state.favorites.ids.includes(String(id));

/* --- middleware для збереження у LS --- */
export const favoritesPersistence = (store) => (next) => (action) => {
  const result = next(action);
  // зберігаємо лише після змін обраного
  if (toggleFavorite.match(action) || clearFavorites.match(action)) {
    const ids = selectFavoriteIds(store.getState());
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(ids));
    } catch {
      /* no-op */
    }
  }
  return result;
};
