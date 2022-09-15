import React from "react";
import { AbilityDetail } from "../../interfaces/heroes";
import { getImgStratsDota } from "../../share";
import MyImage from "../MyImage";

const DetailAbility = ({ ability }: { ability: AbilityDetail }) => {
  const {
    name,
    language: { displayName, description },
    stat: { manaCost, cooldown },
  } = ability;
  return (
    <section className="px-4 py-3 bg-neutral w-[300px]">
      <div className="flex items-center mb-2">
        <MyImage
          src={getImgStratsDota(`/abilities/${name}.png`)}
          alt={name}
          width={40}
          height={40}
          borderRadius={5}
        />
        <span className=" ml-3 uppercase font-medium tracking-wider">
          {displayName}
        </span>
      </div>
      <div className="py-2 border-t-2 border-solid border-t-gray-500">
        {description.map((des: string, index: number) => {
          return (
            <p className="my-2  text-xs" key={index}>
              {des}
            </p>
          );
        })}
      </div>
      <div className="flex justify-between items-end  text-sm">
        <div className="flex items-center">
          {manaCost && (
            <>
              <div className="h-[15px] w-[15px] rounded-sm bg-blue-600 mr-1"></div>
              {manaCost.map((mana, index) => {
                return <span key={index}>{index > 0 ? `/${mana}` : mana}</span>;
              })}
            </>
          )}
        </div>
        <div className="flex items-center">
          {cooldown && (
            <>
              <div className="relative h-[15px] w-[15px] bg-gray-400 rounded-sm mr-1 overflow-hidden">
                <div className="absolute top-0 left-0 bottom-0 w-1/2 bg-gray-600"></div>
                <div className="border-[8px] border-solid border-l-transparent border-r-transparent border-b-gray-600 border-t-transparent"></div>
              </div>
              {cooldown.map((cool, index) => {
                return <span key={index}>{index > 0 ? `/${cool}` : cool}</span>;
              })}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default DetailAbility;
