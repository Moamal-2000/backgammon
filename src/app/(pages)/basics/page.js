import ExplanationCard from "@/Components/Shared/ExplanationCard/ExplanationCard";
import { BASICS_DATA } from "@/Data/staticData";

export const metadata = {
  title: "Backgammon | Basics",
};

const BasicsCard = () => {
  const { mainTitle, explanationData } = BASICS_DATA;

  return (
    <main>
      <ExplanationCard
        mainTitle={mainTitle}
        explanationData={explanationData}
      />
    </main>
  );
};

export default BasicsCard;
