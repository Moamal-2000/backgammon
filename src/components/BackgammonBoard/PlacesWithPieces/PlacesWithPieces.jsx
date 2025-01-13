import s from "./PlacesWithPieces.module.scss";

const PlacesWithPieces = ({ placesData }) => {
  return placesData.map((data) => (
    <div className={`${s.place} ${s[data.placeColor]}`} key={data.place}>
      {data.pieces.map((piece, index) => (
        <div className={`${s.piece} ${s[piece]}`} key={index} />
      ))}
    </div>
  ));
};

export default PlacesWithPieces;
