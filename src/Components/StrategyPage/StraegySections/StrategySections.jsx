import { Fragment } from "react";
import StrategySection from "./StrategySection/StrategySection";
import s from "./StrategySections.module.scss";

const StrategySections = ({ sections }) => {
  return sections.map(({ subTitle, explanationData }, index) => (
    <Fragment key={index}>
      <h3 className={s.subTitle}>{subTitle}</h3>

      {explanationData.map((sectionData) => (
        <StrategySection {...sectionData} />
      ))}
    </Fragment>
  ));
};

export default StrategySections;
