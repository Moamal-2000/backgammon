"use client";

import Place from "./Place/Place";

const Places = ({ placesData }) => {
  return placesData.map((data) => (
    <Place key={`place ${data.place}`} data={data} />
  ));
};

export default Places;
