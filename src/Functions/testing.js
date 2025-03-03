import { getColor } from "./helper";

const BACKGAMMON_DATA = {
  numbersOfPieces: [
    0, 3, 2, 4, 2, 1, 5, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 4, 1, 2, 5, 6, 4, 2,
  ],
  placesColors: [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
};

function getPieces(i) {
  return Array.from({ length: BACKGAMMON_DATA.numbersOfPieces[i] || 0 }, () =>
    BACKGAMMON_DATA.placesColors[i - 1] === 0 ? "black" : "white"
  );
}

export function getBoardAreaToTestKill() {
  const deadPieces = { black: ["black", "black"], white: ["white", "white"] };

  return Array.from({ length: 25 }, (_, i) => {
    const placeData = {
      place: i,
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
      place: i,
      placeColor: getColor(i),
      pieces: getPieces(i),
      availableMoves: [],
    };

    if (i === 0) placeData.deadPieces = deadPieces;
    return placeData;
  });
}
