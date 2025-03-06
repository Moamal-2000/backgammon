import StrategySections from "@/Components/Pages/Strategy/StraegySections/StrategySections";
import { STRATEGY_DATA } from "@/Data/Pages/StrategyPage";
import s from "./StrategyCard.module.scss";

export const metadata = {
  title: "Backgammon | Strategy",
  icons: {
    icon: [
      {
        url: "/Images/Favicon/four.png",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
    ],
  },
};

const StrategyCard = () => {
  const { mainTitle, sections } = STRATEGY_DATA;

  return (
    <main className={s.strategyPage}>
      <h2>{mainTitle}</h2>
      <StrategySections sections={sections} />
    </main>
  );
};

export default StrategyCard;
