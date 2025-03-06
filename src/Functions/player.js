export function getPlayerPieces({ boardArea, playerTurn }) {
  const updatedBoardArea = boardArea.map((point) => ({ ...point }));

  return updatedBoardArea.filter((point) => {
    const playerDeadPieces = point?.deadPieces?.[playerTurn];
    const placeHasPlayerPiece = playerTurn === point.pieces?.[0];
    const playerHasDeadPiece = playerTurn === playerDeadPieces?.[0];

    return placeHasPlayerPiece || playerHasDeadPiece;
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
