import React from "react";
import { useState } from "react";
import ReactTooltip from "react-tooltip";
import { HeroSortType } from "../../interfaces/heroes";
import MyImage from "../MyImage";
import { getImgStratsDota } from "../../share/ultils";
import Link from "next/link";

const HeroIcon = ({
  data,
  checkSearch,
}: {
  data: HeroSortType;
  checkSearch: boolean;
}) => {
  const [tooltip, showTooltip] = useState(true);
  return (
    <>
      <Link href={`/heroes/${data.id.toString()}`}>
        <a
          data-tip
          data-for={data.id.toString()}
          onMouseEnter={() => showTooltip(true)}
          onMouseLeave={() => {
            showTooltip(false);
            setTimeout(() => showTooltip(true), 100);
          }}
          className="hover:scale-125 hover:z-10 relative cursor-pointer transition-all ease-linear duration-[0.2s]"
        >
          <div className="">
            <MyImage
              src={getImgStratsDota(`/heroes/${data.shortName}_vert.png`)}
              width={42}
              height={60}
              alt={data.name}
              borderRadius={5}
            />
          </div>
          {!checkSearch && (
            <div className="absolute top-0 left-0 bottom-0 right-0 bg-black opacity-80"></div>
          )}
        </a>
      </Link>
      {tooltip && (
        <ReactTooltip
          id={data.id.toString()}
          backgroundColor="#00f4ff"
          type="warning"
          effect="solid"
        >
          <span className="text-black font-bold">{data.displayName}</span>
        </ReactTooltip>
      )}
    </>
  );
};

export default HeroIcon;
