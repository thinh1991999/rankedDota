import React from "react";
import { Hero, Rampage } from "../../interfaces/heroes";
import { RootState } from "../../store/store";
import { useAppSelector } from "../../store/hook";
import FeaturedGuides from "./FeaturedGuides";

const HeroMain = ({ hero, rampages }: { hero: Hero; rampages: Rampage[] }) => {
  const abilitiesData = useAppSelector(
    (state: RootState) => state.globalData.abilitiesData
  );
  const items = useAppSelector((state: RootState) => state.globalData.items);
  const {
    language: { lore, hype },
  } = hero;
  return (
    <section className="container m-auto text-white">
      {/* <FeaturedGuides hero={hero} /> */}
      {/* <div className="flex">
        <div className="w-1/2">
          <h5 className="text-xl font-bold">Details</h5>
          <p className="text-textSecondPrimary-dark">{hype}</p>
        </div>
        <div className="w-1/2">
          <h5 className="text-xl font-bold">Lore</h5>
          <p className="text-textSecondPrimary-dark">{lore}</p>
        </div>
      </div> */}
    </section>
  );
};

export default HeroMain;
