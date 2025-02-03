"use client";

import {
  checkPlayableOrChangeTurn,
  resetGameState,
  startTheGame,
  throwDices,
} from "@/Redux/slices/gameSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./GameButtons.module.scss";

const GameButtons = () => {
  const { gameStart, isDiceThrew, winnerPlayer, validDiceNumbers } =
    useSelector((s) => s.game);
  const dispatch = useDispatch();

  function handleStartGame() {
    dispatch(startTheGame());
  }

  function handleThrowDice() {
    dispatch(throwDices({ numberOfDices: 2 }));
  }

  function restartGame(showAlert = true) {
    let shouldRestart;

    if (showAlert)
      shouldRestart = confirm("Are you sure you want to restart the game?");

    if (shouldRestart || !showAlert) {
      dispatch(resetGameState());
      setTimeout(handleStartGame, 0);
    }
  }

  useEffect(() => {
    if (!winnerPlayer) return;

    setTimeout(() => {
      const playAgain = confirm(
        `Congratulation! ${winnerPlayer} player is the winner, Do you want to play again?`
      );

      if (playAgain) restartGame(false);
    }, 500);
  }, [winnerPlayer]);

  useEffect(() => {
    if (!isDiceThrew || !gameStart) return;
    dispatch(checkPlayableOrChangeTurn());
  }, [validDiceNumbers]);

  return (
    <div className={s.buttons}>
      <button
        className={s.startButton}
        type="button"
        onClick={handleStartGame}
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
