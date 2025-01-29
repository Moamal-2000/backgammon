"use client";

import { updateGameState } from "@/Redux/slices/gameSlice";
import u from "@/Styles/utilsClasses.module.scss";
import { useDispatch, useSelector } from "react-redux";

const DeadPiece = ({ color, pieces, position }) => {
  const opponent = color === "black" ? "white" : "black";
  const style = { color: opponent, [position]: "180px" };

  const { playerTurn, selectedPlace, boardArea, deadPieceColor, isDiceThrew } =
    useSelector((s) => s.game);
  const fromPlaceData = boardArea[0];
  const isSelectDeadPiece = selectedPlace === fromPlaceData.place;
  const isSameColor = color === deadPieceColor;
  const selectClass = isSelectDeadPiece && isSameColor ? u.select : "";
  const dispatch = useDispatch();

  function handlePieceClick() {
    if (playerTurn !== color || !isDiceThrew) return;

    dispatch(
      updateGameState({
        key: "selectedPlace",
        value: isSelectDeadPiece ? null : fromPlaceData.place,
      })
    );

    dispatch(updateGameState({ key: "isBoardDataUpdated", value: false }));

    dispatch(
      updateGameState({
        key: "deadPieceColor",
        value: isSelectDeadPiece ? null : color,
      })
    );
  }

  return (
    pieces.length > 0 && (
      <div
        className={`${u.piece} ${u[color]} ${selectClass}`}
        style={style}
        onClick={handlePieceClick}
      >
        {pieces.length > 1 && pieces.length}
      </div>
    )
  );
};

export default DeadPiece;
