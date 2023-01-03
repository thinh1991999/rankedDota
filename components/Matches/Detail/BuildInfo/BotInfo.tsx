import React, { useMemo } from "react";
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
import { useResizeList } from "../../../../share/customHooks";
import { AiOutlineClockCircle } from "react-icons/ai";

const BotInfo = ({
  itemsBuild,
  spItems,
}: {
  itemsBuild: (Item & { time: number })[];
  spItems: (Item & { times: number[] })[];
}) => {
  const { parent, hide, show } = useResizeList(itemsBuild.length);
  const currSeconds = useGetTimeCurrentMatchDetail();

  const itemHides = useMemo(() => {
    return itemsBuild.filter((item, idx) => idx > show - 1);
  }, [itemsBuild, show]);
  return (
    <section className="w-full">
      <div className="flex">
        <div ref={parent} className="w-10/12 flex flex-wrap -ml-2 -mr-2">
          {itemsBuild.map((item, idx) => {
            const { displayName, time, shortName } = item;
            const itemIcon = getImgStratsDota(`/items/${shortName}.png`);
            return (
              <div
                key={idx}
                className={`${
                  idx > show - 1 ? "hidden" : ""
                } p-2 flex flex-col items-center`}
              >
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
                <span className="text-textSecondPrimary-light dark:text-textSecondPrimary-dark text-xs mt-2">
                  {getTimeBySeconds(time)}
                </span>
              </div>
            );
          })}
          {hide > 0 && (
            <div className="w-[48px] p-2">
              <div className="bg-layer-light dark:bg-layer-dark rounded-md flex justify-center items-center">
                <ToolTip
                  target={
                    <div className="w-full h-full flex justify-center items-center">
                      <span className="text-xs p-1">+{hide}</span>
                    </div>
                  }
                  tooltip={
                    <div className="flex flex-col px-3 py-2 rounded-md bg-black">
                      {itemHides.map((item, idx) => {
                        const { displayName, time, shortName } = item;
                        const itemIcon = getImgStratsDota(
                          `/items/${shortName}.png`
                        );
                        return (
                          <div
                            className={`${
                              time > currSeconds ? "grayscale" : ""
                            } my-2 flex justify-between items-center `}
                            key={idx}
                          >
                            <div className="flex justify-between items-center">
                              <MyImage
                                src={itemIcon}
                                width="32px"
                                height="22px"
                                alt={shortName}
                                borderRadius={5}
                              />
                              <span className="ml-2">{displayName}</span>
                            </div>
                            <div className="w-[50px] ml-2 flex justify-center items-center">
                              <AiOutlineClockCircle />
                              <span className="text-textSecondPrimary-light dark:text-textSecondPrimary-dark text-xs ml-1">
                                {getTimeBySeconds(time)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  }
                  id={uniqid()}
                />
              </div>
            </div>
          )}
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
                    <span className="text-textSecondPrimary-light dark:text-textSecondPrimary-dark text-xs text-center mt-2">
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
