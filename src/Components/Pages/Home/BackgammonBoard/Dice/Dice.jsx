"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import s from "./Dice.module.scss";

const Dice = ({ showGameDices, color, size = 50, number }) => {
  const { diceMoves, validDiceNumbers } = useSelector((s) => s.game);
  const diceNumber = diceMoves?.[color === "black" ? 1 : 0];
  const blackNoun = color === "black" ? "-black" : "";
  const isValidDice = validDiceNumbers.includes(diceNumber);
  const invalidClass = !isValidDice ? s.invalid : "";
  const showDiceClass = showGameDices && diceNumber ? s.showDice : "";

  return (
    <Image
      className={`${s.dice} ${invalidClass} ${showDiceClass}`}
      src={`/dice${number}${blackNoun}.png`}
      alt={`dice ${diceNumber}`}
      width={size}
      height={size}
      priority={true}
    />
  );
};

export default Dice;
