import { boardArea } from "@/data/staticData";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boardArea,
  selectedPlace: null,
  gameStart: false,
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
  },
});

export default gameSlice.reducer;
export const { updateGameState, movePiece } = gameSlice.actions;
