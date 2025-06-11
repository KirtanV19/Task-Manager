import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/client";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchtasks",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.TASKS.getAll(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.TASKS.create({ data: formData });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateTaskStatus = createAsyncThunk(
  "tasks/updateTaskStatus",
  async ({ id, status }, { getState, rejectWithValue }) => {
    try {
      // Get the full task from the current state
      const task = getState().tasks.items.find((t) => t.id === id);
      if (!task) throw new Error("Task not found");
      // Send the full task object with updated status
      const response = await api.TASKS.update({
        id,
        data: { ...task, status },
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
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
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder.addCase(updateTaskStatus.fulfilled, (state, action) => {
      const idx = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (idx !== -1) {
        state.items[idx] = { ...state.items[idx], ...action.payload };
      }
    });
  },
});

export default tasks.reducer;
