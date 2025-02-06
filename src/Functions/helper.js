import {
  BACKGAMMON_DATA,
  DICE_NUMBERS,
  PLAYERS_HOME_SIDE,
} from "@/Data/constants";

export function getDiceNumbers(recalcIfSameNumbers = false) {
  let firstDice = calcRandomNumber(DICE_NUMBERS);
  let secondDice = calcRandomNumber(DICE_NUMBERS);
  let isSame = firstDice === secondDice;

  while (isSame && recalcIfSameNumbers) {
    firstDice = calcRandomNumber(DICE_NUMBERS);
    secondDice = calcRandomNumber(DICE_NUMBERS);
    isSame = firstDice === secondDice;
  }

  return { firstDice, secondDice };
}

export function calcRandomNumber(number) {
  return Math.floor(Math.random() * number + 1);
}

export const getColor = (i) => ((i + 1) % 2 === 1 ? "black" : "white");

export function getPieces(i) {
  return Array.from({ length: BACKGAMMON_DATA.numbersOfPieces[i] || 0 }, () =>
    BACKGAMMON_DATA.placesColors[i - 1] === 0 ? "black" : "white"
  );
}

export function getBoardArea() {
  const deadPieces = { black: [], white: [] };

  return Array.from({ length: 25 }, (_, i) => {
    const placeData = {
      place: i,
      placeColor: getColor(i),
      pieces: getPieces(i),
      availableMoves: [],
    };

    if (i === 0) placeData.deadPieces = deadPieces;
    return placeData;
  });
}

export const rollDice = (diceCount) => {
  const now = new Date().getTime();
  const results = [];

  for (let i = 0; i < diceCount; i++) {
    const offset = Math.pow(6, i);
    const roll = Math.floor((now / offset) % 6) + 1;
    results.push(roll);
  }

  return results;
};

export function getRestMoves(moves, playedMove) {
  const restMoves = [];
  let isPlayedMoveRemoved = false;

  for (let i = 0; i < moves.length; i++) {
    if (moves[i] === playedMove && !isPlayedMoveRemoved) {
      isPlayedMoveRemoved = true;
      continue;
    }

    restMoves.push(moves[i]);
  }

  return restMoves;
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
  const moves = Math.abs(toPlaceData.place - selectedPlace);
  const placeHasPieces = fromPlaceData.pieces.length > 0;
  const isPlayerPiece = playerTurn === fromPlaceData.pieces?.[0];
  const unSelectPlace = fromPlaceData.place === selectedPlace;
  const isSamePieceColor = toPlaceData.pieces?.[0] === playerTurn;
  const playerHasDeadPieces = boardArea[0].deadPieces[playerTurn].length > 0;
  const allPiecesInInnerHome = areAllPiecesInInnerHome(boardArea, playerTurn);
  const isAllDiceMovesUsed = diceMoves.length === 0;
  const placeHasPiece = fromPlaceData.pieces.length > 0;
  const homeSideRange =
    playerTurn === "black" ? [24, 23, 22, 21, 20, 19] : [1, 2, 3, 4, 5, 6];
  const numberOfSelectedPiece = homeSideRange.indexOf(fromPlaceData.place) + 1;
  const restDiceMoves = getRestMoves(diceMoves, numberOfSelectedPiece);
  const selectedAvailableMoves = boardArea[fromPlaceData.place]?.availableMoves;
  const selectedPoint =
    playerTurn === "white" ? fromPlaceData.place : 25 - fromPlaceData.place;
  const hasAvailableOutPiece = diceMoves.includes(selectedPoint);

  // Main conditions
  const shouldEat = !isSamePieceColor && toPlaceData.pieces.length === 1;

  const shouldOutPiece =
    allPiecesInInnerHome &&
    !playerHasDeadPieces &&
    !isAllDiceMovesUsed &&
    placeHasPiece;

  const hasAvailableMove =
    selectedAvailableMoves?.length > 0 ||
    hasAvailableOutPiece ||
    shouldOutPiece;

  const canSelectPiece =
    placeHasPieces &&
    isPlayerPiece &&
    isDiceThrew &&
    !playerHasDeadPieces &&
    hasAvailableMove;

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
    unSelectPlace,
    shouldEat,
    canSelectPiece,
    playerHasDeadPieces,
    restDiceMoves,
    shouldOutPiece,
    isCurrentMoveValid,
  };
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

export function areAllPiecesInInnerHome(boardArea, playerTurn) {
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

export function getPiecesData(boardArea) {
  return {
    rightBottom: boardArea.slice(1, 7).reverse(),
    leftBottom: boardArea.slice(7, 13).reverse(),
    leftTop: boardArea.slice(13, 19),
    rightTop: boardArea.slice(19, 25),
  };
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
        diceMove: diceMoves[j],
        placeData: availablePieces[i],
        availablePlace: availablePieces[i].place,
        playerTurn,
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

export function getAvailableMove({
  diceMove,
  placeData,
  availablePlace,
  playerTurn,
}) {
  const isWhitePlayer = playerTurn === "white";
  const isSelectDeadPiece = placeData?.place === 0;

  if (isWhitePlayer && isSelectDeadPiece)
    return Math.abs(25 - availablePlace - diceMove);

  if (isWhitePlayer) return availablePlace - diceMove;

  return diceMove + availablePlace;
}

export function getPlayerPieces({ boardArea, playerTurn }) {
  const updatedBoardArea = boardArea.map((point) => ({ ...point }));

  return updatedBoardArea.filter((point) => {
    const playerDeadPieces = point?.deadPieces?.[playerTurn];
    const placeHasPlayerPiece = playerTurn === point.pieces?.[0];
    const playerHasDeadPiece = playerTurn === playerDeadPieces?.[0];

    return placeHasPlayerPiece || playerHasDeadPiece;
  });
}

export function calcValidDiceNumbers({
  updatedBoardArea,
  playerTurn,
  diceMoves,
}) {
  const playerPieces = getPlayerPieces({
    boardArea: updatedBoardArea,
    playerTurn,
  });

  const allAvailableMoves = playerPieces
    .map((point) => point.availableMoves)
    .reduce((acc, curr) => [...acc, ...curr], []);

  const allValidDiceNumbers = allAvailableMoves
    .map((availableMove) => {
      const validPoint = playerPieces.find((point) =>
        point.availableMoves.includes(availableMove)
      );

      return diceMoves.map((diceMove) => {
        const expectedDiceMove =
          Math.abs(validPoint?.place - availableMove) === diceMove;

        const isWhitePlayer = playerTurn === "white";
        const isDeadPiece = validPoint?.place === 0;
        const validMove = validPoint.availableMoves.includes(25 - diceMove);
        const whitePlayerCondition = isWhitePlayer && isDeadPiece && validMove;

        if (expectedDiceMove || whitePlayerCondition) return diceMove;
      });
    })
    .flat(1);

  const validDiceNumbersWithoutRepeat = [
    ...new Set(allValidDiceNumbers),
  ].filter((diceNumber) => diceNumber);

  return validDiceNumbersWithoutRepeat;
}
