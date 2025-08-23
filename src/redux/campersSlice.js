import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { getCampers, getCamperById } from "../services/campersAPI";

const buildParams = ({ page = 1, limit = 4, filters }) => {
  const p = { page, limit };

  const loc = filters?.location?.trim();
  if (loc) p.location = loc;

  if (filters?.form) p.form = filters.form;

  if (filters?.equipment) {
    for (const [k, v] of Object.entries(filters.equipment)) {
      if (v) p[k] = true; // бекенд-фільтрація
    }
  }
  return p;
};

export const fetchCampers = createAsyncThunk(
  "campers/fetchAll",
  async ({ page = 1, limit = 4, filters }, { rejectWithValue, signal }) => {
    try {
      const data = await getCampers(buildParams({ page, limit, filters }), {
        signal,
      });
      return { data, page, limit };
    } catch (e) {
      const msg =
        e?.response?.data?.message || e?.message || "Failed to load campers";
      return rejectWithValue(msg);
    }
  }
);

export const fetchCamperById = createAsyncThunk(
  "campers/fetchById",
  async (id, { rejectWithValue, signal }) => {
    try {
      const data = await getCamperById(id, { signal });
      return data;
    } catch (e) {
      const msg =
        e?.response?.data?.message || e?.message || "Failed to load camper";
      return rejectWithValue(msg);
    }
  }
);

const initialState = {
  items: [],
  current: null,
  page: 1,
  // читаємо з .env, fallback = 4
  limit: Number(import.meta.env.VITE_PER_PAGE) || 4,
  hasMore: true,
  isLoading: false,
  error: null,
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    resetCampers(state) {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
    clearCurrent(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.page = payload.page;

        state.items =
          payload.page === 1 ? payload.data : [...state.items, ...payload.data];

        // якщо прийшло рівно limit — імовірно ще є сторінки
        state.hasMore =
          payload.data.length === payload.limit && payload.data.length > 0;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchCamperById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.current = payload;
      })
      .addMatcher(
        isAnyOf(fetchCampers.pending, fetchCamperById.pending),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(isAnyOf(fetchCamperById.rejected), (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetCampers, clearCurrent } = campersSlice.actions;
export default campersSlice.reducer;
