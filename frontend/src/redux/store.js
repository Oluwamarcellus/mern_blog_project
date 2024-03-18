import { configureStore } from "@reduxjs/toolkit";
import theme from "./theme.slice";

export const store = configureStore({
    reducer: {
      theme: theme,
  },
});