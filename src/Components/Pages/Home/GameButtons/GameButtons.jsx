"use client";

import { resetGameState, updateGameState } from "@/Redux/slices/gameSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./GameButtons.module.scss";

const GameButtons = () => {
  const { gameStart, isDiceThrew } = useSelector((s) => s.game);
  const dispatch = useDispatch();

  function startTheGame() {
    dispatch(updateGameState({ key: "gameStart", value: true }));
    dispatch(updateGameState({ key: "showBeginDices", value: true }));

    setTimeout(() => {
      dispatch(updateGameState({ key: "showBeginDices", value: false }));
    }, 2000);
  }

  function restartGame() {
    const shouldRestart = confirm("Are you sure you want to restart the game?");

    if (shouldRestart) {
      dispatch(resetGameState());
      setTimeout(startTheGame, 0);
    }
  }

  function handleThrowDice() {
    if (isDiceThrew) return;

    const diceNumbers = [2, 6];
    const isDouble = diceNumbers[0] === diceNumbers[1];

    if (isDouble) diceNumbers.push(...diceNumbers);

    dispatch(updateGameState({ key: "isDiceThrew", value: true }));
    dispatch(updateGameState({ key: "isBoardDataUpdated", value: false }));
    dispatch(updateGameState({ key: "diceMoves", value: diceNumbers }));
  }

  useEffect(() => {
    handleThrowDice();
  }, []);

  return (
    <div className={s.buttons}>
      <button
        className={s.startButton}
        type="button"
        onClick={startTheGame}
        disabled={gameStart}
      >
        Start playing
      </button>

      <button className={s.restartButton} type="button" onClick={restartGame}>
        Restart game
      </button>

      <button className={s.throwButton} type="button" onClick={handleThrowDice}>
        Throw dice
      </button>
    </div>
  );
};

export default GameButtons;
