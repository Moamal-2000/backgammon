"use client";

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
  const { selectedPlace } = useSelector((s) => s.game);

  const isAtLastStack = stackName === lastStackName;
  const selectClass = data.place === selectedPlace ? u.select : "";
  const classes = `${u.piece} ${u[piece]} ${unavailableClass} ${
    isLastPiece && isAtLastStack ? selectClass : ""
  }`;

  function handleDragStart(e) {
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
