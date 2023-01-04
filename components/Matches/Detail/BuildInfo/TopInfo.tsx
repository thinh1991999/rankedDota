import forEach from "lodash/forEach";
import React, { useEffect, useState, useMemo } from "react";
import { AbilityDetail } from "../../../../interfaces/heroes";
import { Ability } from "../../../../interfaces/matches";
import {
  getDetaiAbility,
  getDetaiHero,
  getImgStratsDota,
  useGetTimeCurrentMatchDetail,
} from "../../../../share";
import { useAppSelector } from "../../../../store";
import MyImage from "../../../MyImage";
import Talent from "../../../Talent";
import Abilities from "./Abilities";

const TopInfo = ({
  topInfo,
}: {
  topInfo: {
    heroId: number;
    name: string;
    abilities: Ability[];
    lvArr: number[];
  };
}) => {
  const heroes = useAppSelector((state) => state.globalData.heroes);
  const abilitiesData = useAppSelector(
    (state) => state.globalData.abilitiesData
  );
  // console.log("TopInfo");
  const [abiFull, setAbiFull] = useState<(AbilityDetail & { time: number })[]>(
    []
  );

  const [talentIds, setTalentIds] = useState<Ability[]>([]);
  const [talentInfo, setTalentInfo] = useState<{
    actives: number[];
    stats: number;
  }>();
  const imgInfo = useMemo(() => {
    const heroDetail = getDetaiHero(heroes, topInfo.heroId);
    return {
      img: getImgStratsDota(`/heroes/${heroDetail?.shortName}_horz.png`),
      name: heroDetail?.displayName,
    };
  }, [topInfo, heroes]);

  const currentTime = useGetTimeCurrentMatchDetail();
  useEffect(() => {
    if (talentIds.length === 0) return;
    const { lvArr, abilities } = topInfo;
    let countLv = 1;
    const activesTl: number[] = [];
    forEach(lvArr, (time) => {
      if (time <= currentTime && time > 0) countLv++;
    });
    forEach(talentIds, (tl) => {
      const { time, abilityId } = tl;
      if (time <= currentTime) activesTl.push(abilityId);
    });
    setTalentInfo({
      actives: activesTl,
      stats: countLv - abilities.length,
    });
  }, [topInfo, talentIds, currentTime]);

  useEffect(() => {
    const { abilities } = topInfo;
    const abiFull: (AbilityDetail & { time: number })[] = [];
    const tlIds: Ability[] = [];
    forEach(abilities, (abi) => {
      const { abilityId, time } = abi;
      const detailAbility = getDetaiAbility(abilitiesData, abilityId);
      if (!detailAbility) return;
      const { isTalent } = detailAbility;
      if (isTalent) {
        tlIds.push(abi);
      } else {
        abiFull.push({ ...detailAbility, time });
      }
    });
    setTalentIds(tlIds);
    setAbiFull(abiFull);
  }, [topInfo, abilitiesData]);

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <div className="w-[250px] flex items-center">
          <div className="w-[68px]">
            <MyImage
              src={imgInfo.img}
              height="40px"
              width="68px"
              alt={imgInfo.name || ""}
              borderRadius={6}
            />
          </div>
          <div className="ml-2 flex-1">
            {/* <h6 className="one-line-max">{name}</h6> */}
            <span>3-1-1 build</span>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-end">
          <div className="xl:block hidden flex-1">
            <Abilities abiFull={abiFull} />
          </div>
          <div className="w-[36px]">
            <Talent
              idHero={topInfo.heroId}
              talentInfo={talentInfo ? talentInfo : null}
            />
          </div>
        </div>
      </div>
      <div className="xl:hidden w-full mt-2">
        <Abilities abiFull={abiFull} />
      </div>
    </>
  );
};

export default TopInfo;
