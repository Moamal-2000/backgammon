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
