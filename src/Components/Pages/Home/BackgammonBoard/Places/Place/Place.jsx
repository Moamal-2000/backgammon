import { getPlaceClasses, getPlaceData } from "@/Functions/movement";
import { playSound } from "@/Functions/sound";
import {
  movePiece,
  selectPiece,
  updateGameState,
} from "@/Redux/slices/gameSlice";
import u from "@/Styles/utilsClasses.module.scss";
import { useDispatch, useSelector } from "react-redux";
import HighlightPlace from "../HighlightPlace/HighlightPlace";
import Pieces from "../Pieces/Pieces";
import s from "./Place.module.scss";

const Place = ({ data }) => {
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
      moves,
      unSelectPlace,
      shouldEat,
      canSelectPiece,
      isCurrentMoveValid,
    } = getPlaceData({
      fromPlaceData,
      boardArea,
      selectedPlace,
      playerTurn,
      deadPieceColor,
      isDiceThrew,
      diceMoves,
      deadPieceColor,
    });

    if (unSelectPlace) {
      playSound("select");
      dispatch(updateGameState({ key: "selectedPlace", value: null }));
      return;
    }

    if (isCurrentMoveValid) {
      playSound("select");
      dispatch(movePiece({ placeData: fromPlaceData.place, shouldEat, moves }));
      return;
    }

    if (canSelectPiece) {
      playSound("select");
      dispatch(selectPiece({ placeData: fromPlaceData.place }));
    }
  }

  const { classes, unavailableClass } = getPlaceClasses({
    utilsCssModule: u,
    componentCssModule: s,
    boardArea,
    data,
    selectedPlace,
    playerTurn,
    isDiceThrew,
  });

  return (
    <div className={classes} onClick={() => handlePlaceClick(data)}>
      <Pieces data={data} unavailableClass={unavailableClass} />

      <HighlightPlace
        data={data}
        boardArea={boardArea}
        selectedPlace={selectedPlace}
      />
    </div>
  );
};

export default Place;
