import SvgIcon from "../SvgIcon";
import s from "./MiniExplanationCard.module.scss";

const MiniExplanationCard = ({ title, descriptions, showArrow = false }) => {
  return (
    <>
      <div className={s.card}>
        <h3>{title}</h3>

        <ul>
          {descriptions?.map((description, index) => (
            <li key={index}>
              {showArrow && <SvgIcon name="right-arrow" />}
              {description}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MiniExplanationCard;
