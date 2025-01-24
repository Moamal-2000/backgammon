import { getColor } from "./helper";

const BACKGAMMON_DATA = {
  numbersOfPieces: [
    0, 3, 3, 3, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 3, 3, 3,
  ],
  placesColors: [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
};

const BACKGAMMON_DATA2 = {
  numbersOfPieces: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2,
  ],
  placesColors: [
    0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1,
  ],
};

function getPieces(i) {
  return Array.from({ length: BACKGAMMON_DATA.numbersOfPieces[i] || 0 }, () =>
    BACKGAMMON_DATA.placesColors[i - 1] === 0 ? "black" : "white"
  );
}

function getPieces2(i) {
  return Array.from({ length: BACKGAMMON_DATA2.numbersOfPieces[i] || 0 }, () =>
    BACKGAMMON_DATA2.placesColors[i - 1] === 0 ? "black" : "white"
  );
}

export function getBoardAreaToTestKill() {
  const deadPieces = { black: ["black", "black"], white: ["white", "white"] };

  return Array.from({ length: 25 }, (_, i) => {
    const placeData = {
      place: i + 1,
      placeColor: getColor(i),
      pieces: [i % 2 === 1 ? "black" : "white"],
      availableMoves: [],
    };

    if (i === 0) placeData.deadPieces = deadPieces;
    return placeData;
  });
}

export function getBoardAreaToTestOutPieces() {
  const deadPieces = { black: [], white: [] };

  return Array.from({ length: 25 }, (_, i) => {
    const placeData = {
      place: i + 1,
      placeColor: getColor(i),
      pieces: getPieces(i),
      availableMoves: [],
    };

    if (i === 0) placeData.deadPieces = deadPieces;
    return placeData;
  });
}

export function getBoardAreaToTestNoMoreMoves() {
  const deadPieces = { black: [], white: [] };

  return Array.from({ length: 25 }, (_, i) => {
    const placeData = {
      place: i + 1,
      placeColor: getColor(i),
      pieces: getPieces2(i),
      availableMoves: [],
    };

    if (i === 0) placeData.deadPieces = deadPieces;
    return placeData;
  });
}
