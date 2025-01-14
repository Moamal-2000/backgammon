"use client";

import { movePiece, updateGameState } from "@/redux/slices/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import Pieces from "./Pieces/Pieces";
import s from "./PlacesWithPieces.module.scss";

const PlacesWithPieces = ({ placesData }) => {
  const { playerTurn, selectedPlace, boardArea, gameStart } = useSelector(
    (s) => s.game
  );
  const dispatch = useDispatch();

  function handlePlaceClick(data) {
    if (!gameStart) return;
    const placeHasPieces = data.pieces.length > 0;
    const isPlayerPiece = playerTurn === data.pieces?.[0];
    const unSelectPlace = data.place === selectedPlace;
    const toPlaceData = boardArea.find((item) => item.place === data.place);
    const hasMoreThanPieceExist = toPlaceData.pieces.length > 1;
    const isSamePieceColor = toPlaceData.pieces?.[0] === playerTurn;
    const isEmptyPlace = toPlaceData.pieces.length === 0;
    const shouldEat = !isSamePieceColor && toPlaceData.pieces.length === 1;

    const isBlackMoveForward =
      selectedPlace < data.place && playerTurn === "black";
    const isWhiteMoveForward =
      selectedPlace > data.place && playerTurn === "white";

    const isValidMove =
      (!hasMoreThanPieceExist || isSamePieceColor || isEmptyPlace) &&
      isBlackMoveForward | isWhiteMoveForward;

    if (unSelectPlace) {
      dispatch(updateGameState({ key: "selectedPlace", value: null }));
      return;
    }

    if (selectedPlace && isValidMove) {
      dispatch(
        movePiece({
          from: selectedPlace,
          dataPlace: data.place,
          playerTurn: playerTurn,
          shouldEat,
        })
      );
      return;
    }

    if (placeHasPieces && isPlayerPiece)
      dispatch(updateGameState({ key: "selectedPlace", value: data.place }));
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
