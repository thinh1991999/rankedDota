import React, { useState } from "react";
import { HeroPageAll } from "../../interfaces/type";
import { useAppSelector } from "../../store";
import MyImage from "../MyImage";
import HeroType from "./HeroType";

const HeroAllContainer = ({ data }: { data: HeroPageAll }) => {
  const theme = useAppSelector((state) => state.theme.theme);

  const [searchValue, setSearchValue] = useState("");

  return (
    <section className={`${theme.text.main} container m-auto px-[20px]`}>
      <div className="flex justify-between items-end">
        <div className="flex items-center justify-start ">
          <div className="p-5 bg-neutral">
            <MyImage src="/hero.svg" height={30} width={30} alt="hero" />
          </div>
          <h5 className="text-2xl font-bold ml-2">Heroes</h5>
        </div>
        <div className="">
          <form action="">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              placeholder="Search hero"
              className="px-3 py-2 border-[2px] border-solid border-gray-500 rounded-md focus:border-blue-500"
            />
          </form>
        </div>
      </div>
      <div className="">
        <HeroType
          data={data.str}
          searchValue={searchValue}
          img="/str.svg"
          title="STRENGTH"
        />
        <HeroType
          data={data.agi}
          searchValue={searchValue}
          img="/agi.svg"
          title="AGILITY"
        />
        <HeroType
          data={data.int}
          searchValue={searchValue}
          img="/int.svg"
          title="INTELLIGENCE"
        />
      </div>
    </section>
  );
};

export default HeroAllContainer;
