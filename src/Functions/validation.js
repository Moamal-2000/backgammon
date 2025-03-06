import { PLAYERS_HOME_SIDE } from "@/Data/constants";

export function areAllPiecesInHome(boardArea, playerTurn) {
  if (!playerTurn) return false;

  const innerHomeRange =
    PLAYERS_HOME_SIDE[playerTurn === "black" ? "black" : "white"];

  for (const point of boardArea) {
    const isOutsideInnerHome = !innerHomeRange.includes(point.place);
    const hasPlayerPieces = point.pieces.includes(playerTurn);

    if (isOutsideInnerHome && hasPlayerPieces) return false;
  }

  return true;
}

export function isForwardMove({ fromPlace, selectedPlace, playerTurn }) {
  const isDeadPiece = selectedPlace === 0;

  if (playerTurn === "black") return selectedPlace < fromPlace;
  if (playerTurn === "white" && !isDeadPiece) return selectedPlace > fromPlace;

  return isDeadPiece;
}

export function hasValidDiceMove({ moves, diceMoves, deadPieceColor }) {
  if (deadPieceColor === "white") moves = 25 - moves;

  return diceMoves.includes(moves) && diceMoves.length > 0;
}

export function canMoveToPlace({ toPlaceData, playerTurn }) {
  if (!toPlaceData) return false;

  const { pieces } = toPlaceData;
  const thereIsOnePiece = pieces.length <= 1;
  const isPlaceHasPlayerPieces = pieces[0] === playerTurn;
  const isEmptyPlace = pieces.length === 0;

  return thereIsOnePiece || isPlaceHasPlayerPieces || isEmptyPlace;
}

export function isValidMove({
  fromPlaceData,
  toPlaceData,
  isDiceThrew,
  playerTurn,
  selectedPlace,
  diceMoves,
  moves,
  deadPieceColor,
}) {
  const hasSelectedPlace = !isNaN(parseInt(selectedPlace));

  if (!isDiceThrew || !hasSelectedPlace || diceMoves.length === 0) return false;

  const forwardMove = isForwardMove({
    fromPlace: fromPlaceData.place,
    selectedPlace,
    playerTurn,
  });

  const validDiceMove = hasValidDiceMove({ moves, diceMoves, deadPieceColor });
  const validPlace = canMoveToPlace({ toPlaceData, playerTurn });

  return forwardMove && validDiceMove && validPlace;
}

export function hasMoveOptions(
  boardArea,
  fromPlaceData,
  diceMoves,
  playerTurn
) {
  const selectedAvailableMoves =
    boardArea[fromPlaceData.place]?.availableMoves || [];
  const selectedPoint =
    playerTurn === "white" ? fromPlaceData.place : 25 - fromPlaceData.place;

  return selectedAvailableMoves.length > 0 || diceMoves.includes(selectedPoint);
}

export function canSelect(
  fromPlaceData,
  isDiceThrew,
  playerHasDeadPieces,
  hasAvailableMove
) {
  return (
    fromPlaceData.pieces.length > 0 &&
    isDiceThrew &&
    !playerHasDeadPieces &&
    hasAvailableMove
  );
}
