import BackgammonBoard from "@/components/BackgammonBoard/BackgammonBoard";
import TurnTracker from "@/components/BackgammonBoard/TurnTracker/TurnTracker";
import GameButtons from "@/components/GameButtons/GameButtons";
import s from "./page.module.scss";

export default function Home() {
  return (
    <main className={s.home}>
      <div className="container" data-container>
        <h1>Backgammon game!</h1>

        <div className={s.backgammonWrapper}>
          <TurnTracker />
          <BackgammonBoard />
        </div>

        <GameButtons />
      </div>
    </main>
  );
}
