"use client";

import { updateGameState } from "@/redux/slices/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import s from "./GameButtons.module.scss";

const GameButtons = () => {
  const { gameStart } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  function startTheGame() {
    dispatch(updateGameState({ key: "gameStart", value: true }));
  }

  function restartGame() {
    const shouldRestart = confirm("Are you sure you want to restart the game?");
  }

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
    </div>
  );
};

export default GameButtons;
