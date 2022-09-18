import React from "react";
import moment from "moment";
import { Guide, GuideSymbol, ItemPurchase } from "../../interfaces/guide";
import { Hero } from "../../interfaces/heroes";
import { useAppSelector } from "../../store/hook";
import MyImage from "../MyImage";
import { RADIANT_ICON, DIRE_ICON } from "../../share/constant";
import _ from "lodash";
import { getDetailItem, getImgStratsDota } from "../../share/ultils";
import ToolTip from "../ToolTip";

const FeaturedGuides = ({
  hero,
  guide,
}: {
  hero: Hero;
  guide: GuideSymbol;
}) => {
  const { guides } = guide;
  const { abilities: abilitiesHero } = hero;
  const items = useAppSelector((state) => state.globalData.items);
  return (
    <section>
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
              kills,
              item0Id,
              item1Id,
              item2Id,
              item3Id,
              item4Id,
              item5Id,
              neutral0Id,
              stats: { itemPurchases, abilities },
            },
          } = guide;
          let checkedScepter = false;
          let checkShard = false;
          const itemsResult: (ItemPurchase | null)[] = [];
          _.forEach(itemPurchases, (item) => {
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
              const idx = _.findIndex(itemsResult, (itemm) => {
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
              className="my-2 px-3 py-2 bg-gray-500 flex items-center"
            >
              <div className="w-[20px]">
                <MyImage src="/sp.svg" width={20} height={20} alt="sp" />
              </div>
              <div className="w-[200px] flex flex-col ml-2">
                <span className=" one-line-max text-lg font-bold">{name}</span>
                <div className="flex items-center">
                  <span className="text-sm">{time}</span>
                  <div className="mx-5">
                    <MyImage
                      src={isRadiant ? RADIANT_ICON : DIRE_ICON}
                      width={20}
                      height={20}
                      alt=""
                      borderRadius={5}
                    />
                  </div>
                  <span className="text-sm">{`${kills} / ${deaths} / ${assists}`}</span>
                </div>
              </div>
              <div className="flex">
                {abilitiesHero.map((abi) => {
                  const { abilityId, ability } = abi;
                  const {
                    drawMatchPage,
                    name,
                    language: { displayName },
                    stat: { isUltimate },
                  } = ability;
                  if (!drawMatchPage) return;
                  let countLv = 0;
                  _.forEach(abilities, (abili) => {
                    if (abili.abilityId === abi.abilityId) countLv++;
                  });
                  const arrLv = Array.from(Array(countLv).keys());
                  const arrLvCurr = isUltimate ? [0, 1, 2] : [0, 1, 2, 3];
                  return (
                    <ToolTip
                      key={abilityId}
                      target={
                        <div key={abilityId} className="mx-1">
                          <div className="grayscale-[0.5] hover:grayscale-0">
                            <MyImage
                              src={getImgStratsDota(`/abilities/${name}.png`)}
                              alt={name}
                              width={30}
                              height={30}
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
                        // <DetailAbility key={abilityId} ability={ability} />
                        <div className="flex items-center p-2">
                          <MyImage
                            src={getImgStratsDota(`/abilities/${name}.png`)}
                            alt={name}
                            width={40}
                            height={40}
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
                  );
                })}
                <div className="">
                  <MyImage
                    src={upgrageImg}
                    width={24}
                    height={40}
                    // borderRadius={5}
                    alt={"upgrade"}
                  />
                </div>
              </div>
              <div className="w-[1px] h-[30px] bg-black mx-5"></div>
              <div className="flex ">
                {itemsResult.map((item, idx) => {
                  if (!item) {
                    return (
                      <div
                        key={idx}
                        className="mx-1 w-[40px] h-[30px] rounded-[5px] bg-neutral-dark"
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
                    <ToolTip
                      key={idx}
                      target={
                        <div
                          key={itemId}
                          className="mx-1 flex flex-col items-center"
                        >
                          <MyImage
                            src={img}
                            width={40}
                            height={30}
                            borderRadius={5}
                            alt={vl?.displayName || " "}
                          />
                          <span className="text-xs">{newTime}</span>
                        </div>
                      }
                      tooltip={
                        <div className="flex items-center px-2 py-1 rounded-sm">
                          <MyImage
                            src={img}
                            width={50}
                            height={40}
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
                  );
                })}
                <ToolTip
                  key={mathchId + neutral0Id}
                  target={
                    <div className="mx-1">
                      <MyImage
                        src={getImgStratsDota(
                          "/items/" + itemNeutral?.shortName + ".png"
                        )}
                        width={30}
                        height={30}
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
                        width={50}
                        height={40}
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
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedGuides;
