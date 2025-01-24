"use client";

import {
  canMoveToPlace,
  getDiceNumbers,
  getPiecesData,
} from "@/Functions/helper";
import { updateGameState } from "@/Redux/slices/gameSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./BackgammonBoard.module.scss";
import Bar from "./Bar/Bar";
import Dice from "./Dice/Dice";
import PlacesWithPieces from "./PlacesWithPieces/PlacesWithPieces";

const BackgammonBoard = () => {
  const {
    boardArea,
    gameStart,
    showBeginDices,
    diceMoves,
    beginDice,
    playerTurn,
    isDiceThrew,
    isBoardDataUpdated,
  } = useSelector((s) => s.game);
  const dispatch = useDispatch();
  const pieces = getPiecesData(boardArea);
  const shouldShowBeginDices = gameStart && showBeginDices;
  const showGameDices = gameStart && !showBeginDices && diceMoves.length !== 0;

  useEffect(() => {
    if (!gameStart) return;

    const { firstDice, secondDice } = getDiceNumbers(true);
    const wonPlayer = firstDice > secondDice ? "white" : "black";

    dispatch(updateGameState({ key: "playerTurn", value: wonPlayer }));
    dispatch(
      updateGameState({ key: "beginDice", value: [firstDice, secondDice] })
    );
  }, [gameStart]);

  useEffect(() => {
    if (isBoardDataUpdated) return;

    const noMoreMoves = diceMoves.length === 0;
    const updatedBoardArea = boardArea.map((point) => ({ ...point }));
    const availablePieces = updatedBoardArea.filter(
      (point) => playerTurn === point.pieces?.[0]
    );

    if (noMoreMoves)
      updatedBoardArea.map((point) => (point.availableMoves = []));

    for (let i = 0; i < availablePieces.length; i++) {
      const availableMoves = [];

      for (let j = 0; j < diceMoves.length; j++) {
        const availableMove = getAvailableMove({
          diceMove: diceMoves[j],
          availablePlace: availablePieces[i].place,
          playerTurn,
        });

        const availablePlace = updatedBoardArea[availableMove - 1];
        const validPlace = canMoveToPlace({
          toPlaceData: availablePlace,
          playerTurn,
        });

        if (validPlace) availableMoves.push(availableMove);
      }

      availablePieces[i].availableMoves = availableMoves;
    }

    availablePieces.forEach((pieceData) => {
      const index = pieceData.place;
      updatedBoardArea[index] = pieceData;
    });

    dispatch(updateGameState({ key: "boardArea", value: updatedBoardArea }));
    dispatch(updateGameState({ key: "isBoardDataUpdated", value: true }));
  }, [boardArea, isDiceThrew, isBoardDataUpdated]);

  return (
    <div className={s.board}>
      <div className={s.leftTable}>
        <div className={`${s.top} ${s.reverse}`}>
          <PlacesWithPieces placesData={pieces.leftTop} />
        </div>

        <div className={s.bottom}>
          <PlacesWithPieces placesData={pieces.leftBottom} />
        </div>

        <Dice
          shouldShowBeginDices={shouldShowBeginDices}
          showGameDices={showGameDices}
          beginDiceNumber={beginDice[0]}
        />
      </div>

      <Bar />

      <div className={s.rightTable}>
        <div className={`${s.top} ${s.reverse}`}>
          <PlacesWithPieces placesData={pieces.rightTop} />
        </div>

        <div className={s.bottom}>
          <PlacesWithPieces placesData={pieces.rightBottom} />
        </div>

        <Dice
          shouldShowBeginDices={shouldShowBeginDices}
          showGameDices={showGameDices}
          beginDiceNumber={beginDice[1]}
          color="black"
        />
      </div>
    </div>
  );
};

export default BackgammonBoard;

function getAvailableMove({ diceMove, availablePlace, playerTurn }) {
  const isWhitePlayer = playerTurn === "white";
  return isWhitePlayer ? availablePlace - diceMove : diceMove + availablePlace;
}
