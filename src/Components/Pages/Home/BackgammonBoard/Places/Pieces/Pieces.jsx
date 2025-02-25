"use client";

import { getStackData } from "@/Functions/helper";
import Piece from "./Piece/Piece";
import s from "./Pieces.module.scss";

const Pieces = ({ data, unavailableClass }) => {
  const { stacks, lastStackName } = getStackData(data.pieces);
  const stackEntries = Object.entries(stacks);

  return stackEntries.reduceRight((child, [stackName, stack]) => (
    <div key={stackName} className={s[stackName]}>
      {stack.map((piece, index) => (
        <Piece
          key={index}
          data={data}
          piece={piece}
          isLastPiece={index === 0}
          unavailableClass={unavailableClass}
          lastStackName={lastStackName}
          stackName={stackName}
        />
      ))}

      {child}
    </div>
  ));
};

export default Pieces;
