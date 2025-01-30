"use client";

import { useSelector } from "react-redux";
import s from "./OutPieces.module.scss";
import OutPlayerPiecesArea from "./OutPlayerPiecesArea/OutPlayerPiecesArea";

const OutPieces = () => {
  const { outPieces } = useSelector((s) => s.game);

  return (
    <div className={s.outPieces}>
      <OutPlayerPiecesArea pieces={outPieces.black} piecesColor="black" />
      <OutPlayerPiecesArea pieces={outPieces.white} piecesColor="white" />
    </div>
  );
};

export default OutPieces;
