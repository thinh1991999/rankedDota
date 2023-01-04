import forEach from "lodash/forEach";
import React, { useState, useEffect } from "react";
import { Talent } from "../../../../interfaces/heroes";
import { useAppSelector } from "../../../../store";

const TalentDetail = ({
  idHero,
  talentInfo,
}: {
  idHero: number;
  talentInfo: {
    actives: number[];
    stats: number;
  } | null;
}) => {
  const [talents, setTalents] = useState<Talent[]>([]);
  const heroes = useAppSelector((state) => state.globalData.heroes);
  const [treeActive, setTreeActive] = useState<{
    slotActives: number[];
    stats: number;
  }>({
    slotActives: [],
    stats: 0,
  });

  useEffect(() => {
    forEach(heroes, (hero) => {
      if (hero.id === idHero) {
        setTalents(hero.talents);
      }
    });
  }, [heroes, idHero]);

  return <div>{/* <TalentTree />  */}</div>;
};

export default TalentDetail;
