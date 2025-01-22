"use client";

import { playersHomeSide } from "@/Data/constants";
import {
  areAllPiecesInInnerHome,
  getPlaceData,
  getRestMoves,
  isValidMove,
} from "@/Functions/helper";
import { movePiece, outPiece, updateGameState } from "@/Redux/slices/gameSlice";
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
    deadPieceColor,
  } = useSelector((s) => s.game);
  const dispatch = useDispatch();

  function handlePlaceClick(fromPlaceData) {
    if (!gameStart) return;

    const {
      toPlaceData,
      moves,
      unSelectPlace,
      isSamePieceColor,
      shouldEat,
      canSelectPiece,
    } = getPlaceData({
      fromPlaceData,
      boardArea,
      selectedPlace,
      playerTurn,
      deadPieceColor,
      isDiceThrew,
    });

    const playerDeadPieces = boardArea[0].deadPieces[playerTurn];
    const playerHasDeadPieces = playerDeadPieces.length !== 0;
    const shouldOutPiece = areAllPiecesInInnerHome(boardArea, playerTurn);
    const isAllDiceMovesUsed = diceMoves.length === 0;

    if (shouldOutPiece && !playerHasDeadPieces && !isAllDiceMovesUsed) {
      const numberOfSelectedPiece =
        playersHomeSide[playerTurn].indexOf(fromPlaceData.place) + 1;
      const restDiceMoves = getRestMoves(diceMoves, numberOfSelectedPiece);

      dispatch(
        outPiece({
          from: fromPlaceData,
          playerTurn,
          restDiceMoves,
        })
      );

      return;
    }

    const isCurrentMoveValid = isValidMove({
      fromPlaceData,
      toPlaceData,
      isDiceThrew,
      playerTurn,
      selectedPlace,
      diceMoves,
      isSamePieceColor,
      moves,
      deadPieceColor,
    });

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
