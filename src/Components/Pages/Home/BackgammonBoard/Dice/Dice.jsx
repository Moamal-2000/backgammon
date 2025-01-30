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
  const showBeginDiceClass =
    shouldShowBeginDices && beginDiceNumber ? s.showBeginDice : "";
  const showDiceClass = showGameDices && diceNumber ? s.showDice : "";

  return (
    <>
      <Image
        className={`${s.dice} ${showBeginDiceClass}`}
        src={`/dice${beginDiceNumber}${blackNoun}.png`}
        alt={`dice ${beginDiceNumber}`}
        width={size}
        height={size}
        priority={true}
      />

      <Image
        className={`${s.dice} ${invalidClass} ${showDiceClass}`}
        src={`/dice${diceNumber}.png`}
        alt={`dice ${diceNumber}`}
        width={size}
        height={size}
        priority={true}
      />
    </>
  );
};

export default Dice;
