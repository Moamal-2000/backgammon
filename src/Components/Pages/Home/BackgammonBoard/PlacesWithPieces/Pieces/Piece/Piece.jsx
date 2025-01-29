"use client";

import u from "@/Styles/utilsClasses.module.scss";
import { useSelector } from "react-redux";

const Piece = ({ data, piece, isLastPiece }) => {
  const { selectedPlace } = useSelector((s) => s.game);
  const selectClass = data.place === selectedPlace ? u.select : "";

  return (
    <div
      className={`${u.piece} ${u[piece]} ${isLastPiece ? selectClass : ""}`}
    />
  );
};

export default Piece;
