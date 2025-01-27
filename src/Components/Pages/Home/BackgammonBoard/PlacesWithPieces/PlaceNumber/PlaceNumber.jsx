import s from "./PlaceNumber.module.scss";

const PlaceNumber = ({ data, placesSide }) => {
  const topSideClass = placesSide === "top" ? s.topSide : "";

  return (
    !data?.deadPieces && (
      <span className={`${s.placeNumber} ${topSideClass}`}>{data.place}</span>
    )
  );
};

export default PlaceNumber;
