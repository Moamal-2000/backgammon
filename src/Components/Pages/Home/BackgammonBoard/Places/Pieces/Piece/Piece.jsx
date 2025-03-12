"use client";

import { shouldDragPiece } from "@/Functions/validation";
import u from "@/Styles/utilsClasses.module.scss";
import { useSelector } from "react-redux";

const Piece = ({
  data,
  piece,
  isLastPiece,
  unavailableClass,
  lastStackName,
  stackName,
}) => {
  const { selectedPlace, gameStart, playerTurn, boardArea } = useSelector(
    (s) => s.game
  );

  const isAtLastStack = stackName === lastStackName;
  const selectClass = data.place === selectedPlace ? u.select : "";
  const classes = `${u.piece} ${u[piece]} ${unavailableClass} ${
    isLastPiece && isAtLastStack ? selectClass : ""
  }`;

  function handleDragStart(e) {
    const shouldDrag = shouldDragPiece({
      data,
      gameStart,
      playerTurn,
      piece,
      boardArea,
      pieceType: "normal",
    });

    if (!shouldDrag) {
      e.preventDefault();
      return false;
    }

    e.dataTransfer.setData("text/plain", JSON.stringify(data));
  }

  return (
    <div
      className={classes}
      draggable={true}
      onDragStart={handleDragStart}
      data-type="piece"
    />
  );
};

export default Piece;
