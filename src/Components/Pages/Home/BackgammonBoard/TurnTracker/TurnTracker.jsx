"use client";

import SvgIcon from "@/Components/Shared/SvgIcon";
import { useSelector } from "react-redux";
import s from "./TurnTracker.module.scss";

const TurnTracker = () => {
  const { playerTurn } = useSelector((s) => s.game);
  const whiteActiveClass = playerTurn === "white" ? s.active : "";
  const blackActiveClass = playerTurn === "black" ? s.active : "";

  return (
    <div className={s.turnTracker}>
      <div className={`${s.player} ${s.white} ${whiteActiveClass}`}>
        <SvgIcon name="user" />
        <span>P1</span>
      </div>

      <div className={`${s.player} ${s.black} ${blackActiveClass}`}>
        <SvgIcon name="user" />
        <span>P2</span>
      </div>
    </div>
  );
};

export default TurnTracker;
