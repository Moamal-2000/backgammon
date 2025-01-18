"use client";

import SvgIcon from "@/components/Shared/SvgIcon";
import { useSelector } from "react-redux";
import s from "./TurnTracker.module.scss";

const TurnTracker = () => {
  const { playerTurn } = useSelector((s) => s.game);
  const whiteActiveClass = playerTurn === "white" ? s.white : "";
  const blackActiveClass = playerTurn === "black" ? s.black : "";

  return (
    <div className={s.turnTracker}>
      <div className={`${s.player} ${whiteActiveClass}`}>
        <SvgIcon name="user" />
        <span>P1</span>
      </div>

      <div className={`${s.player} ${blackActiveClass}`}>
        <SvgIcon name="user" />
        <span>P2</span>
      </div>
    </div>
  );
};

export default TurnTracker;
