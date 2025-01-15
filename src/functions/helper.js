import { BACKGAMMON_DATA, DICE_NUMBERS } from "@/data/constants";

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
    BACKGAMMON_DATA.placesColors[i] === 0 ? "black" : "white"
  );
}

export function getBoardArea() {
  return Array.from({ length: 24 }, (_, i) => ({
    place: i + 1,
    placeColor: getColor(i),
    pieces: getPieces(i),
  }));
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

  console.log('restMoves:', restMoves);

  return restMoves;
}
