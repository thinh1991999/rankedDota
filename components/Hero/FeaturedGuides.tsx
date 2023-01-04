import React from "react";
import moment from "moment";
import dynamic from "next/dynamic";
import forEach from "lodash/forEach";
import findIndex from "lodash/findIndex";
import { ItemPurchase } from "../../interfaces/guide";
import { Hero, HeroStatsGuide } from "../../interfaces/heroes";
import { useAppSelector } from "../../store/hook";
import MyImage from "../MyImage";
import { RADIANT_ICON, DIRE_ICON } from "../../share/constant";
import {
  getDetailItem,
  getImgStratsDota,
  getTypeOfHero,
} from "../../share/ultils";

const ToolTip = dynamic(() => import("../ToolTip"), {
  ssr: false,
});

const FeaturedGuides = ({
  hero,
  guide,
}: {
  hero: Hero;
  guide: HeroStatsGuide;
}) => {
  const { guides } = guide;
  const { abilities: abilitiesHero } = hero;
  const items = useAppSelector((state) => state.globalData.items);
  return (
    <section className="p-2 rounded-md bg-layer-light dark:bg-layer-dark">
      <h5>Featured guides</h5>
      <div className="">
        {guides.map((guide, idx) => {
          const {
            match: { durationSeconds, id: mathchId },
            matchPlayer: {
              steamAccount: { name },
              isRadiant,
              deaths,
              assists,
              position,
              kills,
              item0Id,
              item1Id,
              item2Id,
              item3Id,
              item4Id,
              item5Id,
              neutral0Id,
              abilities,
              stats: { itemPurchases },
            },
          } = guide;
          let checkedScepter = false;
          let checkShard = false;
          const itemsResult: (ItemPurchase | null)[] = [];
          forEach(itemPurchases, (item) => {
            if (item.itemId === 108) {
              checkedScepter = true;
            }
            if (item.itemId === 609) {
              checkShard = true;
            }
            if (
              item.itemId === item0Id ||
              item.itemId === item1Id ||
              item.itemId === item2Id ||
              item.itemId === item3Id ||
              item.itemId === item4Id ||
              item.itemId === item5Id
            ) {
              const idx = findIndex(itemsResult, (itemm) => {
                return itemm?.itemId === item.itemId;
              });
              if (idx !== -1) {
                itemsResult.splice(idx, 1);
              }
              itemsResult.push(item);
            }
          });
          const countNull = 6 - itemsResult.length;
          for (let i = 0; i < countNull; i++) {
            itemsResult.push(null);
          }
          const time = moment
            .utc(durationSeconds * 1000)
            .format(durationSeconds >= 3600 ? "HH:mm:ss" : "mm:ss");
          const itemNeutral = getDetailItem(items, neutral0Id);
          const typeHero = getTypeOfHero(position);
          let upgrageImg = "/atriFullScepNorShard.svg";
          if (checkedScepter && checkShard) {
            upgrageImg = "/atriFullScepNorShard.svg";
          } else if (checkedScepter) {
            upgrageImg = "/atriScepter.svg";
          } else if (checkShard) {
            upgrageImg = "/atriShard.svg";
          }
          return (
            <div
              key={idx}
              className="my-3 px-3 py-3 rounded-md bg-layerStrong-dark flex xl:flex-nowrap flex-wrap items-center"
            >
              <div className="xl:w-[200px] w-full flex items-center">
                <div className="w-[20px]">
                  <MyImage
                    src={typeHero.icon}
                    width="20px"
                    height="20px"
                    alt="sp"
                  />
                </div>
                <div className="flex-1 flex flex-col ml-2">
                  <span className=" one-line-max text-lg font-bold">
                    {name}
                  </span>
                  <div className="flex items-center">
                    <span className="text-sm">{time}</span>
                    <div className="mx-5">
                      <MyImage
                        src={isRadiant ? RADIANT_ICON : DIRE_ICON}
                        width="20px"
                        height="20px"
                        alt=""
                        borderRadius={5}
                      />
                    </div>
                    <span className="text-sm">{`${kills} / ${deaths} / ${assists}`}</span>
                  </div>
                </div>
              </div>
              <div className="xl:flex-1 w-full flex xl:justify-center justify-start xl:my-0 my-5 overflow-x-auto ">
                {abilitiesHero.map((abi) => {
                  const { abilityId, ability } = abi;
                  const {
                    name,
                    language: { displayName },
                    stat: { isUltimate },
                    uri,
                  } = ability;
                  if (!uri) return;
                  let countLv = 0;
                  forEach(abilities, (abili) => {
                    if (abili.abilityId === abi.abilityId) countLv++;
                  });
                  const arrLv = Array.from(Array(countLv).keys());
                  const arrLvCurr = isUltimate ? [0, 1, 2] : [0, 1, 2, 3];
                  return (
                    <div key={abilityId} className="mx-1">
                      <ToolTip
                        target={
                          <div>
                            <div className="grayscale-[0.5] hover:grayscale-0 flex justify-center">
                              <MyImage
                                src={getImgStratsDota(`/abilities/${name}.png`)}
                                alt={name}
                                width="40px"
                                height="30px"
                                borderRadius={5}
                              />
                            </div>
                            <div className="flex justify-center">
                              <div className="relative flex  mt-2">
                                {arrLvCurr.map((idx) => {
                                  return (
                                    <div
                                      key={idx}
                                      className="w-[4px] h-[4px] mx-[1px] bg-gray-900 rounded-full"
                                    ></div>
                                  );
                                })}
                                <div className="absolute left-0 right-0 bottom-0 top-0 flex ">
                                  {arrLv.map((item, idx) => {
                                    return (
                                      <div
                                        key={idx}
                                        className="w-[4px] h-[4px] mx-[1px] bg-yellow-300 rounded-full"
                                      ></div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                        tooltip={
                          <div className="flex items-center">
                            <MyImage
                              src={getImgStratsDota(`/abilities/${name}.png`)}
                              alt={name}
                              width="40px"
                              height="40px"
                              borderRadius={5}
                            />
                            <div className="flex flex-col ml-1 ">
                              <span className="font-bold text-lg">
                                {displayName}
                              </span>
                              <span>Level {countLv}</span>
                            </div>
                          </div>
                        }
                        id={mathchId + abilityId}
                      />
                    </div>
                  );
                })}
                <div className="ml-1">
                  <MyImage
                    src={upgrageImg}
                    width="20px"
                    height="36px"
                    alt={"upgrade"}
                  />
                </div>
              </div>
              <div className="xl:block hidden w-[1px] h-[30px] bg-borderSecondary-dark mx-5"></div>
              <div className="xl:flex-1 w-full flex xl:justify-center justify-start overflow-x-auto">
                {itemsResult.map((item, idx) => {
                  if (!item) {
                    return (
                      <div
                        key={idx}
                        className="mx-1 w-[40px] h-[30px] rounded-[5px] bg-layer-dark opacity-50"
                      ></div>
                    );
                  }
                  const { time, itemId } = item;
                  const newTime = moment
                    .utc(time * 1000)
                    .format(time >= 3600 ? "HH:mm:ss" : "mm:ss");
                  const vl = getDetailItem(items, itemId);
                  const img = getImgStratsDota(
                    "/items/" + vl?.shortName + ".png"
                  );
                  return (
                    <div key={idx} className="mx-1">
                      <ToolTip
                        target={
                          <div className="flex flex-col items-center">
                            <div className="">
                              <MyImage
                                src={img}
                                width="40px"
                                height="30px"
                                borderRadius={5}
                                alt={vl?.displayName || " "}
                              />
                            </div>
                            <span className="text-xs">{newTime}</span>
                          </div>
                        }
                        tooltip={
                          <div className="flex items-center px-2 py-1 rounded-sm">
                            <MyImage
                              src={img}
                              width="50px"
                              height="40px"
                              borderRadius={5}
                              alt={vl?.displayName || " "}
                            />
                            <span className="font-bold ml-1">
                              {vl?.displayName}
                            </span>
                          </div>
                        }
                        id={mathchId + idx}
                      />
                    </div>
                  );
                })}
                {neutral0Id ? (
                  <div>
                    <ToolTip
                      key={mathchId + neutral0Id}
                      target={
                        <div className="mx-1">
                          <MyImage
                            src={getImgStratsDota(
                              "/items/" + itemNeutral?.shortName + ".png"
                            )}
                            width="30px"
                            height="30px"
                            borderRadius={999}
                            alt={itemNeutral?.displayName || " "}
                          />
                        </div>
                      }
                      tooltip={
                        <div className="flex items-center px-2 py-1 rounded-sm">
                          <MyImage
                            src={getImgStratsDota(
                              "/items/" + itemNeutral?.shortName + ".png"
                            )}
                            width="50px"
                            height="40px"
                            borderRadius={5}
                            alt={itemNeutral?.displayName || " "}
                          />
                          <span className="font-bold ml-1">
                            {itemNeutral?.displayName}
                          </span>
                        </div>
                      }
                      id={mathchId + neutral0Id}
                    />
                  </div>
                ) : (
                  <div className="w-[30px] h-[30px] rounded-full dark:bg-layer-dark bg-layer-light mx-1"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedGuides;
