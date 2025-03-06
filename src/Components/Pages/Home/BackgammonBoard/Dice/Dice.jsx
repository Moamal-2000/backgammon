"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import s from "./Dice.module.scss";

const Dice = ({ showGameDices, color, size = 50, number }) => {
  const { diceMoves, validDiceNumbers, showBeginDice, playerTurn } =
    useSelector((s) => s.game);
  const diceNumber = diceMoves?.[color === "black" ? 1 : 0];
  const isValidDice = validDiceNumbers.includes(diceNumber);
  let blackNoun = color === "black" ? "-black" : "";

  const invalidClass = !isValidDice ? s.invalid : "";

  if (showBeginDice) blackNoun = playerTurn === "black" ? "-black" : "";

  return [1, 2, 3, 4, 5, 6].map((numberInMap) => {
    const showDiceClass =
      showGameDices && diceNumber && numberInMap === number ? s.showDice : "";

    return (
      <Image
        className={`${s.dice} ${invalidClass} ${showDiceClass}`}
        src={`/Images/Dices/dice${numberInMap}${blackNoun}.png`}
        key={`${numberInMap}-dice`}
        alt={`dice ${diceNumber}`}
        width={size}
        height={size}
        priority={true}
      />
    );
  });
};

export default Dice;
