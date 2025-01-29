import { boardArea } from "@/Data/staticData";
import {
  calcValidDiceNumbers,
  getDiceNumbers,
  rollDice,
} from "@/Functions/helper";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boardArea,
  selectedPlace: null,
  gameStart: false,
  showBeginDices: false,
  playerTurn: "",
  deadPieceColor: "",
  diceMoves: [],
  beginDice: [],
  validDiceNumbers: [],
  isDiceThrew: false,
  isBoardDataUpdated: false,
};

const gameSlice = createSlice({
  initialState,
  name: "gameSlice",
  reducers: {
    updateGameState: (state, { payload }) => {
      state[payload.key] = payload.value;
    },
    movePiece: (state, { payload }) => {
      const {
        from,
        dataPlace,
        playerTurn,
        shouldEat,
        restDiceMoves,
        deadPieceColor,
      } = payload;
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

      state.isBoardDataUpdated = false;
      state.isDiceThrew = !allMovesUsed;
      state.selectedPlace = null;
      state.diceMoves = restDiceMoves;
    },
    outPiece: (state, { payload }) => {
      const { from, playerTurn, restDiceMoves } = payload;
      const opponent = playerTurn === "white" ? "black" : "white";
      const isBlackPlayer = playerTurn === "black";
      const diceMove = isBlackPlayer ? 25 - from.place : from.place;

      const fromPlace = state.boardArea.find(
        (item) => item.place === from.place
      );
      const allMovesUsed = restDiceMoves.length === 0;
      const isValidDiceNumber = state.diceMoves.includes(diceMove);

      if (fromPlace && isValidDiceNumber) fromPlace.pieces.pop();
      if (allMovesUsed) state.playerTurn = opponent;

      state.isBoardDataUpdated = false;
      state.isDiceThrew = !allMovesUsed;
      state.selectedPlace = null;
      state.diceMoves = restDiceMoves;
    },
    throwDices(state, { payload }) {
      const { numberOfDices } = payload;
      const { isDiceThrew, gameStart } = state;

      if (isDiceThrew || !gameStart) return;

      const diceNumbers = rollDice(numberOfDices);
      const isDouble = diceNumbers[0] === diceNumbers[1];

      if (isDouble) diceNumbers.push(...diceNumbers);

      state.isDiceThrew = true;
      state.isBoardDataUpdated = false;
      state.diceMoves = diceNumbers;
    },
    initializePlayerTurn: (state) => {
      const { firstDice, secondDice } = getDiceNumbers(true);
      const wonPlayer = firstDice > secondDice ? "white" : "black";

      state.playerTurn = wonPlayer;
      state.beginDice = [firstDice, secondDice];
    },
    selectDeadPiece: (state, { payload }) => {
      const { pieceColor } = payload;
      const { playerTurn, isDiceThrew } = state;
      const fromPlaceData = state.boardArea[0];
      const isSelectDeadPiece = state.selectedPlace === fromPlaceData.place;

      if (playerTurn !== pieceColor || !isDiceThrew) return;

      state.selectedPlace = isSelectDeadPiece ? null : fromPlaceData.place;
      state.deadPieceColor = isSelectDeadPiece ? null : pieceColor;
      state.isBoardDataUpdated = false;
    },
    updateAvailableDices: (state, { payload }) => {
      const { updatedBoardArea } = payload;
      const { playerTurn, selectedPlace, diceMoves } = state;

      const validDiceNumbers = calcValidDiceNumbers({
        updatedBoardArea,
        playerTurn,
        selectedPlace,
        diceMoves,
      });

      state.validDiceNumbers = validDiceNumbers;
    },
    updateBoardArea: (state, { payload }) => {
      state.boardArea = payload.updatedBoardArea;
      state.isBoardDataUpdated = true;
    },
    resetGameState: () => initialState,
  },
});

export default gameSlice.reducer;
export const {
  updateGameState,
  movePiece,
  outPiece,
  throwDices,
  initializePlayerTurn,
  selectDeadPiece,
  updateAvailableDices,
  updateBoardArea,
  resetGameState,
} = gameSlice.actions;
