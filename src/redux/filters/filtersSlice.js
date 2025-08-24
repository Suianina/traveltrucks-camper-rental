import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    location: "",
    AC: false,
    kitchen: false,
    TV: false,
    bathroom: false,
    refrigerator: false,
    microwave: false,
    gas: false,
    water: false,
    transmission: "",
    engine: "",
    form: "",
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilter(state, { payload }) {
      state.value = payload;
    },
  },
});

export const { changeFilter } = filtersSlice.actions;
export const filterReducer = filtersSlice.reducer;
