import ExplanationCard from "@/Components/Shared/ExplanationCard/ExplanationCard";
import { RULES_DATA } from "@/Data/staticData";

export const metadata = {
  title: "Backgammon | Rules",
  icons: {
    icon: [
      {
        url: "/Images/Favicon/three.png",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
    ],
  },
};

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
