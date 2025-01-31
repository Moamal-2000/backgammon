"use client";

import {
  resetGameState,
  throwDices,
  updateGameState,
} from "@/Redux/slices/gameSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./GameButtons.module.scss";

const GameButtons = () => {
  const { gameStart } = useSelector((s) => s.game);
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
    dispatch(throwDices({ numberOfDices: 2 }));
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
