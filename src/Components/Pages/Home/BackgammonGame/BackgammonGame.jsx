import BackgammonBoard from "../BackgammonBoard/BackgammonBoard";
import OutPieces from "../BackgammonBoard/OutPieces/OutPieces";
import TurnTracker from "../BackgammonBoard/TurnTracker/TurnTracker";
import GameButtons from "../GameButtons/GameButtons";
import s from "./BackgammonGame.module.scss";

const BackgammonGame = () => {
  return (
    <div className={s.backgammon}>
      <div className={s.backgammonWrapper}>
        <TurnTracker />
        <BackgammonBoard />
        <OutPieces />
      </div>

      <GameButtons />
    </div>
  );
};

export default BackgammonGame;
