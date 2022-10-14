import React, { memo } from "react";
import uniqid from "uniqid";
import ToolTip from "./ToolTip";
import { getTypeOfHero } from "../share/ultils";
import MyImage from "./MyImage";

const IconTypeRole = ({
  role,
  lane,
  gray,
  width = 24,
  height = 18,
  filterClass,
}: {
  role: string;
  lane: string;
  gray?: boolean;
  width?: number;
  height?: number;
  filterClass?: string;
}) => {
  const roleDetail = getTypeOfHero(role, lane);
  if (!roleDetail) {
    return <></>;
  }
  const { name, icon } = roleDetail;
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <ToolTip
        target={
          <div
            className={`${
              gray ? "grayscale" : "grayscale-0"
            } ${filterClass} flex justify-center items-center `}
          >
            <MyImage
              src={icon}
              width={width + "px"}
              height={height + "px"}
              alt={name}
            />
          </div>
        }
        tooltip={
          <div className="px-2 py-1 rounded-sm flex items-center justify-center">
            <span>{name}</span>
          </div>
        }
        id={uniqid()}
      />
    </div>
  );
};

export default memo(IconTypeRole);
