"use client";

import { selectDeadPiece } from "@/Redux/slices/gameSlice";
import u from "@/Styles/utilsClasses.module.scss";
import { useDispatch, useSelector } from "react-redux";

const DeadPiece = ({ pieceColor, pieces, position }) => {
  const opponent = pieceColor === "black" ? "white" : "black";
  const style = { color: opponent, [position]: "180px" };

  const { boardArea, deadPieceColor, selectedPlace } = useSelector(
    (s) => s.game
  );
  const fromPlaceData = boardArea[0];
  const isSameColor = pieceColor === deadPieceColor;
  const selectedAvailableMoves = boardArea[fromPlaceData.place]?.availableMoves;
  const hasAvailableMove = selectedAvailableMoves?.length > 0;
  const isSelectDeadPiece = selectedPlace === fromPlaceData.place;

  const unavailableClass = !hasAvailableMove ? u.unavailable : "";
  const dispatch = useDispatch();

  function handlePieceClick() {
    dispatch(selectDeadPiece({ pieceColor }));
  }

  return (
    <div className={`${u.deadPieces} ${u[pieceColor]}`}>
      {pieces?.map((piece, index) => {
        const isLastPiece = index + 1 === pieces.length;
        const selectClass =
          isSelectDeadPiece && isLastPiece && isSameColor && hasAvailableMove
            ? u.select
            : "";

        return (
          <div
            className={`${u.piece} ${u[piece]} ${selectClass} ${unavailableClass}`}
            style={style}
            key={`${piece}-${index}`}
            onClick={handlePieceClick}
          />
        );
      })}
    </div>
  );
};

export default DeadPiece;
