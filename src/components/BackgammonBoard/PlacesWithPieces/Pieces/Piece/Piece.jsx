"use client";

import { useSelector } from "react-redux";
import u from "../../utilsClasses.module.scss";

const Piece = ({ data, piece, isLastPiece }) => {
  const { selectedPlace } = useSelector((state) => state.game);
  const selectClass = data.place === selectedPlace ? u.select : "";

  return (
    <div
      className={`${u.piece} ${u[piece]} ${isLastPiece ? selectClass : ""}`}
    />
  );
};

export default Piece;
