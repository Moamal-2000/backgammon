"use client";

import Piece from "./Piece/Piece";
import s from "./Pieces.module.scss";

const Pieces = ({ data, unavailableClass }) => {
  const baseStack = data.pieces.slice(0, 5);
  const secondStack = data.pieces.slice(5, 9);
  const thirdStack = data.pieces.slice(9, 12);
  const fourthStack = data.pieces.slice(12, 14);
  const lastStack = data.pieces.slice(14, 15);

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
