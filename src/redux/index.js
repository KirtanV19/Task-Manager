import { combineReducers } from "@reduxjs/toolkit";
import usersSlice from "./slices/user.slice";
import tasksSlice from "./slices/task.slice";
import authSlice from "./slices/auth.slice";

const rootReducer = combineReducers({
  users: usersSlice,
  tasks: tasksSlice,
  auth: authSlice,
});

export default rootReducer;
