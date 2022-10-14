import React, { memo, ReactNode } from "react";
import uniqid from "uniqid";
import ToolTip from "./ToolTip";
import { getDetaiHero, getImgStratsDota } from "../share/ultils";
import { useAppSelector } from "../store/hook";
import MyImage from "./MyImage";

const HeroIcon = ({
  showTooltip = true,
  id,
  gray,
  size = 30,
  filterClass,
  tooltip,
  player,
}: {
  showTooltip?: boolean;
  id: number;
  gray?: boolean;
  size?: number;
  filterClass?: string;
  tooltip?: ReactNode;
  player?: string;
}) => {
  const heroes = useAppSelector((state) => state.globalData.heroes);
  const detailHero = getDetaiHero(heroes, id);
  if (!detailHero) {
    return <></>;
  }
  const { shortName } = detailHero;
  const heroIcon = getImgStratsDota("/heroes/" + shortName + "_icon.png");
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {showTooltip ? (
        <ToolTip
          target={
            <div
              className={`${
                gray ? "grayscale" : "grayscale-0"
              } ${filterClass} flex justify-center items-center `}
            >
              <MyImage
                src={heroIcon}
                width={size + "px"}
                height={size + "px"}
                alt={shortName}
              />
            </div>
          }
          tooltip={
            tooltip ? (
              <>
                {tooltip} as {detailHero.displayName}
              </>
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
          } ${filterClass} flex justify-center items-center `}
        >
          <MyImage
            src={heroIcon}
            width={size + "px"}
            height={size + "px"}
            alt={shortName}
          />
        </div>
      )}
    </div>
  );
};

export default memo(HeroIcon);
