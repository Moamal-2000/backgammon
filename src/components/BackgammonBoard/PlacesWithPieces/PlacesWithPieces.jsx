"use client";

import { updateGameState } from "@/redux/slices/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import Pieces from "./Pieces/Pieces";
import s from "./PlacesWithPieces.module.scss";

const PlacesWithPieces = ({ placesData }) => {
  const { playerTurn } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  function handlePlaceClick(event, data, type) {
    const placeHasPieces = data.pieces.length;
    const isPlayerPiece = playerTurn === data.pieces?.[0];

    if (placeHasPieces && isPlayerPiece)
      dispatch(updateGameState({ key: "selectPlace", value: data.place }));
  }

  return placesData.map((data) => (
    <div
      className={`${s.place} ${s[data.placeColor]}`}
      key={data.place}
      onClick={(event) => handlePlaceClick(event, data, "place")}
    >
      <Pieces data={data} />
    </div>
  ));
};

export default PlacesWithPieces;
