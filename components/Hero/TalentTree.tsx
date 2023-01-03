import _ from "lodash";
import React, { useState, useEffect } from "react";
import { Talent, AbilityDetail } from "../../interfaces/heroes";
import { useAppSelector } from "../../store";
import { RootState } from "../../store/store";
import MyImage from "../MyImage";

const TalentTree = ({ talents }: { talents: Talent[] }) => {
  const abilitiesData = useAppSelector(
    (state: RootState) => state.globalData.abilitiesData
  );
  const [talentsDetail, setTalentsDetails] = useState<
    {
      lv: number;
      talents: AbilityDetail[];
    }[]
  >([]);

  useEffect(() => {
    const results: AbilityDetail[] = new Array(talents.length);
    let count = 0;
    _.forEach(abilitiesData, (ability, key) => {
      const { id } = ability;
      const idx = _.findIndex(talents, (talent) => {
        return talent.abilityId === id;
      });
      if (idx !== -1) {
        results[idx] = ability;
        count++;
        if (count === talents.length) return;
      }
    });
    const finalResult: {
      lv: number;
      talents: AbilityDetail[];
    }[] = [];
    _.forEach([10, 15, 20, 25], (lv) => {
      const res = {
        lv,
        talents: results.splice(0, 2),
      };
      finalResult.push(res);
    });
    setTalentsDetails(finalResult);
  }, [talents, abilitiesData]);

  return (
    <section className="px-3 py-2 h-[250px] w-[350px] dark:bg-layer-dark bg-layer-light rounded-md overflow-hidden">
      <div className="relative h-full w-full">
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center rounded-md overflow-hidden">
          <MyImage
            src="/talent_tree.svg"
            alt="talent tree"
            width="200px"
            height="200px"
            borderRadius={6}
          />
        </div>
        <div className="h-full flex justify-center flex-col-reverse">
          {talentsDetail.map((talent, idx) => {
            const { lv, talents } = talent;
            return (
              <div
                key={idx}
                className="my-1 flex justify-center text-center items-center relative text-xs text-white bg-neutral py-1"
              >
                <p className="block w-2/5">{talents[0].language.displayName}</p>
                <div className="mx-2 w-10 h-10 rounded-full text-yellow-600 font-bold shadow-[rgb(236,252,109)_0px_0px_20px] bg-gray-900 border-yellow-400 flex justify-center items-center">
                  {lv}
                </div>
                <p className="block w-2/5">{talents[1].language.displayName}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TalentTree;
