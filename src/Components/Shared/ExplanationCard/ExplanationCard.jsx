import s from "./ExplanationCard.module.scss";

const ExplanationCard = ({ mainTitle, explanationData }) => {
  return (
    <div className={s.mainCard}>
      <h2>{mainTitle}</h2>

      {explanationData?.map(({ title, descriptions }) => (
        <div className={s.card}>
          <h3>{title}</h3>
          {descriptions?.map((description) => (
            <p>{description}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ExplanationCard;
