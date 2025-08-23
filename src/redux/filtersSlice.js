import { createSlice } from "@reduxjs/toolkit";

// дозволені типи кузова (з макету/ТЗ)
const ALLOWED_FORMS = new Set(["panelTruck", "fullyIntegrated", "alcove"]);

const initialState = {
  location: "",
  form: null, // "panelTruck" | "fullyIntegrated" | "alcove" | null
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
    // текстове поле (локація)
    setLocation: (state, action) => {
      state.location = (action.payload ?? "").toString().trim();
    },

    // один тип кузова (radio)
    setForm: (state, action) => {
      const v = action.payload ?? null;
      state.form = ALLOWED_FORMS.has(v) ? v : null;
    },

    // кілька чекбоксів обладнання
    toggleEquipment: (state, action) => {
      const key = action.payload;
      if (key in state.equipment) {
        state.equipment[key] = !state.equipment[key];
      }
    },

    // масовий сет — корисно, якщо підхоплюєш фільтри з URL
    setFilters: (state, action) => {
      const { location, form, equipment } = action.payload || {};
      if (location !== undefined) {
        state.location = (location ?? "").toString().trim();
      }
      if (form !== undefined) {
        state.form = ALLOWED_FORMS.has(form) ? form : null;
      }
      if (equipment && typeof equipment === "object") {
        for (const k of Object.keys(state.equipment)) {
          if (k in equipment) state.equipment[k] = !!equipment[k];
        }
      }
    },

    // повний скидання до дефолту (важливо перед новим бекенд-запитом)
    resetFilters: () => ({ ...initialState }),
  },
});

export const {
  setLocation,
  setForm,
  toggleEquipment,
  setFilters,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;

/* --------- Selectors (зручно для UI) --------- */
export const selectFilters = (state) => state.filters;

export const selectActiveEquipmentKeys = (state) =>
  Object.entries(state.filters.equipment)
    .filter(([, v]) => !!v)
    .map(([k]) => k);

export const selectHasAnyFilter = (state) => {
  const f = state.filters;
  const hasEq = Object.values(f.equipment).some(Boolean);
  return !!(f.location?.trim() || f.form || hasEq);
};
