import BackgammonGame from "@/Components/Pages/Home/BackgammonGame/BackgammonGame";
import s from "./page.module.scss";

export default function Home() {
  return (
    <main className={s.home}>
      <BackgammonGame />
    </main>
  );
}
