import React from "react";
import { HeroStats } from "../../interfaces/heroes";

const HeroContainer = ({ data }: { data: HeroStats }) => {
  console.log(data);
  return <div className="container m-auto  text-white">HeroContainer</div>;
};

export default HeroContainer;
