"use client";

import DeadPiece from "@/components/Shared/DeadPiece";
import { useSelector } from "react-redux";
import s from "./Bar.module.scss";

const Bar = () => {
  const { deadPieces } = useSelector((s) => s.game);
  const { black, white } = deadPieces;

  return (
    <div className={s.bar}>
      <DeadPiece color="white" pieces={white} position="top" />
      <DeadPiece color="black" pieces={black} position="bottom" />
    </div>
  );
};

export default Bar;
