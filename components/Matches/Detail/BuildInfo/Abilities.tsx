import React, { memo } from "react";
import uniqid from "uniqid";
import dynamic from "next/dynamic";
import { AbilityDetail } from "../../../../interfaces/heroes";
import {
  getImgStratsDota,
  useGetTimeCurrentMatchDetail,
} from "../../../../share";
import MyImage from "../../../MyImage";
import { useResizeList } from "../../../../share/customHooks";

const ToolTip = dynamic(() => import("../../../ToolTip"), { ssr: false });

const Abilities = ({
  abiFull,
}: {
  abiFull: (AbilityDetail & { time: number })[];
}) => {
  const { show, hide, parent } = useResizeList(9);

  const currentTime = useGetTimeCurrentMatchDetail();
  return (
    <div className="w-full overflow-x-hidden">
      <div ref={parent} className=" flex flex-wrap -ml-1 -mr-1 ">
        {abiFull.map((abi, idx) => {
          if (idx > 8) return;
          const {
            name,
            language: { displayName },
            time,
          } = abi;
          return (
            <div key={idx} className={`${idx > show - 1 ? "hidden" : ""} p-1`}>
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
        {hide > 0 && (
          <div className="w-[28px] rounded-md bg-layer-light dark:bg-layer-dark flex justify-center items-center">
            <span className="text-xs">+{hide}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Abilities);
