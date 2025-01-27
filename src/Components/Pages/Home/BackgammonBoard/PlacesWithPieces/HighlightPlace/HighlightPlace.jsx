import s from "./HighlightPlace.module.scss";

const HighlightPlace = ({ data, boardArea, selectedPlace }) => {
  const selectedAvailableMoves = boardArea[selectedPlace]?.availableMoves;
  const isAvailablePlace = selectedAvailableMoves?.includes(data.place);
  const activeClass = isAvailablePlace ? s.active : "";

  return (
    isAvailablePlace && <div className={`${s.highlightPlace} ${activeClass}`} />
  );
};

export default HighlightPlace;
