"use client";

import { movePiece, updateGameState } from "@/redux/slices/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import Pieces from "./Pieces/Pieces";
import s from "./PlacesWithPieces.module.scss";

const PlacesWithPieces = ({ placesData }) => {
  const { playerTurn, selectedPlace, boardArea } = useSelector(
    (state) => state.game
  );
  const dispatch = useDispatch();

  function handlePlaceClick(data) {
    const placeHasPieces = data.pieces.length > 0;
    const isPlayerPiece = playerTurn === data.pieces?.[0];
    const unSelectPlace = data.place === selectedPlace;
    const toPlaceData = boardArea.find((item) => item.place === data.place);
    const hasMoreThanPieceExist = toPlaceData.pieces.length > 1;
    const isSamePieceColor = toPlaceData.pieces?.[0] === playerTurn;
    const isEmptyPlace = toPlaceData.pieces.length === 0;
    const isBlackMoveForward =
      selectedPlace < data.place && playerTurn === "black";
    const isValidMove =
      (!hasMoreThanPieceExist || isSamePieceColor || isEmptyPlace) &&
      isBlackMoveForward;

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
        })
      );
      return;
    }

    if (placeHasPieces && isPlayerPiece) {
      dispatch(updateGameState({ key: "selectedPlace", value: data.place }));
    }
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
