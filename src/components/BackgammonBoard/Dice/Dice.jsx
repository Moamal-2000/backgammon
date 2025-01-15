"use client";

import { useSelector } from "react-redux";
import s from "./Dice.module.scss";

const Dice = ({
  shouldShowBeginDices,
  showGameDices,
  beginDiceNumber,
  color,
}) => {
  const { diceMoves } = useSelector((s) => s.game);
  const blackClass = color === "black" ? s.black : "";
  const diceNumber = diceMoves?.[color === "black" ? 1 : 0];

  return (
    <>
      {shouldShowBeginDices && (
        <p className={`${s.dice} ${blackClass}`}>{beginDiceNumber}</p>
      )}

      {showGameDices && (
        <p className={`${s.dice} ${blackClass}`}>{diceNumber}</p>
      )}
    </>
  );
};

export default Dice;
