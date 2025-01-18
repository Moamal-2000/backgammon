import BackgammonBoard from "@/Components/BackgammonBoard/BackgammonBoard";
import TurnTracker from "@/Components/BackgammonBoard/TurnTracker/TurnTracker";
import GameButtons from "@/Components/GameButtons/GameButtons";
import s from "./page.module.scss";

export default function Home() {
  return (
    <main className={s.home}>
      <div className="container" data-container>
        <div className={s.backgammonWrapper}>
          <TurnTracker />
          <BackgammonBoard />
        </div>

        <GameButtons />
      </div>
    </main>
  );
}
