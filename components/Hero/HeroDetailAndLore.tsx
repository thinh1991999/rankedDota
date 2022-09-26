import React from "react";
import parse from "html-react-parser";
import { Hero } from "../../interfaces/heroes";
import { getImgStratsDota } from "../../share/ultils";
import MyImage from "../MyImage";

const HeroDetailAndLore = ({ hero }: { hero: Hero }) => {
  const {
    id,
    shortName,
    language: { hype, lore, displayName },
  } = hero;
  const img = getImgStratsDota("/heroes/" + shortName + "_modelcrop.png");
  return (
    <section className="flex flex-wrap -ml-2 -mr-2">
      <div className="w-full xl:w-1/2 p-2">
        <div className="h-full rounded-md bg-layer-dark  flex flex-col justify-between">
          <div className="relative pb-12 px-3 pt-3 border-b">
            <h5>Details</h5>
            <p className="text-sm mt-2 w-[calc(100%_-_200px)]">{parse(hype)}</p>
            <div className="absolute bottom-0 right-0">
              <MyImage src={img} width={200} height={150} alt={displayName} />
            </div>
          </div>
          <div className="px-3 pb-3 pt-10">
            <div className="flex items-end justify-between">
              <h6>Hero ID</h6>
              <div className="flex-1 px-2 pb-[6px]">
                <div className="border-b-[1px] border-dotted"></div>
              </div>
              <span>{id}</span>
            </div>
            <div className="flex items-end justify-between">
              <h6>Aliases</h6>
              <div className="flex-1 px-2 pb-[6px]">
                <div className="border-b-[1px] border-dotted"></div>
              </div>
              <span>{displayName}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full xl:w-1/2 p-2">
        <div className="h-full p-3 rounded-md bg-layer-dark">
          <h5>Lore</h5>
          <p className="text-sm mt-2">{parse(lore)}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroDetailAndLore;
