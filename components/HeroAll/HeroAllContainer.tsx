import _ from "lodash";
import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Hero, HeroesStatus, HeroStatus } from "../../interfaces/heroes";
import { useAppSelector } from "../../store";
import MyImage from "../MyImage";
import ToolTip from "../ToolTip";
import HeroType from "./HeroType";

type HeroPageAll = {
  agi: Hero[];
  str: Hero[];
  int: Hero[];
};

const HeroAllContainer = ({ heroesStatus }: { heroesStatus: HeroesStatus }) => {
  const heroes = useAppSelector((state) => state.globalData.heroes);
  const [data, setData] = useState<HeroPageAll>({
    str: [],
    agi: [],
    int: [],
  });
  const [metaHeroes, setMetaHeroes] = useState<number[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchMeta, setSearchMeta] = useState<boolean>(false);
  useEffect(() => {
    const getCountMatch = (arr: HeroStatus[], id: number): number => {
      const filterHero = _.filter(POSITION_1, (item) => item.heroId === id);
      return filterHero.length > 0 ? filterHero[0].matchCount : 0;
    };
    const heroAll: HeroPageAll = {
      str: [],
      agi: [],
      int: [],
    };
    const metaArr: number[] = [];
    const { POSITION_1, POSITION_2, POSITION_3, POSITION_4, POSITION_5 } =
      heroesStatus;
    _.forEach(heroes, (hero: Hero) => {
      const { id } = hero;
      let countMatch: number = 0;
      countMatch += getCountMatch(POSITION_1, id);
      countMatch += getCountMatch(POSITION_2, id);
      countMatch += getCountMatch(POSITION_3, id);
      countMatch += getCountMatch(POSITION_4, id);
      countMatch += getCountMatch(POSITION_5, id);
      if (countMatch >= 10000) metaArr.push(id);
      const { stats } = hero;
      if (stats.primaryAttribute === "str") {
        heroAll.str.push(hero);
      } else if (stats.primaryAttribute === "agi") {
        heroAll.agi.push(hero);
      } else {
        heroAll.int.push(hero);
      }
    });
    setMetaHeroes(metaArr);
    setData(heroAll);
  }, [heroes, heroesStatus]);
  return (
    <section>
      <div className="flex justify-center">
        <form
          className="flex items-center px-3 py-2 border-[2px] border-solid border-gray-500 focus-within:border-blue-500 rounded-md"
          onSubmit={(e) => e.preventDefault()}
        >
          <AiOutlineSearch className="text-2xl" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            placeholder="Search heroes"
            className="ml-2"
          />
        </form>
        <div className=" flex justify-center items-center">
          <ToolTip
            target={
              <button
                onClick={() => setSearchMeta(!searchMeta)}
                className={`${
                  searchMeta ? "" : "grayscale"
                } h-full w-[44px] ml-2 rounded-md bg-neutral-dark flex justify-center items-center`}
              >
                <MyImage
                  src="/metaIcon.svg"
                  width="20px"
                  height="20px"
                  alt="meta"
                />
              </button>
            }
            tooltip={<span>Toggle hero meta</span>}
            id="metaBtn"
          />
        </div>
      </div>
      <div className="my-3">
        <HeroType
          data={data.str}
          metaHeroes={metaHeroes}
          searchValue={searchValue}
          searchMeta={searchMeta}
          img="/str.svg"
          title="STRENGTH"
        />
      </div>
      <div className="my-3">
        <HeroType
          data={data.agi}
          metaHeroes={metaHeroes}
          searchValue={searchValue}
          searchMeta={searchMeta}
          img="/agi.svg"
          title="AGILITY"
        />
      </div>
      <div className="my-3">
        <HeroType
          data={data.int}
          metaHeroes={metaHeroes}
          searchValue={searchValue}
          searchMeta={searchMeta}
          img="/int.svg"
          title="INTELLIGENCE"
        />
      </div>
    </section>
  );
};

export default HeroAllContainer;
