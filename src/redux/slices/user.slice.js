import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../API";

export const fetchUsers = createAsyncThunk(
  "users/fetchusers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users?role=user");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message || error.message || "Unknown error",
      });
    }
  }
);

const users = createSlice({
  name: "users",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload?.message;
      });
  },
});

export default users.reducer;
