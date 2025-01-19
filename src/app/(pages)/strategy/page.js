import StrategySections from "@/Components/StrategyPage/StraegySections/StrategySections";
import { STRATEGY_DATA } from "@/Data/staticData";
import s from "../../../Components/StrategyPage/StrategyCard.module.scss";

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
