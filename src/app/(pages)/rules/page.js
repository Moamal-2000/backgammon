import ExplanationCard from "@/Components/Shared/ExplanationCard/ExplanationCard";
import { RULES_DATA } from "@/Data/staticData";

const RulesCard = () => {
  const { mainTitle, explanationData } = RULES_DATA;

  return (
    <main>
      <ExplanationCard
        mainTitle={mainTitle}
        explanationData={explanationData}
        showArrow={true}
      />
    </main>
  );
};

export default RulesCard;
