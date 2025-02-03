"use client";

import {
  areAllPiecesInInnerHome,
  calcAvailablePlaces,
  getPiecesData,
  getPlayerPieces,
} from "@/Functions/helper";
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
import PlacesWithPieces from "./PlacesWithPieces/PlacesWithPieces";

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
    const shouldOutPiece = areAllPiecesInInnerHome(boardArea, playerTurn);
    const updatedBoardArea = calcAvailablePlaces({
      boardArea,
      diceMoves,
      playerTurn,
    });
    const isPlayerHasDeadPiece =
      playerTurn && updatedBoardArea[0].deadPieces[playerTurn].length > 0;

    if (shouldOutPiece && !isPlayerHasDeadPiece) {
      const availablePieces = getPlayerPieces({
        boardArea: updatedBoardArea,
        playerTurn,
      });

      const availablePlaces = availablePieces.map((point) => point.place);
      const validDiceNumbers = diceMoves.filter((diceMove) =>
        availablePlaces.includes(
          playerTurn === "white" ? diceMove : 25 - diceMove
        )
      );

      dispatch(
        updateGameState({ key: "validDiceNumbers", value: validDiceNumbers })
      );
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
          <PlacesWithPieces placesData={pieces.leftTop} placesSide="top" />
        </div>

        <div className={s.bottom}>
          <PlacesWithPieces
            placesData={pieces.leftBottom}
            placesSide="bottom"
          />
        </div>

        <Dice showGameDices={showGameDices} number={diceMoves?.[0]} />
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
          showGameDices={showGameDices}
          color="black"
          number={diceMoves?.[1]}
        />
      </div>
    </div>
  );
};

export default BackgammonBoard;
