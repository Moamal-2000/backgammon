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

export function hasMoveOptions({
  boardArea,
  fromPlaceData,
  diceMoves,
  playerTurn,
}) {
  const selectedAvailableMoves =
    boardArea[fromPlaceData.place]?.availableMoves || [];
  const selectedPoint =
    playerTurn === "white" ? fromPlaceData.place : 25 - fromPlaceData.place;

  return selectedAvailableMoves.length > 0 || diceMoves.includes(selectedPoint);
}

export function canSelect({
  fromPlaceData,
  isDiceThrew,
  playerHasDeadPieces,
  hasAvailableMove,
  playerTurn,
  allPiecesInInnerHome,
}) {
  const isHomePiece = getIsHomePiece(playerTurn, fromPlaceData);
  const hasValidMove = fromPlaceData?.availableMoves.some(
    (availableMove) => availableMove > 0
  );

  if (isHomePiece && !hasValidMove && !allPiecesInInnerHome) return false;

  return (
    fromPlaceData.pieces.length > 0 &&
    isDiceThrew &&
    !playerHasDeadPieces &&
    hasAvailableMove
  );
}

export function getIsHomePiece(playerTurn, fromPlaceData) {
  return [1, 2, 3, 4, 5, 6].some((point) => {
    const playerPoint = playerTurn === "black" ? 25 - point : point;
    return fromPlaceData?.place === playerPoint;
  });
}

export function canDeadPieceMove({ playerTurn, diceMove, updatedBoardArea }) {
  const opponent = playerTurn === "white" ? "black" : "white";
  const point = playerTurn === "white" ? 25 - diceMove : diceMove;
  const pointData = updatedBoardArea.find(({ place }) => place === point);

  const hasMultiplePieces = pointData?.pieces?.length > 1;
  const hasOpponentPiece = pointData?.pieces?.[0] === opponent;
  const isPointEmpty = pointData?.pieces?.length === 0;

  return (
    (!hasMultiplePieces && hasOpponentPiece) ||
    (hasMultiplePieces && !hasOpponentPiece) ||
    isPointEmpty ||
    !hasMultiplePieces
  );
}

export function shouldDragPiece({
  data,
  gameStart,
  playerTurn,
  piece,
  boardArea,
  pieceType,
}) {
  if (!gameStart && playerTurn !== piece) return false;

  const deadPiecesPoint = boardArea.find((point) => point.place === 0);
  const playerDeadPieces = deadPiecesPoint?.deadPieces?.[playerTurn];

  const hasDeadPiece = playerDeadPieces?.length > 0;
  const hasAvailableMove = data.availableMoves.length > 0;

  if (pieceType === "dead" && hasAvailableMove) return true;

  return hasAvailableMove && !hasDeadPiece;
}
