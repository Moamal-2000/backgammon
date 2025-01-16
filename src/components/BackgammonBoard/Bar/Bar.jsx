"use client";

import { useSelector } from "react-redux";
import u from "../PlacesWithPieces/utilsClasses.module.scss";
import s from "./Bar.module.scss";

const Bar = () => {
  const { deadPieces } = useSelector((s) => s.game);
  const { black, white } = deadPieces;

  return (
    <div className={s.bar}>
      <div className={`${u.piece} ${u.white}`} style={{ color: "black" }}>
        {white.length > 1 && white.length}
      </div>

      <div className={`${u.piece} ${u.black}`} style={{ color: "#white" }}>
        {black.length > 1 && black.length}
      </div>
    </div>
  );
};

export default Bar;
