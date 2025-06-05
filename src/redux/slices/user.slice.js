import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../API";

const setPending = (state) => {
  state.loading = true;
};

const setRejected = (state, action) => {
  state.error = action.payload?.message;
};

export const fetchUsers = createAsyncThunk(
  "users/fetchusers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users");
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

export const fetchUserOnly = createAsyncThunk(
  "users/fetchusersonly",
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

export const registerUser = createAsyncThunk(
  "users/registeruser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/users", userData);
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
      const response = await api.get(`/users?email=${email}`);
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
      .addCase(fetchUsers.pending, setPending)
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, setRejected);

    builder
      .addCase(fetchUserOnly.pending, setPending)
      .addCase(fetchUserOnly.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserOnly.rejected, setRejected);

    builder
      .addCase(registerUser.pending, setPending)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(registerUser.rejected, setRejected);

    builder
      .addCase(loginUser.pending, setPending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, setRejected);
  },
});

export const { logout } = users.actions;
export default users.reducer;
