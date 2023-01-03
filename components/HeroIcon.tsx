import dynamic from "next/dynamic";
import React, { memo, ReactNode } from "react";
import uniqid from "uniqid";
import { getDetaiHero, getImgStratsDota } from "../share/ultils";
import { useAppSelector } from "../store/hook";
import MyImage from "./MyImage";

const ToolTip = dynamic(() => import("./ToolTip"), {
  loading: () => <></>,
});

const HeroIcon = ({
  showTooltip = true,
  id,
  gray,
  size = 30,
  filterClass,
  tooltip,
  player,
  full,
}: {
  showTooltip?: boolean;
  id: number;
  gray?: boolean;
  size?: number;
  filterClass?: string;
  tooltip?: ReactNode;
  player?: string;
  full?: boolean;
}) => {
  const heroes = useAppSelector((state) => state.globalData.heroes);
  const detailHero = getDetaiHero(heroes, id);
  if (!detailHero) {
    return <></>;
  }
  const { shortName } = detailHero;
  const heroIcon = getImgStratsDota("/heroes/" + shortName + "_icon.png");
  const finalSize = full ? "100%" : size + "px";
  return (
    <div
      style={{
        width: finalSize,
        height: finalSize,
      }}
    >
      {showTooltip ? (
        <ToolTip
          target={
            <div
              className={`${
                gray ? "grayscale" : "grayscale-0"
              } w-full h-full flex justify-center items-center ${filterClass}`}
            >
              <MyImage
                src={heroIcon}
                width={finalSize}
                height={finalSize}
                alt={shortName}
              />
            </div>
          }
          tooltip={
            tooltip ? (
              <>{tooltip}</>
            ) : (
              <span className="px-3 py-2 rounded-sm">
                {detailHero.displayName}
              </span>
            )
          }
          id={uniqid()}
        />
      ) : (
        <div
          className={`${
            gray ? "grayscale" : "grayscale-0"
          } w-full h-full flex justify-center items-center ${filterClass}`}
        >
          <MyImage
            src={heroIcon}
            width={finalSize}
            height={finalSize}
            alt={shortName}
          />
        </div>
      )}
    </div>
  );
};

export default memo(HeroIcon);
