"use client";

import Piece from "./Piece/Piece";

const Pieces = ({ data, unavailableClass }) => {
  return data.pieces.map((piece, index) => (
    <Piece
      key={index}
      data={data}
      piece={piece}
      isLastPiece={0 === index}
      unavailableClass={unavailableClass}
    />
  ));
};

export default Pieces;
