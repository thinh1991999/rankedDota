import _ from "lodash";
import uniqid from "uniqid";
import React, { useState, useEffect, memo } from "react";
import { AbilityDetail, Talent } from "../interfaces/heroes";
import { getDetaiAbility } from "../share";
import { useAppSelector } from "../store/hook";
import TalentTree from "./TalentTree";
import ToolTip from "./ToolTip";

const ToolTipTree = memo(function ToolTipTree({
  talents,
  treeActive,
}: {
  talents: (AbilityDetail & Talent)[];
  treeActive: {
    slotActives: number[];
    stats: number;
  };
}) {
  // console.log("ToolTipTree");
  return (
    <div className="flex items-center w-[500px]">
      <div className="flex-1 flex flex-col-reverse">
        {talents.map((talent, idx) => {
          if (idx % 2 === 0) return;
          const {
            slot,
            abilityId,
            language: { displayName },
          } = talent;
          let checked: boolean = treeActive.slotActives.includes(slot);
          return (
            <div key={abilityId} className="flex justify-center">
              <span
                className={`${
                  checked
                    ? "text-textMain-dark"
                    : "text-textSecondPrimary-dark opacity-30"
                } text-xs text-center`}
              >
                {displayName}
              </span>
            </div>
          );
        })}
      </div>
      {/* <TalentTree size={50} treeActive={treeActive} /> */}
      <div className="flex-1 flex flex-col-reverse">
        {talents.map((talent, idx) => {
          if (idx % 2 !== 0) return;
          const {
            slot,
            abilityId,
            language: { displayName },
          } = talent;
          let checked: boolean = treeActive.slotActives.includes(slot);
          return (
            <div key={abilityId} className="flex justify-center">
              <span
                className={`${
                  checked
                    ? "text-textMain-dark"
                    : "text-textSecondPrimary-dark opacity-30"
                } text-xs text-center`}
              >
                {displayName}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
});

const Talent = ({
  idHero,
  talentInfo,
}: {
  idHero: number;
  talentInfo: {
    actives: number[];
    stats: number;
  } | null;
}) => {
  const heroes = useAppSelector((state) => state.globalData.heroes);
  const abilitiesData = useAppSelector(
    (state) => state.globalData.abilitiesData
  );
  const [talents, setTalents] = useState<(AbilityDetail & Talent)[]>([]);
  const [treeActive, setTreeActive] = useState<{
    slotActives: number[];
    stats: number;
  }>({
    slotActives: [],
    stats: 0,
  });

  useEffect(() => {
    const arrTl: (AbilityDetail & Talent)[] = [];
    _.forEach(heroes, (hero) => {
      if (hero.id === idHero) {
        _.forEach(hero.talents, (tl) => {
          const detailAbi = getDetaiAbility(abilitiesData, tl.abilityId);
          if (detailAbi) {
            arrTl.push({ ...tl, ...detailAbi });
          }
        });
        return false;
      }
    });
    setTalents(arrTl);
  }, [heroes, idHero, abilitiesData]);

  useEffect(() => {
    if (talents.length === 0 || !talentInfo) return;
    const trees: number[] = [];
    _.forEach(talents, (tl) => {
      const { abilityId, slot } = tl;
      if (talentInfo.actives.includes(abilityId)) {
        trees.push(slot);
      }
    });
    setTreeActive({
      slotActives: trees,
      stats: talentInfo.stats,
    });
  }, [talents, talentInfo]);

  return (
    <ToolTip
      target={<TalentTree treeActive={treeActive} />}
      tooltip={
        <div className="p-2 rounded-md">
          <ToolTipTree talents={talents} treeActive={treeActive} />
        </div>
      }
      id={uniqid()}
    />
  );
};

export default memo(Talent);
