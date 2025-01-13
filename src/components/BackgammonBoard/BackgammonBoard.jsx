"use client";

import { getDiceNumbers } from "@/functions/helper";
import { useSelector } from "react-redux";
import s from "./BackgammonBoard.module.scss";
import PlacesWithPieces from "./PlacesWithPieces/PlacesWithPieces";

const BackgammonBoard = () => {
  const { boardArea, gameStart, showBeginDices } = useSelector(
    (state) => state.game
  );
  const pieces = getPiecesData(boardArea);
  const { firstDice, secondDice } = getDiceNumbers(true);
  const shouldShowBeginDices = gameStart && showBeginDices;
  const showGameDices = gameStart && !showBeginDices;

  return (
    <div className={s.board}>
      <div className={s.leftTable}>
        <div className={`${s.top} ${s.reverse}`}>
          <PlacesWithPieces placesData={pieces.leftTop} />
        </div>

        <div className={s.bottom}>
          <PlacesWithPieces placesData={pieces.leftBottom} />
        </div>

        {shouldShowBeginDices && <p className={s.dice}>{firstDice}</p>}
        {showGameDices && <p className={s.dice}>{firstDice}</p>}
      </div>

      <div className={s.rightTable}>
        <div className={`${s.top} ${s.reverse}`}>
          <PlacesWithPieces placesData={pieces.rightTop} />
        </div>

        <div className={s.bottom}>
          <PlacesWithPieces placesData={pieces.rightBottom} />
        </div>

        {shouldShowBeginDices && (
          <p className={`${s.dice} ${s.black}`}>{secondDice}</p>
        )}
        {showGameDices && (
          <p className={`${s.dice} ${s.black}`}>{secondDice}</p>
        )}
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
