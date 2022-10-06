import React from "react";
import _ from "lodash";
import { useAppSelector } from "../../store";
import { getImgOpenDota } from "../../share/ultils";
import MyImage from "../MyImage";
import { useAppDispatch } from "../../store/hook";
import { removeDire, removeRadiant } from "../../store/Slices/composSlice";

const SearchMatch = () => {
  const dispatch = useAppDispatch();
  const radiants = useAppSelector((state) => state.compos.radiants);
  const dires = useAppSelector((state) => state.compos.dires);

  const handleRemoveRadiant = (id: number): void => {
    dispatch(removeRadiant(id));
  };

  const handleRemoveDire = (id: number): void => {
    dispatch(removeDire(id));
  };

  return (
    <section>
      <div className="flex my-4 -ml-2 -mr-2">
        <div className="w-1/2 p-2">
          <div className="p-2 rounded-md bg-layer-dark border border-blue-500">
            <h6 className="text-center text-blue-500 font-bold">Team A</h6>
            <div className="flex flex-wrap lg:justify-end justify-center relative">
              {_.range(5 - radiants.length).map((item) => {
                return (
                  <div
                    key={item}
                    className="h-[75px] w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2"
                  >
                    <div className="h-full bg-layerStrong-light dark:bg-layerStrong-dark rounded-md"></div>
                  </div>
                );
              })}
              {radiants.map((hero, idx) => {
                if (idx > 4) return;
                const img = getImgOpenDota(
                  `/apps/dota2/images/dota_react/heroes/${hero.shortName}.png`
                );
                return (
                  <div
                    key={idx}
                    className="h-[75px] w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2"
                  >
                    <div
                      onClick={() => handleRemoveRadiant(hero.id)}
                      className="h-full rounded-md bg-gray-500 cursor-pointer hover:opacity-50"
                    >
                      <MyImage
                        src={img}
                        width="auto"
                        height="100%"
                        alt={hero.displayName}
                        borderRadius={6}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-1/2 p-2">
          <div className="p-2 rounded-md bg-layer-dark border border-red-500">
            <h6 className="text-center text-red-500 font-bold">Team B</h6>
            <div className="flex flex-wrap lg:justify-end justify-center relative">
              {_.range(5 - dires.length).map((item) => {
                return (
                  <div
                    key={item}
                    className="h-[75px] w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2"
                  >
                    <div className="h-full bg-layerStrong-light dark:bg-layerStrong-dark rounded-md"></div>
                  </div>
                );
              })}
              {dires.map((hero, idx) => {
                if (idx > 4) return;
                const img = getImgOpenDota(
                  `/apps/dota2/images/dota_react/heroes/${hero.shortName}.png`
                );
                return (
                  <div
                    key={idx}
                    className="h-[75px] w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2"
                  >
                    <div
                      onClick={() => handleRemoveDire(hero.id)}
                      className="h-full rounded-md bg-gray-500 cursor-pointer hover:opacity-50"
                    >
                      <MyImage
                        src={img}
                        width="auto"
                        height="100%"
                        alt={hero.displayName}
                        borderRadius={6}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchMatch;
