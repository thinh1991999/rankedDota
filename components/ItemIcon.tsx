import React, { memo } from "react";
import uniqid from "uniqid";
import ToolTip from "./ToolTip";
import { getImgStratsDota, getDetailItem } from "../share/ultils";
import { useAppSelector } from "../store/hook";
import MyImage from "./MyImage";

const ItemIcon = ({
  id,
  gray,
  width = 24,
  height = 18,
  filterClass,
}: {
  id: number;
  gray?: boolean;
  width?: number;
  height?: number;
  filterClass?: string;
}) => {
  const items = useAppSelector((state) => state.globalData.items);
  const detailItem = getDetailItem(items, id);
  if (!detailItem) {
    return <></>;
  }
  const { shortName, displayName } = detailItem;
  const heroIcon = getImgStratsDota(`/items/${shortName}.png`);
  return (
    <ToolTip
      target={
        <div
          className={`${
            gray ? "grayscale" : "grayscale-0"
          } ${filterClass} flex justify-center items-center `}
        >
          <MyImage
            src={heroIcon}
            width={width + "px"}
            height={height + "px"}
            alt={shortName}
          />
        </div>
      }
      tooltip={
        <div className="px-3 py-2 rounded-sm flex items-center">
          <MyImage
            src={heroIcon}
            width={"30px"}
            height={"20px"}
            alt={shortName}
          />
          <span className="ml-2">{displayName}</span>
        </div>
      }
      id={uniqid()}
    />
  );
};

export default memo(ItemIcon);
