import s from "./PlaceNumber.module.scss";

const PlaceNumber = ({ data, placesSide, boardArea, selectedPlace }) => {
  const selectedAvailableMoves = boardArea[selectedPlace]?.availableMoves;
  const isAvailablePlace = selectedAvailableMoves?.includes(data.place);
  const topSideClass = placesSide === "top" ? s.topSide : "";
  const activeClass = isAvailablePlace ? s.active : "";
  const classes = `${s.placeNumber} ${topSideClass} ${activeClass}`;

  if (!data?.deadPieces) return;

  return <span className={classes}>{data.place}</span>;
};

export default PlaceNumber;
