import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/client";

export const fetchUsers = createAsyncThunk(
  "users/fetchusers",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.USERS.getAll(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  "users/registeruser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.USERS.create({ data: userData });
      // console.log("userData", userData);
      // console.log("response", response);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message || error.message || "Unknown error",
      });
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.USERS.getAll({
        params: { email, password },
      });
      // console.log("response of login user", response);
      const user = response?.[0]; // not response.data?.[0]
      // console.log("user", user);
      if (!user || user.password !== password) {
        return rejectWithValue("Invalid credentials");
      }

      return user;
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

const users = createSlice({
  name: "users",
  initialState: {
    items: [],
    currentUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = users.actions;
export default users.reducer;
