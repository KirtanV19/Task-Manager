import { combineReducers } from "@reduxjs/toolkit";
import usersSlice from "./slices/user.slice";
import tasksSlice from "./slices/task.slice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
const usersPersistConfig = {
  key: "users",
  storage,
  whitelist: ["currentUser"],
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersSlice),
  tasks: tasksSlice,
});

export default rootReducer;
