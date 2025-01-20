import StrategySections from "@/Components/Pages/Strategy/StraegySections/StrategySections";
import { STRATEGY_DATA } from "@/Data/Pages/StrategyPage";
import s from "./StrategyCard.module.scss";

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
