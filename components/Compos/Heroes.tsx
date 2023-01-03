import React, { useEffect, useState } from "react";
import { Hero } from "../../interfaces/heroes";
import { useAppSelector } from "../../store";
import forEach from "lodash/forEach";
import HeroesType from "./HeroesType";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
type HeroPageAll = {
  agi: Hero[];
  str: Hero[];
  int: Hero[];
};
const Heroes = () => {
  const heroes = useAppSelector((state) => state.globalData.heroes);
  const [data, setData] = useState<HeroPageAll>({
    str: [],
    agi: [],
    int: [],
  });
  const [searchValue, setSearchValue] = useState<string>("");
  useEffect(() => {
    const heroAll: HeroPageAll = {
      str: [],
      agi: [],
      int: [],
    };
    forEach(heroes, (hero: Hero) => {
      const { stats } = hero;
      if (stats?.primaryAttribute === "str") {
        heroAll.str.push(hero);
      } else if (stats?.primaryAttribute === "agi") {
        heroAll.agi.push(hero);
      } else {
        heroAll.int.push(hero);
      }
    });
    setData(heroAll);
  }, [heroes]);

  return (
    <div>
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
            className="ml-2 dark:text-textPrimary-dark text-textPrimary-light"
          />
          {searchValue.length > 0 && (
            <button
              onClick={() => setSearchValue("")}
              className="text-textSecondPrimary-dark hover:text-textPrimary-dark"
            >
              <AiOutlineClose />
            </button>
          )}
        </form>
      </div>
      <div className="my-3">
        <HeroesType
          data={data.str}
          searchValue={searchValue}
          img="/str.svg"
          title="STRENGTH"
        />
      </div>
      <div className="my-3">
        <HeroesType
          data={data.agi}
          searchValue={searchValue}
          img="/agi.svg"
          title="AGILITY"
        />
      </div>
      <div className="my-3">
        <HeroesType
          data={data.int}
          searchValue={searchValue}
          img="/int.svg"
          title="INTELLIGENCE"
        />
      </div>
    </div>
  );
};

export default Heroes;
