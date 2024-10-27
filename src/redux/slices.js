import { createSlice } from "@reduxjs/toolkit";

export const loaderSlse = createSlice({
  name: "loader",
  initialState: {
    value: false,
  },
  reducers: {
    enableLoader: (state) => {
      state.value = true;
    },
    disableLoader: (state) => {
      state.value = false;
    },
  },
});

export const { enableLoader, disableLoader } = loaderSlse.actions;
