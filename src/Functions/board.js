import { BACKGAMMON_DATA } from "@/Data/constants";

export function getPiecesData(boardArea) {
  return {
    rightBottom: boardArea.slice(1, 7).reverse(),
    leftBottom: boardArea.slice(7, 13).reverse(),
    leftTop: boardArea.slice(13, 19),
    rightTop: boardArea.slice(19, 25),
  };
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

export const getColor = (i) => ((i + 1) % 2 === 1 ? "black" : "white");

export function getPieces(i) {
  return Array.from({ length: BACKGAMMON_DATA.numbersOfPieces[i] || 0 }, () =>
    BACKGAMMON_DATA.placesColors[i - 1] === 0 ? "black" : "white"
  );
}
