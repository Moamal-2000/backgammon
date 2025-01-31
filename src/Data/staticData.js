import { getBoardArea } from "@/Functions/helper";
import { getBoardAreaToTestOutPieces } from "@/Functions/testing";

export const boardArea = getBoardAreaToTestOutPieces();

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
