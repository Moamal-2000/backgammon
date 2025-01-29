"use client";

import { useSelector } from "react-redux";
import u from "@/Styles/utilsClasses.module.scss";

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
