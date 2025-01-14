"use client";

import { getDiceNumbers } from "@/functions/helper";
import { updateGameState } from "@/redux/slices/gameSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./BackgammonBoard.module.scss";
import Dice from "./Dice/Dice";
import PlacesWithPieces from "./PlacesWithPieces/PlacesWithPieces";

const BackgammonBoard = () => {
  const { boardArea, gameStart, showBeginDices } = useSelector(
    (state) => state.game
  );
  const dispatch = useDispatch();
  const pieces = getPiecesData(boardArea);
  const { firstDice, secondDice } = getDiceNumbers(true);
  const shouldShowBeginDices = gameStart && showBeginDices;
  const showGameDices = gameStart && !showBeginDices;

  useEffect(() => {
    const wonPlayer = firstDice > secondDice ? "white" : "black";
    dispatch(updateGameState({ key: "playerTurn", value: wonPlayer }));
  }, []);

  return (
    <div className={s.board}>
      <div className={s.leftTable}>
        <div className={`${s.top} ${s.reverse}`}>
          <PlacesWithPieces placesData={pieces.leftTop} />
        </div>

        <div className={s.bottom}>
          <PlacesWithPieces placesData={pieces.leftBottom} />
        </div>

        <Dice
          shouldShowBeginDices={shouldShowBeginDices}
          showGameDices={showGameDices}
          diceNumber={firstDice}
        />
      </div>

      <div className={s.rightTable}>
        <div className={`${s.top} ${s.reverse}`}>
          <PlacesWithPieces placesData={pieces.rightTop} />
        </div>

        <div className={s.bottom}>
          <PlacesWithPieces placesData={pieces.rightBottom} />
        </div>

        <Dice
          shouldShowBeginDices={shouldShowBeginDices}
          showGameDices={showGameDices}
          diceNumber={secondDice}
          color="black"
        />
      </div>
    </div>
  );
};

export default BackgammonBoard;

function getPiecesData(boardArea) {
  return {
    rightBottom: boardArea.slice(0, 6).reverse(),
    leftBottom: boardArea.slice(6, 12).reverse(),
    leftTop: boardArea.slice(12, 18),
    rightTop: boardArea.slice(18, 24),
  };
}
