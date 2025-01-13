"use client";

import Piece from "./Piece/Piece";

const Pieces = ({ data, selectClass }) => {
  return data.pieces.map((piece, index) => (
    <Piece
      key={index}
      data={data}
      piece={piece}
      selectClass={selectClass}
      isLastPiece={0 === index}
    />
  ));
};

export default Pieces;
