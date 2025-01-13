import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./slices/gameSlice";
import globalSlice from "./slices/globalSlice";

export const store = configureStore({
  reducer: {
    global: globalSlice,
    game: gameSlice,
  },
});
