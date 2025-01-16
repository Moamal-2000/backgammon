import u from "../BackgammonBoard/PlacesWithPieces/utilsClasses.module.scss";

const DeadPiece = ({ color, pieces, position }) => {
  const opponent = color === "black" ? "white" : "black";
  const style = { color: opponent, [position]: "180px" };

  return (
    pieces.length > 0 && (
      <div className={`${u.piece} ${u[color]}`} style={style}>
        {pieces.length > 1 && pieces.length}
      </div>
    )
  );
};

export default DeadPiece;
