"use client";

import { getPlaceData, getRestMoves } from "@/Functions/helper";
import { movePiece, outPiece, updateGameState } from "@/Redux/slices/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import HighlightPlace from "./HighlightPlace/HighlightPlace";
import Pieces from "./Pieces/Pieces";
import PlaceNumber from "./PlaceNumber/PlaceNumber";
import s from "./PlacesWithPieces.module.scss";

const PlacesWithPieces = ({ placesData, placesSide }) => {
  const {
    playerTurn,
    selectedPlace,
    boardArea,
    gameStart,
    diceMoves,
    isDiceThrew,
    deadPieceColor,
  } = useSelector((s) => s.game);
  const dispatch = useDispatch();

  function handlePlaceClick(fromPlaceData) {
    if (!gameStart) return;

    const {
      moves,
      unSelectPlace,
      shouldEat,
      canSelectPiece,
      restDiceMoves,
      shouldOutPiece,
      isCurrentMoveValid,
    } = getPlaceData({
      fromPlaceData,
      boardArea,
      selectedPlace,
      playerTurn,
      deadPieceColor,
      isDiceThrew,
      diceMoves,
      deadPieceColor,
    });

    if (shouldOutPiece) {
      dispatch(outPiece({ from: fromPlaceData, playerTurn, restDiceMoves }));
      return;
    }

    if (unSelectPlace) {
      dispatch(updateGameState({ key: "selectedPlace", value: null }));
      return;
    }

    if (isCurrentMoveValid) {
      const whiteOrBlackMoves = deadPieceColor === "white" ? 25 - moves : moves;
      const restDiceMoves = getRestMoves(diceMoves, whiteOrBlackMoves);

      dispatch(
        movePiece({
          from: selectedPlace,
          dataPlace: fromPlaceData.place,
          playerTurn: playerTurn,
          shouldEat,
          restDiceMoves,
          deadPieceColor,
        })
      );
      return;
    }

    if (canSelectPiece) {
      dispatch(
        updateGameState({ key: "selectedPlace", value: fromPlaceData.place })
      );

      dispatch(updateGameState({ key: "deadPieceColor", value: null }));
    }
  }

  return placesData.map((data) => {
    return (
      <div
        className={`${s.place} ${s[data.placeColor]}`}
        key={data.place}
        onClick={() => handlePlaceClick(data)}
      >
        <Pieces data={data} />

        <HighlightPlace
          data={data}
          boardArea={boardArea}
          selectedPlace={selectedPlace}
        />

        <PlaceNumber
          data={data}
          boardArea={boardArea}
          selectedPlace={selectedPlace}
          placesSide={placesSide}
        />
      </div>
    );
  });
};

export default PlacesWithPieces;
