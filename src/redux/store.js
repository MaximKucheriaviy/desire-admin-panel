import { configureStore } from "@reduxjs/toolkit";
import { loaderSlse } from "./slices";

export const store = configureStore({
  reducer: {
    loader: loaderSlse.reducer,
  },
});
