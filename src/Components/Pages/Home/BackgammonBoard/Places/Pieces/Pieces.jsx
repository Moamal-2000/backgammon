"use client";

import { getStackData } from "@/Functions/helper";
import Piece from "./Piece/Piece";
import s from "./Pieces.module.scss";

const Pieces = ({ data, unavailableClass }) => {
  const { stacks, lastStackName } = getStackData(data.pieces);
  const { baseStack, secondStack, thirdStack, fourthStack, lastStack } = stacks;

  return (
    <div className={s.baseStack}>
      {baseStack.map((piece, index) => {
        return (
          <Piece
            key={index}
            data={data}
            piece={piece}
            isLastPiece={0 === index}
            unavailableClass={unavailableClass}
            lastStackName={lastStackName}
            stackName="baseStack"
          />
        );
      })}

      <div className={s.secondStack}>
        {secondStack.map((piece, index) => {
          return (
            <Piece
              key={index}
              data={data}
              piece={piece}
              isLastPiece={0 === index}
              unavailableClass={unavailableClass}
              lastStackName={lastStackName}
              stackName="secondStack"
            />
          );
        })}

        <div className={s.thirdStack}>
          {thirdStack.map((piece, index) => {
            return (
              <Piece
                key={index}
                data={data}
                piece={piece}
                isLastPiece={0 === index}
                unavailableClass={unavailableClass}
                lastStackName={lastStackName}
                stackName="thirdStack"
              />
            );
          })}

          <div className={s.fourthStack}>
            {fourthStack.map((piece, index) => {
              return (
                <Piece
                  key={index}
                  data={data}
                  piece={piece}
                  isLastPiece={0 === index}
                  unavailableClass={unavailableClass}
                  lastStackName={lastStackName}
                  stackName="fourthStack"
                />
              );
            })}

            <div className={s.lastStack}>
              {lastStack.map((piece, index) => {
                return (
                  <Piece
                    key={index}
                    data={data}
                    piece={piece}
                    isLastPiece={0 === index}
                    unavailableClass={unavailableClass}
                    lastStackName={lastStackName}
                    stackName="lastStack"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pieces;
