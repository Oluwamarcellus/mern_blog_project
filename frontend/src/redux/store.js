import { configureStore, combineReducers } from "@reduxjs/toolkit";
import theme from "./theme.slice";
import activeUser from "./user.slice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  theme: theme,
  user: activeUser,
});

const config = {
  key: "root",
  storage: storage,
  version: 1,
}

const persistedReducer = persistReducer(config, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false
    })
  }
});

export const persistor = persistStore(store);