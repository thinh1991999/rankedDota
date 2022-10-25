import React from "react";
import { Stratz } from "../../interfaces/players";

const Rank = ({ stratz }: { stratz: Stratz | null }) => {
  console.log(stratz);
  return <div>Rank</div>;
};

export default Rank;
