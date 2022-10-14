import React, { memo } from "react";
import uniqid from "uniqid";
import { AbilityDetail } from "../../../../interfaces/heroes";
import {
  getImgStratsDota,
  useGetTimeCurrentMatchDetail,
} from "../../../../share";
import MyImage from "../../../MyImage";
import ToolTip from "../../../ToolTip";

const Abilities = ({
  abiFull,
}: {
  abiFull: (AbilityDetail & { time: number })[];
}) => {
  const currentTime = useGetTimeCurrentMatchDetail();

  return (
    <div className="flex  overflow-hidden">
      {abiFull.map((abi, idx) => {
        if (idx > 8) return;
        const {
          name,
          language: { displayName },
          time,
        } = abi;
        return (
          <div key={idx} className="p-1">
            <ToolTip
              target={
                <div className={`${time > currentTime ? "grayscale" : ""}`}>
                  <MyImage
                    src={getImgStratsDota(`/abilities/${name}.png`)}
                    alt={name}
                    width="20px"
                    height="20px"
                    borderRadius={5}
                  />
                </div>
              }
              tooltip={<span className="p-2 rounded-md">{displayName}</span>}
              id={uniqid()}
            />
          </div>
        );
      })}
    </div>
  );
};

export default memo(Abilities);
