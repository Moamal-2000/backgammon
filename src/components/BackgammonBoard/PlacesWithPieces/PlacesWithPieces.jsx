"use client";

import { movePiece, updateGameState } from "@/redux/slices/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import Pieces from "./Pieces/Pieces";
import s from "./PlacesWithPieces.module.scss";

const PlacesWithPieces = ({ placesData }) => {
  const { playerTurn, selectPlace, boardArea } = useSelector(
    (state) => state.game
  );
  const dispatch = useDispatch();

  function handlePlaceClick(data) {
    const placeHasPieces = data.pieces.length > 0;
    const isPlayerPiece = playerTurn === data.pieces?.[0];
    const unSelectPlace = data.place === selectPlace;

    if (unSelectPlace) {
      dispatch(updateGameState({ key: "selectPlace", value: null }));
      return;
    }

    if (selectPlace) {
      dispatch(
        movePiece({
          from: selectPlace,
          dataPlace: data.place,
          playerTurn: playerTurn,
        })
      );
      return;
    }

    if (placeHasPieces && isPlayerPiece) {
      dispatch(updateGameState({ key: "selectPlace", value: data.place }));
    }

    if (placeHasPieces && isPlayerPiece) {
      dispatch(updateGameState({ key: "selectPlace", value: data.place }));
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
