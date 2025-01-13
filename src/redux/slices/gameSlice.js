import { boardArea } from "@/data/staticData";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boardArea,
  selectPlace: null,
  gameStart: false,
  playerTurn: "black",
  deadPieces: { black: [], white: [] },
  outPieces: { black: [], white: [] },
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
