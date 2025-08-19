import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { ids: [] },
  reducers: {
    toggleFavorite: (s, a) => {
      const id = String(a.payload);
      const i = s.ids.indexOf(id);
      i > -1 ? s.ids.splice(i, 1) : s.ids.push(id);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
