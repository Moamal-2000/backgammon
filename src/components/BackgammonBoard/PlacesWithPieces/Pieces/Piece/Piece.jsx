"use client";

import { useSelector } from "react-redux";
import u from "../../utilsClasses.module.scss";

const Piece = ({ data, piece, isLastPiece }) => {
  const { selectPlace } = useSelector((state) => state.game);
  const selectClass = data.place === selectPlace ? u.select : "";

  function handlePieceClick(event, data, type) {
    // console.log(event);
    // setIsSelectPiece((prevBoolean) => !prevBoolean);
  }

  return (
    <div
      className={`${u.piece} ${u[piece]} ${isLastPiece ? selectClass : ""}`}
      onClick={(event) => handlePieceClick(event, data, "piece")}
    />
  );
};

export default Piece;
