"use client";

import u from "@/Styles/utilsClasses.module.scss";
import { useSelector } from "react-redux";

const Piece = ({ data, piece, isLastPiece, unavailableClass, pieceOrder }) => {
  const { selectedPlace } = useSelector((s) => s.game);

  const selectClass = data.place === selectedPlace ? u.select : "";
  const classes = `${u.piece} ${u[piece]} ${unavailableClass} ${
    isLastPiece ? selectClass : ""
  }`;

  return <div className={classes} />;
};

export default Piece;
