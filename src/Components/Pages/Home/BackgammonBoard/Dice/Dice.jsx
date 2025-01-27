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
  const blackClass = color === "black" ? s.black : "";
  const diceNumber = diceMoves?.[color === "black" ? 1 : 0];

  return (
    <>
      {shouldShowBeginDices && (
        <Image
          className={`${s.dice} ${blackClass}`}
          src={`/dice${beginDiceNumber}.png`}
          width={size}
          height={size}
          alt="dice"
        />
      )}

      {showGameDices && (
        <Image
          className={`${s.dice} ${blackClass}`}
          src={`/dice${diceNumber}.png`}
          width={size}
          height={size}
          alt="dice"
        />
      )}
    </>
  );
};

export default Dice;
