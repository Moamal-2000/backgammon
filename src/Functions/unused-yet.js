export function getExpandedDiceMoves(diceMoves) {
  const result = [...diceMoves];

  for (let i = 0; i < diceMoves.length; i++) {
    let sum = diceMoves[i];

    for (let j = i + 1; j < diceMoves.length; j++) {
      sum += diceMoves[j];
      result.push(sum);
    }
  }

  return [...new Set(result)];
}