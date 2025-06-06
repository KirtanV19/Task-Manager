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
      const response = await api.USERS.update("/users", userData);
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
      const response = await api.USERS.getAll(`/users?email=${email}`);
      const user = response.data[0];

      if (!user || user.password !== password) {
        return rejectWithValue({ message: "Invalid credentials" });
      }
      localStorage.setItem("authUser", JSON.stringify(user));

      return user;
    } catch (error) {
      return rejectWithValue({
        message: error.message || "Login failed",
      });
    }
  }
);

const savedUser = JSON.parse(localStorage.getItem("authUser"));

const users = createSlice({
  name: "users",
  initialState: {
    items: [],
    currentUser: savedUser || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("authUser");
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
        state.error = action.payload?.message;
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
        state.error = action.payload?.message;
      });

    // builder
    //   .addCase(loginUser.pending, setPending)
    //   .addCase(loginUser.fulfilled, (state, action) => {
    //     state.currentUser = action.payload;
    //     state.loading = false;
    //   })
    //   .addCase(loginUser.rejected, setRejected);
  },
});

export const { logout } = users.actions;
export default users.reducer;
