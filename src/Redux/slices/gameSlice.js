import { boardArea } from "@/Data/staticData";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boardArea,
  selectedPlace: null,
  gameStart: true,
  showBeginDices: false,
  playerTurn: "",
  outPieces: { black: [], white: [] },
  deadPieceColor: "",
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
      const {
        from,
        dataPlace,
        playerTurn,
        shouldEat,
        restDiceMoves,
        deadPieceColor,
      } = action.payload;
      const opponent = playerTurn === "white" ? "black" : "white";
      const isDeadPiece = !!deadPieceColor;

      const fromPlace = state.boardArea.find((item) => item.place === from);
      const toPlace = state.boardArea.find((item) => item.place === dataPlace);
      const allMovesUsed = restDiceMoves.length === 0;

      if (fromPlace) fromPlace.pieces.pop();
      if (toPlace) toPlace.pieces.push(playerTurn);
      if (allMovesUsed) state.playerTurn = opponent;

      if (shouldEat) {
        state.boardArea[0].deadPieces[opponent].push(opponent);
        toPlace.pieces.shift();
      }

      if (isDeadPiece) state.boardArea[0].deadPieces[deadPieceColor].pop();

      state.isDiceThrew = !allMovesUsed;
      state.selectedPlace = null;
      state.diceMoves = restDiceMoves;
    },
    outPiece: (state, action) => {
      const { from, playerTurn, restDiceMoves } = action.payload;
      const opponent = playerTurn === "white" ? "black" : "white";

      const fromPlace = state.boardArea.find((item) => {
        return item.place === from.place;
      });
      const allMovesUsed = restDiceMoves.length === 0;
      const isValidDiceNumber = state.diceMoves.includes(from.place - 1)

      if (fromPlace && isValidDiceNumber) fromPlace.pieces.pop();
      if (allMovesUsed) state.playerTurn = opponent;

      state.isDiceThrew = !allMovesUsed;
      state.selectedPlace = null;
      state.diceMoves = restDiceMoves;
    },
    resetGameState: () => initialState,
  },
});

export default gameSlice.reducer;
export const { updateGameState, movePiece, outPiece, resetGameState } =
  gameSlice.actions;
