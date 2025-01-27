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
  const { diceMoves } = useSelector((s) => s.game);
  const diceNumber = diceMoves?.[color === "black" ? 1 : 0];

  return (
    <>
      {shouldShowBeginDices && beginDiceNumber && (
        <Image
          className={s.dice}
          src={`/dice${beginDiceNumber}.png`}
          width={size}
          height={size}
          alt={`dice ${beginDiceNumber}`}
        />
      )}

      {showGameDices && diceNumber && (
        <Image
          className={s.dice}
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
