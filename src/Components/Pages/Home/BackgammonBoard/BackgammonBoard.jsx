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
    const wonPlayer = firstDice > secondDice ? "white" : "black";

    dispatch(updateGameState({ key: "playerTurn", value: wonPlayer }));
    dispatch(
      updateGameState({ key: "beginDice", value: [firstDice, secondDice] })
    );
  }, [gameStart]);

  useEffect(() => {
    const shouldOutPiece = areAllPiecesInInnerHome(boardArea, playerTurn);
    if (shouldOutPiece) {
      dispatch(
        updateGameState({ key: "validDiceNumbers", value: [1, 2, 3, 4, 5, 6] })
      );
      return;
    }

    const updatedBoardArea = calcAvailablePlaces({
      boardArea,
      diceMoves,
      playerTurn,
    });

    const playerPieces = updatedBoardArea.filter(
      (point) => point.pieces?.[0] === playerTurn
    );
    const availableMoves = playerPieces.map((point) => point.availableMoves);
    const allAvailableMoves = availableMoves.reduce(
      (acc, curr) => [...acc, ...curr],
      []
    );
    const validDiceNumbers = allAvailableMoves.map((availableMove) => {
      const validPoint = playerPieces.find((point) =>
        point.availableMoves.includes(availableMove)
      );

      return diceMoves.map((diceMove) => {
        const expectedDiceMove =
          Math.abs(validPoint?.place - availableMove) === diceMove;
        if (expectedDiceMove) return diceMove;
      });
    });

    const allValidDiceNumbers = validDiceNumbers.flat(1);

    const validDiceNumbersWithoutRepeat = [
      ...new Set(allValidDiceNumbers),
    ].filter((diceNumber) => diceNumber);

    dispatch(
      updateGameState({
        key: "validDiceNumbers",
        value: validDiceNumbersWithoutRepeat,
      })
    );

    if (isBoardDataUpdated || shouldOutPiece) return;

    dispatch(updateGameState({ key: "boardArea", value: updatedBoardArea }));
    dispatch(updateGameState({ key: "isBoardDataUpdated", value: true }));
  }, [boardArea, isDiceThrew, isBoardDataUpdated]);

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
