"use client";

import DeadPiece from "@/Components/Shared/DeadPiece";
import { useSelector } from "react-redux";
import s from "./Bar.module.scss";

const Bar = () => {
  const { boardArea } = useSelector((s) => s.game);
  const { black, white } = boardArea[0].deadPieces;

  return (
    <div className={s.bar}>
      <DeadPiece pieceColor="white" pieces={white} position="top" />
      <DeadPiece pieceColor="black" pieces={black} position="bottom" />
    </div>
  );
};

export default Bar;
