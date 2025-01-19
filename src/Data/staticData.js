import { getBoardArea } from "@/Functions/helper";

export const boardArea = getBoardArea();

export const NAV_LINKS = [
  {
    name: "Play",
    path: "/",
    iconName: "dice",
    id: 0,
  },
  {
    name: "Basics",
    path: "/basics",
    iconName: "exclamation-mark",
    id: 1,
  },
  {
    name: "Rules",
    path: "/rules",
    iconName: "book",
    id: 2,
  },
  {
    name: "Strategy",
    path: "/strategy",
    iconName: "medal",
    id: 3,
  },
  {
    name: "Setup",
    path: "/setup",
    iconName: "gear",
    id: 4,
  },
];

export const BASICS_DATA = {
  mainTitle: "Getting Started with Backgammon",
  explanationData: [
    {
      title: "The Board",
      descriptions: [
        "The backgammon board consists of 24 points, divided into four quadrants of six points each. Players move their checkers in opposite directions.",
      ],
      id: 0,
    },
    {
      title: "The Objective",
      descriptions: [
        "Move all your checkers around the board and bear them off before your opponent. Each player starts with 15 checkers.",
      ],
      id: 1,
    },
  ],
};

export const RULES_DATA = {
  mainTitle: "Game Rules",
  explanationData: [
    {
      title: "Movement Rules",
      descriptions: [
        "Roll two dice and move checkers according to the numbers shown",
        "Move in opposite directions: one player clockwise, the other counterclockwise",
      ],
      id: 0,
    },
  ],
};

export const BASIC_STRATEGIES_DATA = {
  subTitle: "Basic Strategies",
  explanationData: [
    {
      title: "Build Anchors in Your Opponent's Home Board",
      descriptions: [
        "What it means: An anchor is a point in your opponent’s home board (typically points 20, 21, or 22) that you occupy with two or more checkers.",
        "Why it’s useful: Anchors serve as safe spots that protect your checkers from being hit while allowing you to re-enter the game if you get sent to the bar.",
        "How to do it: Prioritize building anchors early in the game, especially if you fall behind. Place your checkers strategically to maximize re-entry options.",
      ],
      id: 0,
    },
    {
      title: "Create Blocking Positions",
      descriptions: [
        "What it means: Blocking positions are a series of consecutive points you occupy to block your opponent’s movement.",
        "Why it’s useful: This strategy can trap your opponent’s back checkers, making it harder for them to advance.",
        "How to do it: Aim to build a prime (four or more consecutive blocked points). Combining primes with a strong home board is a powerful tactic.",
      ],
      id: 1,
    },
    {
      title: "Balance Offense and Defense",
      descriptions: [
        "What it means: Adjust your gameplay based on the current board situation.",
        "Why it’s useful: An overly aggressive approach may expose your checkers to being hit, while a defensive approach can miss opportunities to win.",
        "How to do it: When ahead, play defensively by consolidating your position. When behind, take risks to disrupt your opponent’s strategy.",
      ],
      id: 2,
    },
  ],
};

export const ADVANCED_STRATEGIES_DATA = {
  subTitle: "Advanced Concepts",
  explanationData: [
    {
      title: "Timing Your Moves for Maximum Efficiency",
      descriptions: [
        "What it means: Timing refers to ensuring your moves align with your overall strategy, such as creating primes, maintaining anchors, or advancing checkers when safe.",
        "Why it’s useful: Poorly timed moves can leave checkers vulnerable or disrupt your long-term plans.",
        "How to do it: Always think a few moves ahead. Consider your opponent's likely responses to your moves before executing them.",
      ],
      id: 0,
    },
    {
      title: "Using the Doubling Cube Effectively",
      descriptions: [
        "What it means: The doubling cube lets players double the stakes of the game, with the opponent deciding whether to accept or forfeit.",
        "Why it’s useful: Using the doubling cube strategically puts pressure on your opponent and forces tough decisions.",
        "How to do it: Double early when you have a strong advantage, but not so early that your opponent has an easy take. Assess factors like the strength of your board, the race, and your opponent’s skill level.",
      ],
      id: 1,
    },
    {
      title: "Reading Your Opponent's Position",
      descriptions: [
        "What it means: Analyze your opponent’s moves, weaknesses, and tendencies to predict their next actions.",
        "Why it’s useful: Anticipating your opponent’s moves allows you to stay one step ahead.",
        "How to do it: Identify exposed blots (single checkers), weak home boards, or overly aggressive strategies. Use this knowledge to exploit gaps in their defense.",
      ],
      id: 2,
    },
  ],
};

export const PRO_TIPS_STRATEGY_DATA = {
  subTitle: "Pro Tips for Beginners",
  explanationData: [
    {
      title: "",
      descriptions: [
        "Don’t leave unnecessary blots: A blot is a single checker that can be hit by your opponent. Protect your checkers by forming points whenever possible.",
        "Build a strong home board early: Secure as many points as you can in your home board to prevent your opponent from re-entering easily.",
        "Focus on flexibility: Keep your checkers spread out to give yourself a wider range of possible moves on each roll.",
        "Know when to hit: Hitting your opponent’s blot sends their checker to the bar, but only do so if it strengthens your position or disrupts theirs.",
      ],
      id: 0,
    },
  ],
};

export const STRATEGY_DATA = {
  mainTitle: "Strategy Tips for Backgammon",
  sections: [
    BASIC_STRATEGIES_DATA,
    ADVANCED_STRATEGIES_DATA,
    PRO_TIPS_STRATEGY_DATA,
  ],
};
