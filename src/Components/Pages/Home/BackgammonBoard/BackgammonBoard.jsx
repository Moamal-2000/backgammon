"use client";

import {
  areAllPiecesInInnerHome,
  calcAvailablePlaces,
  getPiecesData,
} from "@/Functions/helper";
import {
  initializePlayerTurn,
  updateAvailableDices,
  updateGameState,
} from "@/Redux/slices/gameSlice";
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
    selectedPlace,
    deadPieceColor,
  } = useSelector((s) => s.game);
  const dispatch = useDispatch();
  const pieces = getPiecesData(boardArea);
  const shouldShowBeginDices = gameStart && showBeginDices;
  const showGameDices = gameStart && !showBeginDices && diceMoves.length !== 0;

  useEffect(() => {
    if (!gameStart) return;
    dispatch(initializePlayerTurn());
  }, [gameStart]);

  useEffect(() => {
    const shouldOutPiece = areAllPiecesInInnerHome(boardArea, playerTurn);
    const updatedBoardArea = calcAvailablePlaces({
      boardArea,
      diceMoves,
      playerTurn,
      deadPieceColor,
    });
    const isPlayerHasDeadPiece =
      playerTurn && updatedBoardArea[0].deadPieces[playerTurn].length > 0;

    if (shouldOutPiece && !isPlayerHasDeadPiece) {
      dispatch(
        updateGameState({ key: "validDiceNumbers", value: [1, 2, 3, 4, 5, 6] })
      );
      return;
    }

    dispatch(updateAvailableDices({ updatedBoardArea }));

    if (!isBoardDataUpdated && isPlayerHasDeadPiece) {
      dispatch(updateGameState({ key: "boardArea", value: updatedBoardArea }));
      dispatch(updateGameState({ key: "isBoardDataUpdated", value: true }));
      return;
    }

    if (isBoardDataUpdated || shouldOutPiece) return;

    dispatch(updateGameState({ key: "boardArea", value: updatedBoardArea }));
    dispatch(updateGameState({ key: "isBoardDataUpdated", value: true }));
  }, [boardArea, isDiceThrew, isBoardDataUpdated, selectedPlace]);

  return (
    <div className={s.board}>
      <div className={s.leftTable}>
        <div className={`${s.top} ${s.reverse}`}>
          <PlacesWithPieces placesData={pieces.leftTop} placesSide="top" />
        </div>

        <div className={s.bottom}>
          <PlacesWithPieces
            placesData={pieces.leftBottom}
            placesSide="bottom"
          />
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
          <PlacesWithPieces placesData={pieces.rightTop} placesSide="top" />
        </div>

        <div className={s.bottom}>
          <PlacesWithPieces
            placesData={pieces.rightBottom}
            placesSide="bottom"
          />
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
