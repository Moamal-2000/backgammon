import { boardArea } from "@/data/staticData";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boardArea,
  selectedPlace: null,
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
    movePiece: (state, action) => {
      const { from, dataPlace, playerTurn } = action.payload;

      const fromPlace = state.boardArea.find((item) => item.place === from);
      const toPlace = state.boardArea.find((item) => item.place === dataPlace);

      if (fromPlace) fromPlace.pieces.pop();
      if (toPlace) toPlace.pieces.push(playerTurn);

      state.playerTurn = state.playerTurn === "black" ? "white" : "black";
      state.selectedPlace = null;
    },
  },
});

export default gameSlice.reducer;
export const { updateGameState, movePiece } = gameSlice.actions;
