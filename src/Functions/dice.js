import { DICE_NUMBERS } from "@/Data/constants";
import { calcDeadPiecesForAvailableDices } from "./movement";
import { areAllPiecesInHome } from "./validation";
import { getPlayerPieces } from "./player";

export function getDiceNumbers(reCalcIfSameNumbers = false) {
  let firstDice = calcRandomNumber(DICE_NUMBERS);
  let secondDice = calcRandomNumber(DICE_NUMBERS);
  let isSame = firstDice === secondDice;

  while (isSame && reCalcIfSameNumbers) {
    firstDice = calcRandomNumber(DICE_NUMBERS);
    secondDice = calcRandomNumber(DICE_NUMBERS);
    isSame = firstDice === secondDice;
  }

  return { firstDice, secondDice };
}

export function calcRandomNumber(number) {
  return Math.floor(Math.random() * number + 1);
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
