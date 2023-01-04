import React, { useState, useEffect } from "react";
import Link from "next/link";
import forEach from "lodash/forEach";
import orderBy from "lodash/orderBy";
import MyImage from "../../MyImage";
import { useAppSelector } from "../../../store/hook";
import { Hero, HeroesPos } from "../../../interfaces/heroes";
import { getDetaiHero, getImgOpenDota, nFormatter } from "../../../share";

type Position = {
  hero: Hero;
  wr: number;
  matches: number;
};

const PosRender = ({ pos, showAll }: { pos: Position[]; showAll: boolean }) => {
  return (
    <>
      {pos.map((pos, idx) => {
        if (!showAll && idx > 2) return;
        const { wr, hero, matches } = pos;
        const { displayName, shortName, id } = hero;
        const img = getImgOpenDota(
          `/apps/dota2/images/dota_react/heroes/${shortName}.png`
        );
        return (
          <Link href={"/heroes/" + id} key={idx}>
            <a>
              <div className="relative bg-layer-light dark:bg-layer-dark rounded-md my-2 border border-solid border-borderSecondary-light dark:border-borderTender-dark cursor-pointer group ">
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-black opacity-40 dark:group-hover:opacity-0 group-hover:opacity-20 "></div>
                <div className="relative p-2 overflow-hidden">
                  <div className="absolute top-0 left-0 bottom-0 right-0 blur-3xl grayscale-[0.3]">
                    <MyImage src={img} width="100%" height="100%" alt="" />
                  </div>
                  <div className="relative flex justify-between items-center ">
                    <div className="w-[30px] h-[35px] bg-layerStrong-dark rounded-md flex items-center justify-center text-sm">
                      <span>{idx + 1}</span>
                    </div>
                    <span className="one-line-max mx-3 text-sm font-bold">
                      {displayName}
                    </span>
                    <MyImage
                      src={img}
                      width="60px"
                      height="40px"
                      alt=""
                      borderRadius={6}
                    />
                  </div>
                </div>
                <div className="relative p-2 flex justify-center items-center text-textSecondPrimary-dark text-sm">
                  <span
                    className={`${
                      wr >= 50
                        ? "text-blue-700 dark:text-blue-500"
                        : "text-red-700 dark:text-red-500"
                    } mr-5`}
                  >
                    {wr.toFixed(1)}%
                  </span>
                  <span>{nFormatter(matches, 1)}</span>
                </div>
              </div>
            </a>
          </Link>
        );
      })}
    </>
  );
};

const Content = () => {
  const heroes = useAppSelector((state) => state.globalData.heroes);
  const heroesPositions = useAppSelector(
    (state) => state.heroesPositions.heroesPositions
  );
  const [pos1, setPos1] = useState<Position[]>([]);
  const [pos2, setPos2] = useState<Position[]>([]);
  const [pos3, setPos3] = useState<Position[]>([]);
  const [pos4, setPos4] = useState<Position[]>([]);
  const [pos5, setPos5] = useState<Position[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    if (!heroesPositions) return;
    const getPos = (pos: HeroesPos): Position[] => {
      const result: Position[] = [];
      const { winDay } = pos;
      forEach(winDay, (w) => {
        const { heroId, matchCount, winCount } = w;
        const herDetail = getDetaiHero(heroes, heroId);
        const wr = (winCount * 100) / matchCount;
        if (herDetail) {
          result.push({ hero: herDetail, wr, matches: matchCount });
        }
      });
      return orderBy(result, (r) => r.wr, "desc");
    };
    const { heroesPos1, heroesPos2, heroesPos3, heroesPos4, heroesPos5 } =
      heroesPositions;
    setPos1(getPos(heroesPos1));
    setPos2(getPos(heroesPos2));
    setPos3(getPos(heroesPos3));
    setPos4(getPos(heroesPos4));
    setPos5(getPos(heroesPos5));
  }, [heroesPositions, heroes]);

  return (
    <div className="">
      <div className="flex items-center w-[1240px] -ml-2 -mr-2">
        <div className="w-1/5 p-2 flex flex-col">
          <PosRender pos={pos1} showAll={showAll} />
        </div>
        <div className="w-1/5 p-2 flex flex-col">
          <PosRender pos={pos2} showAll={showAll} />
        </div>
        <div className="w-1/5 p-2 flex flex-col">
          <PosRender pos={pos3} showAll={showAll} />
        </div>
        <div className="w-1/5 p-2 flex flex-col">
          <PosRender pos={pos4} showAll={showAll} />
        </div>
        <div className="w-1/5 p-2 flex flex-col">
          <PosRender pos={pos5} showAll={showAll} />
        </div>
      </div>
      {!showAll && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="text-textSecondPrimary-light dark:text-textSecondPrimary-dark hover:opacity-80 px-2 py-1 rounded-md bg-layer-light dark:bg-layer-dark"
          >
            Show All Heroes
          </button>
        </div>
      )}
    </div>
  );
};

export default Content;
