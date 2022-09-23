import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { getDetaiHero, getImgStratsDota, nFormatter } from "../../share/ultils";
import { useAppSelector } from "../../store/hook";
import {
  Advantage,
  Hero,
  HeroVsHeroMatchup,
  MatchupDetail,
} from "../../interfaces/heroes";
import MyImage from "../MyImage";
import ToolTip from "../ToolTip";
import uniqid from "uniqid";
import HeroIcon from "../HeroIcon";

const MatchUp = ({
  matchupsDetail,
  hero,
  total,
  advantage,
}: {
  matchupsDetail: MatchupDetail[];
  hero: Hero;
  total: number;
  advantage: boolean;
}) => {
  const heroes = useAppSelector((state) => state.globalData.heroes);

  return (
    <div className="flex justify-between">
      {matchupsDetail.map((matchUp, idx) => {
        const { heroId2, synergy, winCount, matchCount } = matchUp;
        const detailHero = getDetaiHero(heroes, heroId2);
        if (detailHero) {
          const { displayName, shortName } = detailHero;
          const pr = ((matchCount * 1000) / total).toFixed(0);
          const wr = ((winCount * 100) / matchCount).toFixed(1);
          const heroIcon = getImgStratsDota(
            "/heroes/" + shortName + "_icon.png"
          );
          return (
            <div key={idx} className="">
              <ToolTip
                target={
                  <div className="flex flex-col justify-center items-center">
                    <MyImage
                      src={heroIcon}
                      width={30}
                      height={30}
                      alt={shortName}
                    />
                    <div className="my-2 relative h-[2px] w-full rounded-sm bg-borderSecondary-dark">
                      <div
                        className={`absolute left-0 top-0 bottom-0 bg-yellow-500 rounded-sm`}
                        style={{
                          width: `${pr}%`,
                        }}
                      ></div>
                    </div>
                    <span
                      className={`${
                        advantage ? "text-green-500" : "text-red-500"
                      } text-sm `}
                    >
                      {advantage ? "+" : ""}
                      {synergy.toFixed(1)}
                    </span>
                  </div>
                }
                tooltip={
                  <div className="rounded-md bg-black min-w-[200px] border border-borderSecondary-dark">
                    <div className="p-2 border-b border-borderSecondary-dark">
                      <p className="text-center">
                        {hero.displayName} <span>vs</span> {displayName}
                      </p>
                    </div>
                    <div className="p-2">
                      <div className="flex justify-between">
                        <span>Win Rate</span>
                        <span
                          className={`${
                            advantage ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {wr}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Match Count</span>
                        <span className="text-yellow-500">
                          {nFormatter(matchCount, 1)}
                        </span>
                      </div>
                    </div>
                  </div>
                }
                id={uniqid()}
              />
            </div>
          );
        }
      })}
    </div>
  );
};

const MatchUps = ({
  heroVsHeroMatchup,
  hero,
}: {
  heroVsHeroMatchup: HeroVsHeroMatchup;
  hero: Hero;
}) => {
  const heroes = useAppSelector((state) => state.globalData.heroes);

  const navs = useRef<string[]>(["Against", "With"]).current;
  const [currentNav, setCurrentNav] = useState<number>(0);
  const [advantage, setAdvantage] = useState<MatchupDetail[]>([]);
  const [disAdvantage, setDisAdvantage] = useState<MatchupDetail[]>([]);
  const [totalMatch, setTotalMatch] = useState<number>(0);

  useEffect(() => {
    let total = 0;
    const getSort = (arr: MatchupDetail[], type: "desc" | "asc") => {
      return _.orderBy(
        arr,
        (item) => {
          return item.winCount / item.matchCount;
        },
        type
      );
    };
    const { advantage, disadvantage } = heroVsHeroMatchup;
    _.forEach(advantage[0].vs, (match) => {
      total += match.matchCount;
    });
    const vsAdvantage =
      currentNav === 0
        ? getSort(advantage[0].vs, "desc")
        : getSort(advantage[0].with, "desc");
    const vsDisadvantage =
      currentNav === 0
        ? getSort(disadvantage[0].vs, "asc")
        : getSort(disadvantage[0].with, "asc");
    setAdvantage(vsAdvantage.slice(0, 3));
    setDisAdvantage(vsDisadvantage.slice(0, 3));
    setTotalMatch(total);
  }, [heroVsHeroMatchup, currentNav]);
  return (
    <section className="p-2 h-full flex flex-col bg-layer-dark rounded-md">
      <div className="flex justify-between">
        <h6 className="text-xl font-bold">Matchups</h6>
        <ul className="flex items-center ">
          {navs.map((nav, idx) => {
            return (
              <li
                key={nav}
                onClick={() => setCurrentNav(idx)}
                className={`${
                  idx === currentNav
                    ? "bg-gray-800 border-gray-400"
                    : "bg-gray-700 opacity-40"
                } ${
                  idx === 0
                    ? "rounded-tl-2xl rounded-bl-2xl"
                    : "rounded-tr-2xl rounded-br-2xl"
                } hover:bg-gray-800 hover:opacity-100 border px-[15px] py-[3px] capitalize text-sm cursor-pointer`}
              >
                {nav}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="py-5 flex justify-between">
        <div className="flex-1">
          <MatchUp
            matchupsDetail={advantage}
            hero={hero}
            total={totalMatch}
            advantage={true}
          />
        </div>
        <div className="w-20 flex justify-center">
          <div className="h-full w-[1px] bg-borderSecondary-dark mx-2"></div>
          <div className="h-full w-[1px] bg-borderSecondary-dark mx-2"></div>
        </div>
        <div className="flex-1">
          <MatchUp
            matchupsDetail={disAdvantage}
            hero={hero}
            total={totalMatch}
            advantage={false}
          />
        </div>
      </div>
      <div className="flex-1 flex justify-between items-center">
        <span className="w-[100px] text-sm block">Best against</span>
        <div className="h-[1px]  flex-1 bg-borderSecondary-dark"></div>
        <div className="mx-5">
          <HeroIcon id={hero.id} size={20} />
        </div>
        <div className="h-[1px] flex-1 bg-borderSecondary-dark"></div>
        <span className="w-[100px] text-sm block text-end">Worst against</span>
      </div>
    </section>
  );
};

export default MatchUps;
