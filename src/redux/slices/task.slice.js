import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../API";

export const fetchTasks = createAsyncThunk(
  "users/fetchtasks",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await api.get("/tasks");
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const tasks = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading: false,
    error: null,
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default tasks.reducer;
