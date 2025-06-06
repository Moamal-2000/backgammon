import { getPlayerPieces } from "./player";
import {
  areAllPiecesInHome,
  canDeadPieceMove,
  canMoveToPlace,
  canSelect,
  hasMoveOptions,
  isValidMove,
} from "./validation";

export function getRestMoves(diceMoves, playedMove) {
  const restMoves = [];
  let isPlayedMoveRemoved = false;

  for (let i = 0; i < diceMoves.length; i++) {
    if (diceMoves[i] === playedMove && !isPlayedMoveRemoved) {
      isPlayedMoveRemoved = true;
      continue;
    }

    restMoves.push(diceMoves[i]);
  }

  return restMoves;
}

export function calcDeadPiecesForAvailableDices({
  diceMoves,
  playerTurn,
  updatedBoardArea,
  validDiceNumbers,
}) {
  diceMoves.forEach((diceMove) => {
    const isValidMove = canDeadPieceMove({
      playerTurn,
      diceMove,
      updatedBoardArea,
    });

    if (isValidMove) validDiceNumbers.add(diceMove);
  });
}

export function getPlaceData({
  boardArea,
  fromPlaceData,
  selectedPlace,
  playerTurn,
  isDiceThrew,
  diceMoves,
  deadPieceColor,
}) {
  const toPlaceData = boardArea.find(
    (point) => point.place === fromPlaceData.place
  );
  const moves = Math.abs(fromPlaceData.place - selectedPlace);

  const isSamePieceColor = toPlaceData?.pieces?.[0] === playerTurn;
  const playerHasDeadPieces = boardArea[0].deadPieces[playerTurn]?.length > 0;
  const allPiecesInInnerHome = areAllPiecesInHome(boardArea, playerTurn);
  const isAllDiceMovesUsed = diceMoves.length === 0;
  const placeHasPieces = fromPlaceData.pieces.length > 0;
  const isPlayerPiece = playerTurn === fromPlaceData.pieces?.[0];
  const unSelectPlace = fromPlaceData.place === selectedPlace;

  const homeSideRange =
    playerTurn === "black" ? [24, 23, 22, 21, 20, 19] : [1, 2, 3, 4, 5, 6];
  const numberOfSelectedPiece = homeSideRange.indexOf(fromPlaceData.place) + 1;
  const restDiceMoves = getRestMoves(diceMoves, numberOfSelectedPiece);

  const shouldEat = !isSamePieceColor && toPlaceData?.pieces.length === 1;
  const shouldOutPiece =
    allPiecesInInnerHome &&
    !playerHasDeadPieces &&
    !isAllDiceMovesUsed &&
    placeHasPieces;

  const hasAvailableMove = hasMoveOptions({
    boardArea,
    fromPlaceData,
    diceMoves,
    playerTurn,
  });
  const canSelectPiece = canSelect({
    fromPlaceData,
    isDiceThrew,
    boardArea,
    hasAvailableMove,
    playerTurn,
    allPiecesInInnerHome,
  });

  const isCurrentMoveValid = isValidMove({
    fromPlaceData,
    toPlaceData,
    isDiceThrew,
    playerTurn,
    selectedPlace,
    diceMoves,
    isSamePieceColor,
    moves,
    deadPieceColor,
  });

  return {
    moves,
    placeHasPieces,
    isPlayerPiece,
    shouldEat,
    canSelectPiece,
    unSelectPlace,
    playerHasDeadPieces,
    shouldOutPiece,
    isCurrentMoveValid,
    restDiceMoves,
  };
}

export function getAvailableMove({
  diceMoves,
  diceMove,
  placeData,
  availablePlace,
  playerTurn,
  boardArea,
}) {
  const isWhitePlayer = playerTurn === "white";
  const isSelectDeadPiece = placeData?.place === 0;
  const shouldOutPiece = areAllPiecesInHome(boardArea, playerTurn);
  const result = Math.abs(25 - availablePlace - diceMove);
  const lastEmptyPlace = getLastEmptyPlace(boardArea, playerTurn);
  const isAfterEmptyPlace = placeData.place === lastEmptyPlace - 1;
  const canBearOffWithDice = diceMoves.includes(lastEmptyPlace);

  if (isWhitePlayer && isSelectDeadPiece) return result;

  // For white piece calculation
  if (isWhitePlayer) {
    if (isAfterEmptyPlace && canBearOffWithDice) return 0;
  }

  // For Black piece calculation
  if (shouldOutPiece) {
    if (diceMove + availablePlace === 25 && !isWhitePlayer) return 0;
  }

  return diceMove + availablePlace;
}

export function getLastEmptyPlace(boardArea, playerTurn) {
  const isWhitePlayer = playerTurn === "white";
  const [start, end] = isWhitePlayer ? [1, 7] : [-6];
  const playerHomePlaces = boardArea.slice(start, end);
  let emptyPlace = null;

  if (isWhitePlayer) playerHomePlaces.reverse();

  for (let i = 0; i < playerHomePlaces.length; i++) {
    const placeData = playerHomePlaces[i];
    const isEmptyPlace = placeData.pieces.length === 0;

    if (isEmptyPlace) emptyPlace = placeData.place;
    else return emptyPlace;
  }
}

export function calcAvailablePlaces({ boardArea, diceMoves, playerTurn }) {
  const noMoreMoves = diceMoves.length === 0;
  const updatedBoardArea = boardArea.map((point) => ({ ...point }));
  const hasDeadPieces = boardArea[0].deadPieces[playerTurn]?.length > 0;
  let availablePieces = getPlayerPieces({ boardArea, playerTurn });

  if (hasDeadPieces)
    availablePieces = availablePieces.filter((point) => point.place === 0);

  if (noMoreMoves) updatedBoardArea.map((point) => (point.availableMoves = []));

  for (let i = 0; i < availablePieces.length; i++) {
    const availableMoves = [];

    for (let j = 0; j < diceMoves.length; j++) {
      const availableMove = getAvailableMove({
        diceMoves,
        diceMove: diceMoves[j],
        placeData: availablePieces[i],
        availablePlace: availablePieces[i].place,
        playerTurn,
        boardArea,
      });

      const availablePlace = updatedBoardArea[availableMove];
      const validPlace = canMoveToPlace({
        toPlaceData: availablePlace,
        playerTurn,
      });

      if (validPlace) availableMoves.push(availableMove);
    }

    availablePieces[i].availableMoves = [...availableMoves];
  }

  availablePieces.forEach((pieceData) => {
    const index = pieceData.place;
    updatedBoardArea[index] = pieceData;
  });

  return updatedBoardArea;
}

export function getPlaceClasses({
  utilsCssModule,
  componentCssModule,
  boardArea,
  data,
  selectedPlace,
  playerTurn,
  isDiceThrew,
}) {
  const selectedAvailableMoves = boardArea[data.place]?.availableMoves;
  const hasAvailableMove = selectedAvailableMoves?.length > 0;
  const isPlaceSelected = selectedPlace === data.place;
  const isPlaceSelectable = canSelect({
    fromPlaceData: data,
    allPiecesInInnerHome: areAllPiecesInHome(boardArea, playerTurn),
    isDiceThrew,
    hasAvailableMove,
    playerTurn,
    boardArea,
  });

  const selectedClass = isPlaceSelected ? componentCssModule.selected : "";
  const hasMoveClass = isPlaceSelectable ? componentCssModule.hasMove : "";
  const unavailableClass = !hasAvailableMove ? utilsCssModule.unavailable : "";

  const classes = `${componentCssModule.place} ${
    componentCssModule[data.placeColor]
  } ${unavailableClass} ${hasMoveClass} ${selectedClass}`;

  return { classes, unavailableClass };
}
