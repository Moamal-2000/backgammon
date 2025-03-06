"use client";

import { playSound } from "@/Functions/sound";
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
  const { gameStart, winnerPlayer, validDiceNumbers, isDiceThrew } =
    useSelector((s) => s.game);
  const dispatch = useDispatch();

  function handleStartGame() {
    playSound("click");
    dispatch(startTheGame());
  }

  function handleThrowDice() {
    playSound("roll-dice");
    dispatch(throwDices({ numberOfDices: 2 }));
  }

  function restartGame(showAlert = true) {
    let shouldRestart;

    if (showAlert)
      shouldRestart = confirm("Are you sure you want to restart the game?");

    if (shouldRestart || !showAlert) {
      dispatch(resetGameState());
      setTimeout(() => dispatch(startTheGame()), 0);
    }
  }

  useEffect(() => {
    if (winnerPlayer) showWinnerMessage(winnerPlayer, restartGame);
  }, [winnerPlayer]);

  useEffect(() => {
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

      <button
        className={s.throwButton}
        type="button"
        onClick={handleThrowDice}
        disabled={isDiceThrew || !gameStart}
      >
        Throw dice
      </button>
    </div>
  );
};

export default GameButtons;

function showWinnerMessage(winnerPlayer, restartGameFun) {
  setTimeout(() => {
    const playAgain = confirm(
      `Congratulation! ${winnerPlayer} player is the winner, Do you want to play again?`
    );

    if (playAgain) restartGameFun(false);
  }, 500);
}
