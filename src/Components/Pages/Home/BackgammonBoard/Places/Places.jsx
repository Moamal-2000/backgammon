"use client";

import { getPlaceData } from "@/Functions/movement";
import { playSound } from "@/Functions/sound";
import { areAllPiecesInHome, canSelect } from "@/Functions/validation";
import {
  movePiece,
  selectPiece,
  updateGameState,
} from "@/Redux/slices/gameSlice";
import u from "@/Styles/utilsClasses.module.scss";
import { useDispatch, useSelector } from "react-redux";
import HighlightPlace from "./HighlightPlace/HighlightPlace";
import Pieces from "./Pieces/Pieces";
import s from "./Places.module.scss";

const Places = ({ placesData }) => {
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
      playSound("select");
      dispatch(updateGameState({ key: "selectedPlace", value: null }));
      return;
    }

    if (isCurrentMoveValid) {
      playSound("select");
      dispatch(movePiece({ placeData: fromPlaceData.place, shouldEat, moves }));
      return;
    }

    if (canSelectPiece) {
      playSound("select");
      dispatch(selectPiece({ placeData: fromPlaceData.place }));
    }
  }

  return placesData.map((data) => {
    const selectedAvailableMoves = boardArea[data.place]?.availableMoves;
    const hasAvailableMove = selectedAvailableMoves?.length > 0;
    const isPlaceSelected = selectedPlace === data.place;
    const isPlaceSelectable = canSelect({
      fromPlaceData: data,
      allPiecesInInnerHome: areAllPiecesInHome(boardArea, playerTurn),
      isDiceThrew,
      hasAvailableMove,
      playerTurn,
      boardArea,
    });

    const selectedClass = isPlaceSelected ? s.selected : "";
    const hasMoveClass = isPlaceSelectable ? s.hasMove : "";
    const unavailableClass = !hasAvailableMove ? u.unavailable : "";

    const classes = `${s.place} ${
      s[data.placeColor]
    } ${unavailableClass} ${hasMoveClass} ${selectedClass}`;

    return (
      <div
        className={classes}
        key={data.place}
        onClick={() => handlePlaceClick(data)}
      >
        <Pieces data={data} unavailableClass={unavailableClass} />

        <HighlightPlace
          data={data}
          boardArea={boardArea}
          selectedPlace={selectedPlace}
        />
      </div>
    );
  });
};

export default Places;
