"use client";

import { useSelector } from "react-redux";
import s from "./BackgammonBoard.module.scss";
import PlacesWithPieces from "./PlacesWithPieces/PlacesWithPieces";

const BackgammonBoard = () => {
  const { boardArea } = useSelector((state) => state.game);
  const pieces = getPiecesData(boardArea);

  return (
    <div className={s.board}>
      <div className={s.leftTable}>
        <div className={`${s.top} ${s.reverse}`}>
          <PlacesWithPieces placesData={pieces.leftTop} />
        </div>

        <div className={s.bottom}>
          <PlacesWithPieces placesData={pieces.leftBottom} />
        </div>

        <p className={s.dice}>6</p>
      </div>

      <div className={s.rightTable}>
        <div className={`${s.top} ${s.reverse}`}>
          <PlacesWithPieces placesData={pieces.rightTop} />
        </div>

        <div className={s.bottom}>
          <PlacesWithPieces placesData={pieces.rightBottom} />
        </div>

        <p className={`${s.dice} ${s.black}`}>6</p>
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

function getDiceNumbers() {
  const DICE_NUMBERS = 6;

  return {
    firstDice: calcRandomNumber(DICE_NUMBERS),
    secondDice: calcRandomNumber(DICE_NUMBERS),
  };
}

function calcRandomNumber(number) {
  return Math.floor(Math.random() * number + 1);
}
