import { boardArea } from "@/data/staticData";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boardArea,
  selectedPlace: null,
  gameStart: true,
  showBeginDices: false,
  playerTurn: "black",
  deadPieces: { black: [], white: [] },
  outPieces: { black: [], white: [] },
  diceMoves: [],
};

const gameSlice = createSlice({
  initialState,
  name: "gameSlice",
  reducers: {
    updateGameState: (state, { payload }) => {
      state[payload.key] = payload.value;
    },
    movePiece: (state, action) => {
      const { from, dataPlace, playerTurn, shouldEat } = action.payload;

      const fromPlace = state.boardArea.find((item) => item.place === from);
      const toPlace = state.boardArea.find((item) => item.place === dataPlace);

      if (fromPlace) fromPlace.pieces.pop();
      if (toPlace) toPlace.pieces.push(playerTurn);
      if (shouldEat) toPlace.pieces.shift();

      state.playerTurn = state.playerTurn === "black" ? "white" : "black";
      state.selectedPlace = null;
    },
  },
});

export default gameSlice.reducer;
export const { updateGameState, movePiece } = gameSlice.actions;
