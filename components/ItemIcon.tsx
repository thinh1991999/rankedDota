import React, { memo } from "react";
import uniqid from "uniqid";
import dynamic from "next/dynamic";
import { getImgStratsDota, getDetailItem } from "../share/ultils";
import { useAppSelector } from "../store/hook";
import MyImage from "./MyImage";

const ToolTip = dynamic(() => import("./ToolTip"), {
  ssr: false,
});

const ItemIcon = ({
  id,
  gray,
  width = "100%",
  height = "100%",
  filterClass,
}: {
  id: number;
  gray?: boolean;
  width?: string;
  height?: string;
  filterClass?: string;
}) => {
  const items = useAppSelector((state) => state.globalData.items);
  const detailItem = getDetailItem(items, id);
  if (!detailItem) {
    return <></>;
  }
  const { shortName, displayName } = detailItem;
  const itemIcon = getImgStratsDota(`/items/${shortName}.png`);
  return (
    <ToolTip
      target={
        // ${filterClass}
        <div
          className={`${
            gray ? "grayscale" : "grayscale-0"
          }  flex justify-center items-center `}
        >
          <MyImage
            src={itemIcon}
            width={width}
            height={height}
            alt={shortName}
          />
        </div>
      }
      tooltip={
        <div className="px-3 py-2 rounded-sm flex items-center">
          <MyImage
            src={itemIcon}
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
