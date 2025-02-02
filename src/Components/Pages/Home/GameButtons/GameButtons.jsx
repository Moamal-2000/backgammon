"use client";

import { boardArea } from "@/Data/staticData";
import {
  checkPlayableOrChangeTurn,
  resetGameState,
  throwDices,
  updateGameState,
} from "@/Redux/slices/gameSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./GameButtons.module.scss";

const GameButtons = () => {
  const { gameStart, isDiceThrew, winnerPlayer, validDiceNumbers } =
    useSelector((s) => s.game);
  const dispatch = useDispatch();

  function startTheGame() {
    dispatch(updateGameState({ key: "gameStart", value: true }));
    dispatch(updateGameState({ key: "showBeginDices", value: true }));
    dispatch(updateGameState({ key: "boardArea", value: boardArea }));
    dispatch(
      updateGameState({ key: "outPieces", value: { black: [], white: [] } })
    );

    setTimeout(() => {
      dispatch(updateGameState({ key: "showBeginDices", value: false }));
    }, 2000);
  }

  function restartGame(showAlert = true) {
    let shouldRestart;

    if (showAlert)
      shouldRestart = confirm("Are you sure you want to restart the game?");

    if (shouldRestart || !showAlert) {
      dispatch(resetGameState());
      setTimeout(startTheGame, 0);
    }
  }

  function handleThrowDice() {
    dispatch(throwDices({ numberOfDices: 2 }));
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
  }, [isDiceThrew, validDiceNumbers]);

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
