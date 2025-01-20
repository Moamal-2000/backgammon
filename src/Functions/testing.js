import { getColor } from "./helper";

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
