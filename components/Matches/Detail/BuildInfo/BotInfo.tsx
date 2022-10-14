import React from "react";
import _ from "lodash";
import uniqid from "uniqid";
import MyImage from "../../../MyImage";
import {
  getImgStratsDota,
  useGetTimeCurrentMatchDetail,
} from "../../../../share";
import ToolTip from "../../../ToolTip";
import { Item } from "../../../../interfaces/item";
import { getTimeBySeconds } from "../../../../share/ultils";

const BotInfo = ({
  itemsBuild,
  spItems,
}: {
  itemsBuild: (Item & { time: number })[];
  spItems: (Item & { times: number[] })[];
}) => {
  const currSeconds = useGetTimeCurrentMatchDetail();
  return (
    <section className="w-full">
      <div className="flex">
        <div className="w-10/12 flex overflow-hidden">
          {itemsBuild.map((item, idx) => {
            const { displayName, time, shortName } = item;
            const itemIcon = getImgStratsDota(`/items/${shortName}.png`);
            return (
              <div key={idx} className="p-2 flex flex-col items-center">
                <div className="">
                  <ToolTip
                    target={
                      <div
                        className={`${
                          time > currSeconds ? "grayscale" : ""
                        } flex justify-center items-center `}
                      >
                        <MyImage
                          src={itemIcon}
                          width="32px"
                          height="22px"
                          alt={shortName}
                          borderRadius={5}
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
                          borderRadius={3}
                        />
                        <span className="ml-2">{displayName}</span>
                      </div>
                    }
                    id={uniqid()}
                  />
                </div>
                <span className="text-textSecondPrimary-dark text-xs mt-2">
                  {getTimeBySeconds(time)}
                </span>
              </div>
            );
          })}
        </div>
        {spItems.length > 0 && (
          <>
            <div className="p-2">
              <div className="h-[22px] border-l border-solid border-borderTender-dark"></div>
            </div>
            <div className="flex">
              {spItems.map((item, idx) => {
                const { displayName, times, shortName } = item;
                let count = 0;
                _.forEach(times, (time) => {
                  time <= currSeconds && count++;
                });
                const itemIcon = getImgStratsDota(`/items/${shortName}.png`);
                return (
                  <div key={idx} className="p-2 flex flex-col items-center">
                    <div className="">
                      <ToolTip
                        target={
                          <div
                            className={`${
                              count === 0 ? "grayscale" : ""
                            } flex justify-center items-center `}
                          >
                            <MyImage
                              src={itemIcon}
                              width="32px"
                              height="22px"
                              alt={shortName}
                              borderRadius={5}
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
                              borderRadius={3}
                            />
                            <span className="ml-2">{displayName}</span>
                          </div>
                        }
                        id={uniqid()}
                      />
                    </div>
                    <span className="text-textSecondPrimary-dark text-xs text-center mt-2">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BotInfo;
