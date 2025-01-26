"use client";

import {
  areAllPiecesInInnerHome,
  calcAvailablePlaces,
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
    // const wonPlayer = firstDice > secondDice ? "white" : "black";
    const wonPlayer = "black";

    dispatch(updateGameState({ key: "playerTurn", value: wonPlayer }));
    dispatch(
      updateGameState({ key: "beginDice", value: [firstDice, secondDice] })
    );
  }, [gameStart]);

  useEffect(() => {
    const shouldOutPiece = areAllPiecesInInnerHome(boardArea, playerTurn);
    if (isBoardDataUpdated || shouldOutPiece) return;

    const updatedBoardArea = calcAvailablePlaces({
      boardArea,
      diceMoves,
      playerTurn,
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
