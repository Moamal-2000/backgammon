import { getRestMoves } from "@/Functions/movement";
import { areAllPiecesInHome } from "@/Functions/validation";
import { checkWinner, outPiece } from "@/Redux/slices/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import s from "./OutPlayerPiecesArea.module.scss";

const OutPlayerPiecesArea = ({ pieces, piecesColor }) => {
  const { boardArea, playerTurn, selectedPlace, diceMoves } = useSelector(
    (s) => s.game
  );
  const dispatch = useDispatch();

  const allPiecesInInnerHome = areAllPiecesInHome(boardArea, playerTurn);
  const selectedPlaceData = boardArea.find(
    (point) => point.place === selectedPlace
  );

  const isValidSelectPlace = diceMoves.includes(
    playerTurn === "white"
      ? selectedPlaceData?.place
      : 25 - selectedPlaceData?.place
  );

  const selectedPieceColor = selectedPlaceData?.pieces?.[0];
  const activeForSelectedColor = selectedPieceColor === piecesColor;

  const activeConditions =
    allPiecesInInnerHome && isValidSelectPlace && activeForSelectedColor;
  const activeClass = activeConditions ? s.active : "";

  function handleOutPiece() {
    if (!activeConditions) return;

    const homeSideRange =
      playerTurn === "black" ? [24, 23, 22, 21, 20, 19] : [1, 2, 3, 4, 5, 6];
    const numberOfSelectedPiece =
      homeSideRange.indexOf(selectedPlaceData.place) + 1;
    const restDiceMoves = getRestMoves(diceMoves, numberOfSelectedPiece);

    dispatch(outPiece({ from: selectedPlaceData, playerTurn, restDiceMoves }));
    dispatch(checkWinner());
  }

  return (
    <div className={`${s.piecesArea} ${activeClass}`} onClick={handleOutPiece}>
      {pieces.map((_, index) => (
        <div
          className={`${s.piece} ${s[piecesColor]}`}
          data-sort={pieces.length - index}
          key={index}
        />
      ))}
    </div>
  );
};

export default OutPlayerPiecesArea;
