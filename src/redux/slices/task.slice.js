import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../API";

const setPending = (state) => {
  state.loading = true;
  state.error = null;
};

const setRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload || action.error.message;
};

// Simple get and fetch

export const fetchTasks = createAsyncThunk(
  "tasks/fetchtasks",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await api.get("/tasks");
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Filter (by status)
export const fetchTasksByStatus = createAsyncThunk(
  "tasks/fetchtasksbystatus",
  async (status, { rejectWithValue }) => {
    try {
      const response = await api.get(`/tasks?status=${status}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Filter (by due date)
export const fetchTasksByDueDate = createAsyncThunk(
  "tasks/fetchtasksbyduedate",
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/tasks?dueDate_gte=${startDate}&dueDate_lte=${endDate}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Sorting ( by date )
export const fetchTasksByDate = createAsyncThunk(
  "tasks/fetchtasksbydate",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await api.get(`/tasks`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Searching
export const fetchTasksBySearch = createAsyncThunk(
  "tasks/fetchtasksbysearch",
  async (title, { rejectWithValue }) => {
    try {
      const response = await api.get(`/tasks?title_like=${title}`);
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, setPending)
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, setRejected);

    builder
      .addCase(fetchTasksByStatus.pending, setPending)
      .addCase(fetchTasksByStatus.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasksByStatus.rejected, setRejected);

    builder
      .addCase(fetchTasksByDueDate.pending, setPending)
      .addCase(fetchTasksByDueDate.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasksByDueDate.rejected, setRejected);

    builder
      .addCase(fetchTasksByDate.pending, setPending)
      .addCase(fetchTasksByDate.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasksByDate.rejected, setRejected);

    builder
      .addCase(fetchTasksBySearch.pending, setPending)
      .addCase(fetchTasksBySearch.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasksBySearch.rejected, setRejected);
  },
});

export default tasks.reducer;
