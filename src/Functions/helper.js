import {
  BACKGAMMON_DATA,
  DICE_NUMBERS,
  GAME_SOUNDS,
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
  const diceNumbers = [];

  for (let i = 0; i < diceCount; i++) {
    const offset = Math.pow(6, i);
    const rollNumber = Math.floor((now / offset) % 6) + 1;
    diceNumbers.push(rollNumber);
  }

  return diceNumbers;
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
  const allPiecesInInnerHome = areAllPiecesInHome(boardArea, playerTurn);
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
  const hasNormalMove = selectedAvailableMoves.some((move) => move > 0);
  const isInnerHomePiece = numberOfSelectedPiece !== 0;
  const isBiggerOrEqualPlace = getIsBiggerOrEqualPlace(
    diceMoves,
    playerTurn,
    fromPlaceData.place
  );
  const isNormalPiece = !isInnerHomePiece && hasNormalMove;
  const isOutPiece = isInnerHomePiece && isBiggerOrEqualPlace;
  const innerOrNormalPieceCase = isNormalPiece || isOutPiece;

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
    hasAvailableMove &&
    innerOrNormalPieceCase;

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

export function getIsBiggerOrEqualPlace(diceMoves, playerTurn, place) {
  const isBiggerOrEqualPlace = diceMoves.some((move) => {
    if (playerTurn === "black") return move <= 25 - place;
    return move <= place;
  });

  return isBiggerOrEqualPlace;
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

export function getAvailableMove({
  diceMove,
  placeData,
  availablePlace,
  playerTurn,
  boardArea,
}) {
  //! noticed that the point 6 in white have an issue in the available dice
  const isWhitePlayer = playerTurn === "white";
  const isSelectDeadPiece = placeData?.place === 0;
  const shouldOutPiece = areAllPiecesInHome(boardArea, playerTurn);
  const result = Math.abs(25 - availablePlace - diceMove);

  if (isWhitePlayer && isSelectDeadPiece) return result;
  if (isWhitePlayer) return availablePlace - diceMove;
  if (shouldOutPiece && !isWhitePlayer)
    if (diceMove + availablePlace === 25) return 0;

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
  const deadPieces = updatedBoardArea?.[0]?.deadPieces[playerTurn] || [];
  const isBlackPlayer = playerTurn === "black";
  const validDiceNumbers = new Set();
  const playerPieces = getPlayerPieces({
    boardArea: updatedBoardArea,
    playerTurn,
  });
  const shouldOutPiece = areAllPiecesInHome(updatedBoardArea, playerTurn);

  playerPieces.forEach(({ place, availableMoves }) => {
    diceMoves.forEach((diceMove) => {
      let availableMove = undefined;

      if (isBlackPlayer && !shouldOutPiece) {
        availableMove = place + diceMove;
      } else if (isBlackPlayer && shouldOutPiece) {
        availableMove = Math.abs(place + diceMove);
        if (availableMove === 25) availableMove = 0;
      } else availableMove = place - diceMove;

      const isValidMove = availableMoves.includes(availableMove);
      if (isValidMove) validDiceNumbers.add(diceMove);
    });
  });

  // Calculate for dead pieces
  if (deadPieces.length > 0)
    calcDeadPiecesForAvailableDices({
      diceMoves,
      playerTurn,
      updatedBoardArea,
      validDiceNumbers,
    });

  return [...validDiceNumbers];
}

function calcDeadPiecesForAvailableDices({
  diceMoves,
  playerTurn,
  updatedBoardArea,
  validDiceNumbers,
}) {
  const opponent = playerTurn === "white" ? "black" : "white";

  diceMoves.forEach((diceMove) => {
    const entryPoint = playerTurn === "white" ? 25 - diceMove : diceMove;
    const entryPointData = updatedBoardArea.find(
      ({ place }) => place === entryPoint
    );

    const hasMoreThanPiece = entryPointData?.pieces?.length > 1;
    const hasOpponentPiece = entryPointData?.pieces?.[0] === opponent;
    const isPlaceEmpty = entryPointData?.pieces?.length === 0;
    const isValidMove =
      (!hasMoreThanPiece && hasOpponentPiece) ||
      (hasMoreThanPiece && !hasOpponentPiece) ||
      isPlaceEmpty;

    if (isValidMove) validDiceNumbers.add(diceMove);
  });
}

export function getStackData(pieces) {
  const stacks = {
    baseStack: pieces.slice(0, 5),
    secondStack: pieces.slice(5, 9),
    thirdStack: pieces.slice(9, 12),
    fourthStack: pieces.slice(12, 14),
    lastStack: pieces.slice(14, 15),
  };

  const lastStackName = getLastStackName(stacks);

  return { stacks, lastStackName };
}

export function getLastStackName(stacks) {
  if (stacks.lastStack.length > 0) return "lastStack";
  if (stacks.fourthStack.length > 0) return "fourthStack";
  if (stacks.thirdStack.length > 0) return "thirdStack";
  if (stacks.secondStack.length > 0) return "secondStack";
  if (stacks.baseStack.length > 0) return "baseStack";
  return "No stacks";
}

export function calculateMovesToWin(boardArea, playerTurn) {
  const playerPieces = getPlayerPieces({ boardArea, playerTurn });

  const calcPoints = playerPieces.reduce((prevValue, point) => {
    const amountOfPieces = point.pieces.length;

    if (point.place === 0)
      return point.deadPieces[playerTurn].length * 25 + prevValue;
    if (playerTurn === "black")
      return (25 - point?.place) * amountOfPieces + prevValue;

    return point?.place * amountOfPieces + prevValue;
  }, 0);

  return calcPoints;
}

export function playSound(fileName, extension = "mp3") {
  const sound = new Audio(`/Sounds/Game/${fileName}.${extension}`);
  sound.play();
  return sound;
}

export function preloadGameSounds() {
  GAME_SOUNDS.forEach((fileName) => {
    const audio = new Audio(`/Sounds/Game/${fileName}.mp3`);
    audio.preload = "auto";
  });
}
