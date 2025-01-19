import MiniExplanationCard from "../MiniExplanationCard/MiniExplanationCard";
import s from "./ExplanationCard.module.scss";

const ExplanationCard = ({ mainTitle, explanationData }) => {
  return (
    <div className={s.mainCard}>
      <h2>{mainTitle}</h2>

      {explanationData?.map(({ title, descriptions, id }) => (
        <MiniExplanationCard
          title={title}
          descriptions={descriptions}
          key={id}
        />
      ))}
    </div>
  );
};

export default ExplanationCard;
