"use client";

import { getPlaceData, getRestMoves, isValidMove } from "@/functions/helper";
import { movePiece, updateGameState } from "@/redux/slices/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import Pieces from "./Pieces/Pieces";
import s from "./PlacesWithPieces.module.scss";

const PlacesWithPieces = ({ placesData }) => {
  const {
    playerTurn,
    selectedPlace,
    boardArea,
    gameStart,
    diceMoves,
    isDiceThrew,
  } = useSelector((s) => s.game);
  const dispatch = useDispatch();

  function handlePlaceClick(fromPlaceData) {
    if (!gameStart) return;

    const {
      toPlaceData,
      moves,
      placeHasPieces,
      isPlayerPiece,
      unSelectPlace,
      isSamePieceColor,
      shouldEat,
    } = getPlaceData({
      fromPlaceData,
      boardArea,
      selectedPlace,
      playerTurn,
    });

    const isCurrentMoveValid = isValidMove({
      fromPlaceData,
      toPlaceData,
      isDiceThrew,
      playerTurn,
      selectedPlace,
      diceMoves,
      isSamePieceColor,
      moves,
    });

    if (unSelectPlace) {
      dispatch(updateGameState({ key: "selectedPlace", value: null }));
      return;
    }

    if (isCurrentMoveValid) {
      const restDiceMoves = getRestMoves(diceMoves, moves);

      dispatch(
        movePiece({
          from: selectedPlace,
          dataPlace: fromPlaceData.place,
          playerTurn: playerTurn,
          shouldEat,
          restDiceMoves,
        })
      );
      dispatch(updateGameState({ key: "diceMoves", value: restDiceMoves }));

      return;
    }

    if (placeHasPieces && isPlayerPiece)
      dispatch(
        updateGameState({ key: "selectedPlace", value: fromPlaceData.place })
      );
  }

  return placesData.map((data) => (
    <div
      className={`${s.place} ${s[data.placeColor]}`}
      key={data.place}
      onClick={() => handlePlaceClick(data)}
    >
      <Pieces data={data} />
    </div>
  ));
};

export default PlacesWithPieces;
