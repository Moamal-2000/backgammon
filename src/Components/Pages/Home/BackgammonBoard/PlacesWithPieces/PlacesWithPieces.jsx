"use client";

import { getPlaceData } from "@/Functions/helper";
import {
  movePiece,
  selectPiece,
  updateGameState,
} from "@/Redux/slices/gameSlice";
import u from "@/Styles/utilsClasses.module.scss";
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
    const selectedAvailableMoves = boardArea[data.place]?.availableMoves;
    const hasAvailableMove = selectedAvailableMoves?.length > 0;
    const unavailableClass = !hasAvailableMove ? u.unavailable : "";

    return (
      <div
        className={`${s.place} ${s[data.placeColor]} ${unavailableClass}`}
        key={data.place}
        onClick={() => handlePlaceClick(data)}
      >
        <Pieces data={data} unavailableClass={unavailableClass} />

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
