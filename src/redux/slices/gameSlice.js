import { boardArea } from "@/data/staticData";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boardArea,
};

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
