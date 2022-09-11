import React from "react";
import MyImage from "../MyImage";
import { HeroSortType } from "../../interfaces/type";
import HeroIcon from "./HeroIcon";

const HeroType = ({
  data,
  searchValue,
  img,
  title,
}: {
  data: HeroSortType[];
  searchValue: string;
  img: string;
  title: string;
}) => {
  return (
    <section className="my-5">
      <div className="flex items-center">
        <MyImage src={img} alt="int" width={15} height={15} />
        <h6 className="ml-2">{title}</h6>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(42px,1fr))] gap-2 mt-3">
        {data.map((item) => {
          const checkSearch =
            searchValue.length > 0
              ? item.displayName
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
              : true;
          return (
            <HeroIcon key={item.id} data={item} checkSearch={checkSearch} />
          );
        })}
      </div>
    </section>
  );
};

export default HeroType;
