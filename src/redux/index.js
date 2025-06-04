import { combineReducers } from "@reduxjs/toolkit";
import usersSlice from "./slices/user.slice";
import tasksSlice from "./slices/task.slice";

const rootReducer = combineReducers({
  users: usersSlice,
  tasks: tasksSlice,
});

export default rootReducer;
