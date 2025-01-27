import s from "./PlaceNumber.module.scss";

const PlaceNumber = ({ data, placesSide, isAvailablePlace }) => {
  const topSideClass = placesSide === "top" ? s.topSide : "";
  const activeClass = isAvailablePlace ? s.active : "";

  return (
    !data?.deadPieces && (
      <span className={`${s.placeNumber} ${topSideClass} ${activeClass}`}>
        {data.place}
      </span>
    )
  );
};

export default PlaceNumber;
