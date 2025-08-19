import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  form: null,
  equipment: {
    AC: false,
    bathroom: false,
    kitchen: false,
    TV: false,
    radio: false,
    refrigerator: false,
    microwave: false,
    gas: false,
    water: false,
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setLocation: (s, a) => {
      s.location = a.payload;
    },
    setForm: (s, a) => {
      s.form = a.payload;
    },
    toggleEquipment: (s, a) => {
      const k = a.payload;
      s.equipment[k] = !s.equipment[k];
    },
    resetFilters: () => initialState,
  },
});

export const { setLocation, setForm, toggleEquipment, resetFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
