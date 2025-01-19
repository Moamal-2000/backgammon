import SvgIcon from "@/Components/Shared/SvgIcon";
import s from "./StrategySection.module.scss";

const StrategySection = ({ title, descriptions, id }) => {
  return (
    <div className={s.card}>
      {title && <h4>{title}</h4>}

      <ul>
        {descriptions?.map((description, index) => (
          <li key={index}>
            {true && <SvgIcon name="right-arrow" />}
            {description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StrategySection;
