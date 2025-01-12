"use client";

import s from "./BackgammonBoard.module.scss";

const BackgammonBoard = () => {
  return (
    <div className={s.board}>
      <div className={s.leftTable}></div>
      <div className={s.rightTable}></div>
    </div>
  );
};

export default BackgammonBoard;
