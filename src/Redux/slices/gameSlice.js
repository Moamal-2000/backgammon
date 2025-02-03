import { boardArea } from "@/Data/staticData";
import {
  calcValidDiceNumbers,
  getDiceNumbers,
  getRestMoves,
  rollDice,
} from "@/Functions/helper";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  winners: { black: 0, white: 0 },
  outPieces: { black: [], white: [] },
  selectedPlace: null,
  boardArea,
  isBoardDataUpdated: false,
  isDiceThrew: false,
  gameStart: false,
  deadPieceColor: "",
  winnerPlayer: "",
  playerTurn: "",
  validDiceNumbers: [],
  diceMoves: [],
};

const gameSlice = createSlice({
  initialState,
  name: "gameSlice",
  reducers: {
    updateGameState: (state, { payload }) => {
      state[payload.key] = payload.value;
    },
    movePiece: (state, { payload }) => {
      const { placeData, shouldEat, moves } = payload;
      const { selectedPlace, playerTurn, deadPieceColor, diceMoves } = state;
      const opponent = playerTurn === "white" ? "black" : "white";
      const isDeadPiece = !!deadPieceColor;
      const whiteOrBlackMoves = deadPieceColor === "white" ? 25 - moves : moves;
      const restDiceMoves = getRestMoves(diceMoves, whiteOrBlackMoves);

      const fromPlace = state.boardArea.find(
        (point) => point.place === selectedPlace
      );
      const toPlace = state.boardArea.find((item) => item.place === placeData);
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
        (point) => point.place === from.place
      );
      const allMovesUsed = restDiceMoves.length === 0;
      const isValidDiceNumber = state.diceMoves.includes(diceMove);

      if (fromPlace && isValidDiceNumber) {
        fromPlace.pieces.pop();
        state.outPieces[playerTurn].push(playerTurn);
      }

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
      state.diceMoves = [firstDice, secondDice];
      state.isBoardDataUpdated = false;
    },
    selectDeadPiece: (state, { payload }) => {
      const { pieceColor } = payload;
      const { boardArea, playerTurn, isDiceThrew, selectedPlace } = state;
      const fromPlaceData = boardArea[0];
      const isSelectDeadPiece = selectedPlace === fromPlaceData.place;

      if (playerTurn !== pieceColor || !isDiceThrew) return;

      state.selectedPlace = isSelectDeadPiece ? null : fromPlaceData.place;
      state.deadPieceColor = isSelectDeadPiece ? null : pieceColor;
      state.isBoardDataUpdated = false;
    },
    updateAvailableDices: (state, { payload }) => {
      const { updatedBoardArea } = payload;
      const { playerTurn, diceMoves } = state;

      const validDiceNumbers = calcValidDiceNumbers({
        updatedBoardArea,
        playerTurn,
        diceMoves,
      });

      state.validDiceNumbers = validDiceNumbers;
    },
    updateBoardArea: (state, { payload }) => {
      state.boardArea = payload.updatedBoardArea;
      state.isBoardDataUpdated = true;
    },
    selectPiece: (state, { payload }) => {
      const { placeData } = payload;
      state.selectedPlace = placeData;
      state.deadPieceColor = null;
    },
    checkWinner: (state) => {
      const { outPieces, playerTurn } = state;
      const isSomeoneWin = [...outPieces[playerTurn]].length === 15;

      if (!isSomeoneWin) return;

      state.winnerPlayer = playerTurn;
      state.winners[playerTurn] += 1;
      resetGameAfterWin(state);
    },
    checkPlayableOrChangeTurn: (state) => {
      const { validDiceNumbers, playerTurn, isDiceThrew, gameStart } = state;
      const shouldChangeTurn = [...validDiceNumbers].length === 0;
      const opponent = playerTurn === "white" ? "black" : "white";

      if ((!shouldChangeTurn && isDiceThrew) || gameStart) return;

      console.log(`No more moves, ${opponent} turn.`);
      state.playerTurn = opponent;
      state.isDiceThrew = false;
      state.diceMoves = [];
    },
    startTheGame: (state) => {
      state.gameStart = true;
      state.isDiceThrew = true;
      state.boardArea = boardArea;
      state.outPieces = { black: [], white: [] };
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
  selectPiece,
  checkWinner,
  checkPlayableOrChangeTurn,
  startTheGame,
  resetGameState,
} = gameSlice.actions;

function resetGameAfterWin(state) {
  Object.assign(state, {
    gameStart: false,
    isDiceThrew: false,
    diceMoves: [],
    playerTurn: "",
    validDiceNumbers: [],
    isBoardDataUpdated: false,
  });
}
