"use client";

import { getPlaceData } from "@/Functions/helper";
import {
  checkWinner,
  movePiece,
  outPiece,
  selectPiece,
  updateGameState,
} from "@/Redux/slices/gameSlice";
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
      dispatch(checkWinner())
      return;
    }

    if (unSelectPlace) {
      dispatch(updateGameState({ key: "selectedPlace", value: null }));
      return;
    }

    if (isCurrentMoveValid) {
      dispatch(movePiece({ placeData: fromPlaceData.place, shouldEat, moves }));
      return;
    }

    if (canSelectPiece) {
      dispatch(selectPiece({ placeData: fromPlaceData.place }));
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
