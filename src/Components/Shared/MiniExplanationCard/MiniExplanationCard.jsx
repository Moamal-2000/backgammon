import s from "./MiniExplanationCard.module.scss";

const MiniExplanationCard = ({ title, descriptions }) => {
  return (
    <div className={s.card}>
      <h3>{title}</h3>
      {descriptions?.map((description) => (
        <p>{description}</p>
      ))}
    </div>
  );
};

export default MiniExplanationCard;
