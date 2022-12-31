import _ from "lodash";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Hero, HeroesStatus, HeroStatus } from "../../../interfaces/heroes";
import { getDetaiHero, getImgStratsDota } from "../../../share";
import { useAppSelector } from "../../../store";
import MyImage from "../../MyImage";

type HeroArr = {
  pos: number;
  namePos: string;
  icon: string;
  hero: Hero | null;
  status: HeroStatus;
  bgFrom: string;
  bgTo: string;
};

const HeroHighWR = ({ heroesStatus }: { heroesStatus: HeroesStatus }) => {
  const heroes = useAppSelector((state) => state.globalData.heroes);
  const [heroArr, setHeroArr] = useState<HeroArr[]>([]);

  useEffect(() => {
    const getMaxHeroWr = (arr: HeroStatus[]): HeroStatus => {
      let result: HeroStatus = arr[0];
      let initWr = 0;
      _.forEach(arr, (hero) => {
        const { matchCount, winCount } = hero;
        const wr = winCount / matchCount;
        if (wr >= initWr && matchCount >= 1500) {
          initWr = wr;
          result = hero;
        }
      });
      return result;
    };
    const p1 = getMaxHeroWr(heroesStatus.POSITION_1);
    const p2 = getMaxHeroWr(heroesStatus.POSITION_2);
    const p3 = getMaxHeroWr(heroesStatus.POSITION_3);
    const p4 = getMaxHeroWr(heroesStatus.POSITION_4);
    const p5 = getMaxHeroWr(heroesStatus.POSITION_5);
    const results: HeroArr[] = [];
    results.push({
      pos: 1,
      namePos: "safe lane",
      icon: "",
      hero: getDetaiHero(heroes, p1.heroId),
      status: p1,
      bgFrom: "from-[#5E6FCF]",
      bgTo: "to-[#4152A4]",
    });
    results.push({
      pos: 2,
      namePos: "mid lane",
      icon: "",
      hero: getDetaiHero(heroes, p2.heroId),
      status: p2,
      bgFrom: "from-[#2995A3]",
      bgTo: "to-[#32838F]",
    });
    results.push({
      pos: 3,
      namePos: "off lane",
      icon: "",
      hero: getDetaiHero(heroes, p3.heroId),
      status: p3,
      bgFrom: "from-[#d27f19]",
      bgTo: "to-[#a76611]",
    });
    results.push({
      pos: 4,
      namePos: "soft support",
      icon: "",
      hero: getDetaiHero(heroes, p4.heroId),
      status: p4,
      bgFrom: "from-[#af6118]",
      bgTo: "to-[#cb3a76]",
    });
    results.push({
      pos: 5,
      namePos: "hard support",
      icon: "",
      hero: getDetaiHero(heroes, p5.heroId),
      status: p5,
      bgFrom: "from-[#54a081]",
      bgTo: "to-[#107f56]",
    });
    setHeroArr(results);
  }, [heroesStatus, heroes]);

  return (
    <section>
      <div className="flex flex-wrap -ml-2 -mr-2">
        {heroArr.map((item) => {
          const { pos, namePos, hero, status, bgFrom, bgTo } = item;
          if (!hero) return;
          const { shortName, displayName, id } = hero;
          const { matchCount, winCount } = status;
          const wr = (winCount * 100) / matchCount;
          const img = getImgStratsDota("/heroes/" + shortName + "_model.png");
          return (
            <div key={pos} className="lg:w-1/5 md:w-1/3 sm:w-1/2 w-full p-2 ">
              <Link href={"/heroes/" + id}>
                <a className="group relative block rounded-md overflow-hidden border border-borderSecondary-light dark:border-borderSecondary-dark">
                  <div
                    className={`bg-gradient-to-l ${bgFrom} ${bgTo} group-hover:opacity-50 opacity-30 absolute top-0 left-0 right-0 bottom-0 `}
                  ></div>
                  <div
                    className={`h-[16px] bg-gradient-to-l ${bgFrom} ${bgTo} opacity-10 absolute left-0 bottom-0 right-0`}
                  ></div>
                  <div className={`flex items-center justify-between px-2 `}>
                    <div className="flex flex-col">
                      <span className="capitalize text-sm">{namePos}</span>
                      <h6 className="font-bold text-lg">{displayName}</h6>
                      <span className="mt-1 text-lg font-bold text-green-500">
                        {wr.toFixed(2)}%
                      </span>
                      <span className="capitalize text-xs">win rate</span>
                    </div>
                    <MyImage
                      src={img}
                      width="140px"
                      height="140px"
                      alt={shortName}
                    />
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HeroHighWR;
