import s from "./HighlightPlace.module.scss";

const HighlightPlace = ({ data, boardArea, selectedPlace }) => {
  const selectedAvailableMoves = boardArea[selectedPlace]?.availableMoves;
  const isAvailablePlace = selectedAvailableMoves?.includes(data.place);

  return (
    isAvailablePlace && <div className={`${s.highlightPlace}`} />
  );
};

export default HighlightPlace;
