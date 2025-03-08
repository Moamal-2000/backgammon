"use client";

import { selectDeadPiece } from "@/Redux/slices/gameSlice";
import u from "@/Styles/utilsClasses.module.scss";
import { useDispatch, useSelector } from "react-redux";

const DeadPiece = ({ pieceColor, pieces, position }) => {
  const opponent = pieceColor === "black" ? "white" : "black";
  const style = { color: opponent, [position]: "180px" };

  const dispatch = useDispatch();
  const { boardArea, deadPieceColor, selectedPlace, playerTurn } = useSelector(
    (s) => s.game
  );

  const fromPlaceData = boardArea[0];
  const isSameColor = pieceColor === deadPieceColor;
  const selectedAvailableMoves = boardArea[fromPlaceData.place]?.availableMoves;
  const hasAvailableMove = selectedAvailableMoves?.length > 0;
  const hasSelectDeadPiece = selectedPlace === fromPlaceData.place;
  const isPlayerPiece = pieceColor === playerTurn;

  const unavailableClass =
    !hasAvailableMove || !isPlayerPiece ? u.unavailable : "";

  function handlePieceClick() {
    dispatch(selectDeadPiece({ pieceColor }));
  }

  return (
    <div className={`${u.deadPieces} ${u[pieceColor]}`}>
      {pieces?.map((piece, index) => {
        const isLastPiece = index + 1 === pieces.length;
        const selectClass =
          hasSelectDeadPiece && isLastPiece && isSameColor && hasAvailableMove
            ? u.select
            : "";

        return (
          <div
            className={`${u.piece} ${u[piece]} ${selectClass} ${unavailableClass}`}
            style={style}
            key={`${piece}-${index}`}
            onClick={handlePieceClick}
            data-type={`${pieceColor} dead piece`}
          />
        );
      })}
    </div>
  );
};

export default DeadPiece;
