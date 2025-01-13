"use client";

import { updateGameState } from "@/redux/slices/gameSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pieces from "./Pieces/Pieces";
import s from "./PlacesWithPieces.module.scss";
import u from "./utilsClasses.module.scss";

const PlacesWithPieces = ({ placesData }) => {
  const { playerTurn } = useSelector((state) => state.game);
  const [isSelectPiece, setIsSelectPiece] = useState(false);
  const dispatch = useDispatch();
  const selectClass = isSelectPiece ? u.select : "";

  function handlePlaceClick(event, data, type) {
    const placeHasPieces = data.pieces.length;
    const isPlayerPiece = playerTurn === data.pieces?.[0];

    if (placeHasPieces && isPlayerPiece)
      dispatch(updateGameState({ key: "selectPlace", value: data.place }));

    // setIsSelectPiece((prevBoolean) => !prevBoolean);
  }

  return placesData.map((data) => (
    <div
      className={`${s.place} ${s[data.placeColor]}`}
      key={data.place}
      onClick={(event) => handlePlaceClick(event, data, "place")}
    >
      <Pieces data={data} selectClass={selectClass} />
    </div>
  ));
};

export default PlacesWithPieces;
