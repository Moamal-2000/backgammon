import BackgammonGame from "@/Components/BackgammonGame/BackgammonGame";
import s from "./page.module.scss";

export default function Home() {
  return (
    <main className={s.home}>
      <BackgammonGame />
    </main>
  );
}
