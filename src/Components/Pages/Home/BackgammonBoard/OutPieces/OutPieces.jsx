"use client";

import { useSelector } from "react-redux";
import s from "./OutPieces.module.scss";

const OutPieces = () => {
  const { outPieces } = useSelector((s) => s.game);

  return (
    <div className={s.outPieces}>
      <div className={s.piecesArea}>
        {outPieces.black.map((_, index) => (
          <div
            className={`${s.piece} ${s.black}`}
            data-sort={outPieces.black.length - index}
            key={index}
          />
        ))}
      </div>

      <div className={s.piecesArea}>
        {outPieces.white.map((_, index) => (
          <div
            className={`${s.piece} ${s.white}`}
            data-sort={outPieces.white.length - index}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default OutPieces;
