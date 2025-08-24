import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilter(state, { payload }) {
      state.value = payload || "";
    },
  },
});

export const { changeFilter } = filtersSlice.actions;
export const filterReducer = filtersSlice.reducer;
