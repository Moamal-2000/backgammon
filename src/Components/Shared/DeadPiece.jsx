"use client";

import { selectDeadPiece } from "@/Redux/slices/gameSlice";
import u from "@/Styles/utilsClasses.module.scss";
import { useDispatch, useSelector } from "react-redux";

const DeadPiece = ({ pieceColor, pieces, position }) => {
  const opponent = pieceColor === "black" ? "white" : "black";
  const style = { color: opponent, [position]: "180px" };

  const { selectedPlace, boardArea, deadPieceColor } = useSelector(
    (s) => s.game
  );
  const fromPlaceData = boardArea[0];
  const isSelectDeadPiece = selectedPlace === fromPlaceData.place;
  const isSameColor = pieceColor === deadPieceColor;
  const selectedAvailableMoves = boardArea[fromPlaceData.place]?.availableMoves;
  const hasAvailableMove = selectedAvailableMoves?.length > 0;
  const selectClass =
    isSelectDeadPiece && isSameColor && hasAvailableMove ? u.select : "";
  const unavailableClass = !hasAvailableMove ? u.unavailable : "";
  const dispatch = useDispatch();

  function handlePieceClick() {
    dispatch(selectDeadPiece({ pieceColor }));
  }

  return (
    pieces.length > 0 && (
      <div
        className={`${u.piece} ${u[pieceColor]} ${selectClass} ${unavailableClass}`}
        style={style}
        onClick={handlePieceClick}
      >
        {pieces.length > 1 && pieces.length}
      </div>
    )
  );
};

export default DeadPiece;
