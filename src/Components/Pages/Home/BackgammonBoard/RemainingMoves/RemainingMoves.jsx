"use client";

import { calculateMovesToWin } from "@/Functions/helper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import s from "./RemainingMoves.module.scss";

const RemainingMoves = ({ player }) => {
  const { boardArea, isDiceThrew, gameStart, isBoardDataUpdated } = useSelector(
    (s) => s.game
  );
  const [remainingMoves, setRemainingMoves] = useState(0);

  useEffect(() => {
    const movesToWin = calculateMovesToWin(boardArea, player);
    setRemainingMoves(movesToWin);
  }, [isBoardDataUpdated, isDiceThrew, gameStart]);

  return <p className={s.RemainingMoves}>{remainingMoves}</p>;
};

export default RemainingMoves;
