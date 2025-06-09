import { configureStore } from "@reduxjs/toolkit";
import rootReducer from ".";
import { persistStore } from "redux-persist";

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;

export const persistor = persistStore(store);
