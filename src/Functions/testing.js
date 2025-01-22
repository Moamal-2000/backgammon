import { getColor } from "./helper";

const BACKGAMMON_DATA = {
  numbersOfPieces: [
    ,
    3,
    3,
    3,
    2,
    2,
    2,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    2,
    2,
    2,
    3,
    3,
    3,
  ],
  placesColors: [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
};

export function getBoardAreaToTestKill() {
  // const deadPieces = { black: [], white: [] };
  const deadPieces = { black: ["black", "black"], white: ["white", "white"] };

  return Array.from({ length: 25 }, (_, i) => {
    const placeData = {
      place: i + 1,
      placeColor: getColor(i),
      pieces: [i % 2 === 1 ? "black" : "white"],
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
    };

    if (i === 0) placeData.deadPieces = deadPieces;
    return placeData;
  });
}

function getPieces(i) {
  return Array.from({ length: BACKGAMMON_DATA.numbersOfPieces[i] || 0 }, () =>
    BACKGAMMON_DATA.placesColors[i - 1] === 0 ? "black" : "white"
  );
}
