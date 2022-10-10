import React from "react";
import uniqid from "uniqid";

import { Ability } from "../../../../interfaces/matches";
import {
  getDetaiAbility,
  getDetaiHero,
  getImgStratsDota,
} from "../../../../share";
import { useAppSelector } from "../../../../store";
import MyImage from "../../../MyImage";
import ToolTip from "../../../ToolTip";

const TopInfo = ({
  topInfo,
}: {
  topInfo: {
    heroId: number;
    name: string;
    abilities: Ability[];
  };
}) => {
  const heroes = useAppSelector((state) => state.globalData.heroes);
  const timeSeek = useAppSelector((state) => state.matchDetail.timeSeek);
  const timesLabel = useAppSelector((state) => state.matchDetail.timesLabel);
  const abilitiesData = useAppSelector(
    (state) => state.globalData.abilitiesData
  );
  const { heroId, name, abilities } = topInfo;
  const heroDetail = getDetaiHero(heroes, heroId);
  const imgHero = getImgStratsDota(`/heroes/${heroDetail?.shortName}_horz.png`);
  const currSeconds = timesLabel[timeSeek] * 60;

  return (
    <section className="flex items-center w-full">
      <div className="">
        <MyImage
          src={imgHero}
          height="40px"
          width="68px"
          alt={heroDetail?.shortName || ""}
          borderRadius={6}
        />
      </div>
      <div className="ml-2">
        <h6>{name}</h6>
        <span>3-1-1 build</span>
      </div>
      <div className="flex-1 flex ml-2 overflow-hidden">
        {abilities.map((abi, idx) => {
          const { abilityId, time } = abi;
          const detailAbility = getDetaiAbility(abilitiesData, abilityId);
          if (!detailAbility) return;
          const {
            name,
            isTalent,
            language: { displayName },
          } = detailAbility;
          if (isTalent) return;
          return (
            <div key={idx} className="p-1">
              <ToolTip
                target={
                  <div className={`${time > currSeconds ? "grayscale" : ""}`}>
                    <MyImage
                      src={getImgStratsDota(`/abilities/${name}.png`)}
                      alt={name}
                      width="30px"
                      height="30px"
                      borderRadius={5}
                    />
                  </div>
                }
                tooltip={<span className="p-2 rounded-md">{displayName}</span>}
                id={uniqid()}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TopInfo;
