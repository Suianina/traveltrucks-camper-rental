import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers, getCamperById } from "./operations.js";



const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    favoriteItem: [],
    total: 0,
    page: 1,
    perPage: 4,
    camper: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearItems(state) {
      state.items = [];
      state.total = 0;
      state.page = 1;
    },
    setPage(state) {
      state.page = state.page + 1;
    },
    addToFavorite: (state, { payload }) => {
      state.favoriteItem.push(payload);
    },
    deleteFromFavorite: (state, { payload }) => {
      state.favoriteItem = state.favoriteItem.filter(
        ({ id }) => id !== payload
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCampers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.items = payload.items || payload;
        state.total = payload.total || payload.length;
      })
      .addCase(fetchCampers.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload ? payload.message : "An error occurred";
      })
      .addCase(getCamperById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.camper = payload || null;
      })
      .addCase(getCamperById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCamperById.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload ? payload.message : "An error occurred";
      });
  },
});

export const { clearItems, setPage, addToFavorite, deleteFromFavorite } =
  campersSlice.actions;
export default campersSlice.reducer;
