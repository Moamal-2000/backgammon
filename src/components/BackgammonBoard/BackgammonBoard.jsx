"use client";

import { useSelector } from "react-redux";
import s from "./BackgammonBoard.module.scss";

// "black": "⚫",
// "white": "⚪",
const BackgammonBoard = () => {
  const { boardArea } = useSelector((state) => state.game);
  const pieces = getPiecesData(boardArea);

  console.log(pieces);

  return (
    <div className={s.board}>
      <div className={s.leftTable}>
        <div className={`${s.top} ${s.reverse}`}>
          {pieces.leftTop.map((data) => (
            <div
              className={`${s.place} ${s[data.placeColor]}`}
              key={data.place}
            >
              {data.pieces.map((piece, index) => (
                <div className={`${s.piece} ${s[piece]}`} key={index} />
              ))}
            </div>
          ))}
        </div>

        <div className={s.bottom}>
          {pieces.leftBottom.map((data) => (
            <div
              className={`${s.place} ${s[data.placeColor]}`}
              key={data.place}
            >
              {data.pieces.map((piece, index) => (
                <div className={`${s.piece} ${s[piece]}`} key={index} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={s.rightTable}>
        <div className={`${s.top} ${s.reverse}`}>
          {pieces.rightTop.map((data) => (
            <div
              className={`${s.place} ${s[data.placeColor]}`}
              key={data.place}
            >
              {data.pieces.map((piece, index) => (
                <div className={`${s.piece} ${s[piece]}`} key={index} />
              ))}
            </div>
          ))}
        </div>

        <div className={s.bottom}>
          {pieces.rightBottom.map((data) => (
            <div
              className={`${s.place} ${s[data.placeColor]}`}
              key={data.place}
            >
              {data.pieces.map((piece, index) => (
                <div className={`${s.piece} ${s[piece]}`} key={index} />
              ))}
            </div>
          ))}
        </div>
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
