"use client";

import { getPiecesData } from "@/Functions/board";
import { calcAvailablePlaces } from "@/Functions/movement";
import { getPlayerPieces } from "@/Functions/player";
import { areAllPiecesInHome } from "@/Functions/validation";
import {
  initializePlayerTurn,
  updateAvailableDices,
  updateBoardArea,
  updateGameState,
} from "@/Redux/slices/gameSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./BackgammonBoard.module.scss";
import Bar from "./Bar/Bar";
import Dice from "./Dice/Dice";
import Places from "./Places/Places";

const BackgammonBoard = () => {
  const {
    boardArea,
    gameStart,
    diceMoves,
    playerTurn,
    isDiceThrew,
    isBoardDataUpdated,
    selectedPlace,
  } = useSelector((s) => s.game);
  const dispatch = useDispatch();
  const pieces = getPiecesData(boardArea);
  const showGameDices = gameStart && diceMoves.length !== 0;

  useEffect(() => {
    if (!gameStart) return;
    dispatch(initializePlayerTurn());
  }, [gameStart]);

  useEffect(() => {
    const shouldOutPiece = areAllPiecesInHome(boardArea, playerTurn);
    const updatedBoardArea = calcAvailablePlaces({
      boardArea,
      diceMoves,
      playerTurn,
    });
    const isPlayerHasDeadPiece =
      playerTurn && updatedBoardArea[0].deadPieces[playerTurn].length > 0;

    if (shouldOutPiece && !isPlayerHasDeadPiece && !isBoardDataUpdated) {
      const availablePieces = getPlayerPieces({
        boardArea: updatedBoardArea,
        playerTurn,
      });

      const availablePlaces = availablePieces.map((point) => point.place);

      const validDiceNumbers = diceMoves.filter((diceMove) => {
        const outByPlaceNumber =
          playerTurn === "white" ? diceMove : 25 - diceMove;

        return availablePlaces.includes(outByPlaceNumber);
      });

      dispatch(
        updateGameState({ key: "validDiceNumbers", value: validDiceNumbers })
      );
      dispatch(updateBoardArea({ updatedBoardArea }));
      dispatch(updateAvailableDices({ updatedBoardArea }));
      return;
    }

    dispatch(updateAvailableDices({ updatedBoardArea }));

    if (!isBoardDataUpdated && isPlayerHasDeadPiece) {
      dispatch(updateBoardArea({ updatedBoardArea }));
      return;
    }

    if (isBoardDataUpdated || shouldOutPiece) return;

    dispatch(updateBoardArea({ updatedBoardArea }));
  }, [boardArea, isDiceThrew, isBoardDataUpdated, selectedPlace]);

  return (
    <div className={s.board}>
      <div className={s.leftTable}>
        <div className={`${s.top} ${s.reverse}`}>
          <Places placesData={pieces.leftTop} />
        </div>

        <div className={s.bottom}>
          <Places placesData={pieces.leftBottom} />
        </div>

        <Dice showGameDices={showGameDices} number={diceMoves?.[0]} />
      </div>

      <Bar />

      <div className={s.rightTable}>
        <div className={`${s.top} ${s.reverse}`}>
          <Places placesData={pieces.rightTop} />
        </div>

        <div className={s.bottom}>
          <Places placesData={pieces.rightBottom} />
        </div>

        <Dice
          showGameDices={showGameDices}
          color="black"
          number={diceMoves?.[1]}
        />
      </div>
    </div>
  );
};

export default BackgammonBoard;
