"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import s from "./Dice.module.scss";

const Dice = ({
  shouldShowBeginDices,
  showGameDices,
  beginDiceNumber,
  color,
  size = 50,
}) => {
  const { diceMoves, validDiceNumbers } = useSelector((s) => s.game);
  const diceNumber = diceMoves?.[color === "black" ? 1 : 0];
  const blackNoun = color === "black" ? "-black" : "";
  const isValidDice = validDiceNumbers.includes(diceNumber);
  const invalidClass = !isValidDice ? s.invalid : "";

  return (
    <>
      {shouldShowBeginDices && beginDiceNumber && (
        <Image
          className={s.dice}
          src={`/dice${beginDiceNumber}${blackNoun}.png`}
          width={size}
          height={size}
          alt={`dice ${beginDiceNumber}`}
        />
      )}

      {showGameDices && diceNumber && (
        <Image
          className={`${s.dice} ${invalidClass}`}
          src={`/dice${diceNumber}.png`}
          width={size}
          height={size}
          alt={`dice ${diceNumber}`}
        />
      )}
    </>
  );
};

export default Dice;
