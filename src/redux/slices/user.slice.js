import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../API";

export const fetchUsers = createAsyncThunk(
  "users/fetchusers",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await api.get("/users");
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const users = createSlice({
  name: "users",
  initialState: {
    items: [],
    loading: false,
    error: null,
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default users.reducer;
