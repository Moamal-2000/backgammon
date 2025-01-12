import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const gameSlice = createSlice({
  initialState,
  name: "gameSlice",
  reducers: {
    updateGameState: (state, { payload }) => {
      state[payload.key] = payload.value;
    },
  },
});

export default gameSlice.reducer;
export const { updateGameState } = gameSlice.actions;
