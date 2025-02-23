"use client";

import { getStackedPieces } from "@/Functions/helper";
import Piece from "./Piece/Piece";
import s from "./Pieces.module.scss";

const Pieces = ({ data, unavailableClass }) => {
  const { baseStack, secondStack, thirdStack, fourthStack, lastStack } =
    getStackedPieces(data.pieces);

  return (
    <div className={s.baseStack}>
      {baseStack.map((piece, index) => {
        return (
          <Piece
            key={index}
            data={data}
            piece={piece}
            isLastPiece={0 === index}
            pieceOrder={index + 1}
            unavailableClass={unavailableClass}
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
              pieceOrder={index + 1}
              unavailableClass={unavailableClass}
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
                pieceOrder={index + 1}
                unavailableClass={unavailableClass}
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
                  pieceOrder={index + 1}
                  unavailableClass={unavailableClass}
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
                    pieceOrder={index + 1}
                    unavailableClass={unavailableClass}
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
