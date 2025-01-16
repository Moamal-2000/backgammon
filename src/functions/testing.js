import { getColor } from "./helper";

export function getBoardAreaToTestKill() {
  return Array.from({ length: 24 }, (_, i) => ({
    place: i + 1,
    placeColor: getColor(i),
    pieces: [i % 2 === 1 ? "black" : "white"],
  }));
}
