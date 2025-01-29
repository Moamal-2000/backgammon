import s from "./OutPieces.module.scss";

const OutPieces = () => {
  return (
    <div className={s.outPieces}>
      <div className={s.piecesArea}></div>
      <div className={s.piecesArea}></div>
    </div>
  );
};

export default OutPieces;
