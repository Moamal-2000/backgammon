import s from "./OutPlayerPiecesArea.module.scss";

const OutPlayerPiecesArea = ({ pieces, piecesColor }) => {
  return (
    <div className={s.piecesArea}>
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
