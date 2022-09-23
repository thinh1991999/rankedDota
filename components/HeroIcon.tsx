import React, { memo } from "react";
import uniqid from "uniqid";
import ToolTip from "./ToolTip";
import { getDetaiHero, getImgStratsDota } from "../share/ultils";
import { useAppSelector } from "../store/hook";
import MyImage from "./MyImage";

const HeroIcon = ({
  id,
  gray,
  size = 30,
}: {
  id: number;
  gray?: boolean;
  size?: number;
}) => {
  const heroes = useAppSelector((state) => state.globalData.heroes);
  const detailHero = getDetaiHero(heroes, id);
  if (!detailHero) {
    return <></>;
  }
  const { shortName } = detailHero;
  const heroIcon = getImgStratsDota("/heroes/" + shortName + "_icon.png");
  return (
    <ToolTip
      target={
        <div
          className={`${
            gray ? "grayscale" : "grayscale-0"
          } flex justify-center items-center`}
        >
          <MyImage src={heroIcon} width={size} height={size} alt={shortName} />
        </div>
      }
      tooltip={
        <span className="px-3 py-2 rounded-sm">{detailHero.displayName}</span>
      }
      id={uniqid()}
    />
  );
};

export default memo(HeroIcon);
