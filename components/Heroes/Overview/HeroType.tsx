import React from "react";
import Link from "next/link";
import MyImage from "../../MyImage";
import { Hero } from "../../../interfaces/heroes";
import { getImgStratsDota } from "../../../share";
import ToolTip from "../../ToolTip";

const HeroType = ({
  data,
  metaHeroes,
  searchValue,
  searchMeta,
  img,
  title,
}: {
  data: Hero[];
  metaHeroes: number[];
  searchValue: string;
  searchMeta: boolean;
  img: string;
  title: string;
}) => {
  return (
    <section>
      <div className="flex items-center">
        <MyImage src={img} alt="int" width="15px" height="15px" />
        <h6 className="ml-2">{title}</h6>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(44px,1fr))] gap-2 mt-3">
        {data.map((item) => {
          const { displayName, id, shortName, name } = item;
          const isMeta = metaHeroes.includes(id);
          let checkSearch = true;
          if (searchValue.length > 0 && !searchMeta) {
            checkSearch = displayName
              .toLowerCase()
              .includes(searchValue.toLowerCase());
          }
          if (searchMeta) {
            checkSearch =
              displayName.toLowerCase().includes(searchValue.toLowerCase()) &&
              isMeta;
          }
          return (
            <>
              <ToolTip
                key={id}
                target={
                  <Link href={`/heroes/${id.toString()}`}>
                    <a
                      data-tip
                      data-for={id.toString()}
                      className={`${
                        isMeta && checkSearch
                          ? "border-yellow-500 border border-solid rounded-[5px]"
                          : ""
                      } block hover:scale-125 hover:z-10 relative cursor-pointer transition-all ease-linear duration-[0.2s]`}
                    >
                      <div className="">
                        <MyImage
                          src={getImgStratsDota(
                            `/heroes/${shortName}_vert.png`
                          )}
                          width="42px"
                          height="60px"
                          alt={name}
                          borderRadius={5}
                        />
                      </div>
                      {isMeta && (
                        <div className="absolute top-0 right-0">
                          <MyImage
                            src="metaIcon.svg"
                            width="15px"
                            height="15px"
                            alt="meta"
                          />
                        </div>
                      )}
                      {!checkSearch && (
                        <div className="absolute top-0 left-0 bottom-0 right-0 z-[10] rounded-[5px] bg-black opacity-80"></div>
                      )}
                    </a>
                  </Link>
                }
                tooltip={
                  <div className="px-3 py-2 rounded-md text-black font-bold bg-[#00f4ff]">
                    {displayName}
                  </div>
                }
                id={id}
              />
            </>
          );
        })}
      </div>
    </section>
  );
};

export default HeroType;
