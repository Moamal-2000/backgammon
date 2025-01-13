import s from "./Dice.module.scss";

const Dice = ({ shouldShowBeginDices, showGameDices, diceNumber, color }) => {
  const blackClass = color === "black" ? s.black : "";

  return (
    <>
      {shouldShowBeginDices && (
        <p className={`${s.dice} ${blackClass}`}>{diceNumber}</p>
      )}

      {showGameDices && (
        <p className={`${s.dice} ${blackClass}`}>{diceNumber}</p>
      )}
    </>
  );
};

export default Dice;
