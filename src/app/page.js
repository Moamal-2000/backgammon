import BackgammonBoard from "@/components/BackgammonBoard/BackgammonBoard";
import s from "./page.module.scss";

export default function Home() {
  return (
    <main className={s.home}>
      <div className="container" data-container>
        <h1>Backgammon game!</h1>
        <BackgammonBoard />
      </div>
    </main>
  );
}
