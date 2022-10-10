import React, { useState, useEffect } from "react";
import MyImage from "../../../MyImage";
import uniqid from "uniqid";
import { getImgStratsDota } from "../../../../share";
import ToolTip from "../../../ToolTip";
import { Item } from "../../../../interfaces/item";
import { useAppSelector } from "../../../../store";
import { getTimeBySeconds } from "../../../../share/ultils";

const BotInfo = ({
  itemsBuild,
  spItems,
}: {
  itemsBuild: (Item & { time: number })[];
  spItems: (Item & { count: number })[];
}) => {
  const timeSeek = useAppSelector((state) => state.matchDetail.timeSeek);
  const timesLabel = useAppSelector((state) => state.matchDetail.timesLabel);

  const currSeconds = timesLabel[timeSeek] * 60;

  return (
    <section className="w-full">
      <div className="flex">
        <div className="w-10/12 flex overflow-hidden">
          {itemsBuild.map((item) => {
            const { displayName, id, time, shortName } = item;
            const itemIcon = getImgStratsDota(`/items/${shortName}.png`);
            return (
              <div key={id} className="p-2 flex flex-col items-center">
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
              {spItems.map((item) => {
                const { displayName, count, id, shortName } = item;
                const itemIcon = getImgStratsDota(`/items/${shortName}.png`);
                return (
                  <div key={id} className="p-2 flex flex-col items-center">
                    <div className="">
                      <ToolTip
                        target={
                          <div className={` flex justify-center items-center `}>
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
