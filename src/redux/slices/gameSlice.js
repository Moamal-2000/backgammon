import { boardArea } from "@/data/staticData";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boardArea,
  selectedPlace: null,
  gameStart: true,
  showBeginDices: false,
  playerTurn: "",
  deadPieces: { black: [], white: [] },
  outPieces: { black: [], white: [] },
  diceMoves: [],
  beginDice: [],
  isDiceThrew: false,
};

const gameSlice = createSlice({
  initialState,
  name: "gameSlice",
  reducers: {
    updateGameState: (state, { payload }) => {
      state[payload.key] = payload.value;
    },
    movePiece: (state, action) => {
      const { from, dataPlace, playerTurn, shouldEat, restDiceMoves } =
        action.payload;

      const fromPlace = state.boardArea.find((item) => item.place === from);
      const toPlace = state.boardArea.find((item) => item.place === dataPlace);
      const allMovesUsed = restDiceMoves.length === 0;

      if (fromPlace) fromPlace.pieces.pop();
      if (toPlace) toPlace.pieces.push(playerTurn);
      if (shouldEat) toPlace.pieces.shift();
      if (allMovesUsed)
        state.playerTurn = playerTurn === "white" ? "black" : "white";

      state.isDiceThrew = !allMovesUsed;
      state.selectedPlace = null;
    },
  },
});

export default gameSlice.reducer;
export const { updateGameState, movePiece } = gameSlice.actions;
