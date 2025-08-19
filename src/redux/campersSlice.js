import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCampers, getCamperById } from "../services/campersAPI";

const buildParams = ({ page = 1, limit = 4, filters }) => {
  const params = { page, limit };
  if (filters?.location) params.location = filters.location;
  if (filters?.form) params.form = filters.form;
  if (filters?.equipment) {
    Object.entries(filters.equipment).forEach(([k, v]) => {
      if (v) params[k] = true;
    });
  }
  return params;
};

export const fetchCampers = createAsyncThunk(
  "campers/fetchAll",
  async ({ page = 1, limit = 4, filters }, thunkAPI) => {
    try {
      const data = await getCampers(buildParams({ page, limit, filters }));
      return { data, page, limit };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchCamperById = createAsyncThunk(
  "campers/fetchById",
  async (id, thunkAPI) => {
    try {
      return await getCamperById(id);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const slice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    current: null,
    page: 1,
    limit: 4,
    hasMore: true,
    isLoading: false,
    error: null,
  },
  reducers: {
    resetCampers: (s) => {
      s.items = [];
      s.page = 1;
      s.hasMore = true;
      s.error = null;
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchCampers.pending, (s) => {
      s.isLoading = true;
      s.error = null;
    })
      .addCase(fetchCampers.fulfilled, (s, { payload }) => {
        s.isLoading = false;
        s.page = payload.page;
        if (payload.page === 1) s.items = payload.data;
        else s.items = [...s.items, ...payload.data];
        s.hasMore = payload.data.length === payload.limit;
      })
      .addCase(fetchCampers.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.payload || a.error.message;
      })
      .addCase(fetchCamperById.fulfilled, (s, { payload }) => {
        s.current = payload;
      });
  },
});

export const { resetCampers } = slice.actions;
export default slice.reducer;
