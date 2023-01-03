import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import { Event, Item, ItemNeutral } from "../../interfaces/item";
import {
  getDetailItem,
  getImgStratsDota,
  getTimeBySeconds,
} from "../../share/ultils";
import MyImage from "../MyImage";
import ToolTip from "../ToolTip";
import { useAppSelector } from "../../store";
import { HeroStats, ItemBootPurchase } from "../../interfaces/heroes";

type Tier = {
  title: string;
  data: {
    items: {
      itemNeutrals: ItemNeutral;
      item: Item;
    }[];
    total: number;
  };
};

const ToolTipItem = ({
  name,
  winRate,
  pickRate,
  time,
  cost,
}: {
  name?: string;
  winRate?: string;
  pickRate?: string;
  time?: string | null;
  cost?: number;
}) => {
  return (
    <div className={`${time ? "w-[200px]" : "w-[150px]"} border rounded-md`}>
      <div className="p-3 border-b-[1px]">
        <h6 className="text-md font-bold">{name}</h6>
      </div>
      <div className="px-3 py-1">
        {winRate && (
          <div className="flex justify-between my-1">
            <span>Win Rate</span>
            <span className="ml-3 block text-green-500">{winRate}%</span>
          </div>
        )}
        {pickRate && (
          <div className="flex justify-between my-1">
            <span>Pick Rate</span>
            <span className="ml-3 block text-blue-500">{pickRate}%</span>
          </div>
        )}
        {time && (
          <div className="flex justify-between my-1">
            <span>Avarage purchase time</span>
            <span>{time}</span>
          </div>
        )}
        {cost && (
          <div className="flex justify-between my-1">
            <span>Cost</span>
            <span className="ml-3 block text-yellow-500">{cost}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const ItemList = ({
  itemList,
  totalMatchCount,
  title,
  timeline,
  currentNav,
}: {
  itemList: ItemBootPurchase[];
  totalMatchCount: number;
  title: string;
  timeline?: string;
  currentNav: number;
}) => {
  const items = useAppSelector((state) => state.globalData.items);
  return (
    <>
      <div className="flex justify-between items-center">
        <h6 className="capitalize font-bold">{title}</h6>
        <span className="text-xs">{timeline}</span>
      </div>
      <div className="flex mt-2 -ml-1 -mr-1">
        {itemList.map((itemm, idx) => {
          if (idx >= 4) return;
          const itemDetail = getDetailItem(items, itemm.itemId);
          const img = getImgStratsDota(
            "/items/" + itemDetail?.shortName + ".png"
          );
          const { winCount, matchCount, timeAverage } = itemm;
          const winRate = ((winCount * 100) / matchCount).toFixed(0);
          const pickRate = ((matchCount * 100) / totalMatchCount).toFixed(0);
          const time = timeAverage ? getTimeBySeconds(timeAverage) : null;
          return (
            <div key={idx} className="px-1">
              <ToolTip
                target={
                  <div>
                    <MyImage
                      src={img}
                      width="40px"
                      height="30px"
                      borderRadius={5}
                      alt={itemDetail?.displayName || " "}
                    />
                    <span className="text-xs text-center block">
                      {currentNav === 0 ? winRate : pickRate}%
                    </span>
                  </div>
                }
                tooltip={
                  <ToolTipItem
                    name={itemDetail?.displayName}
                    pickRate={pickRate}
                    winRate={winRate}
                    time={time}
                    cost={itemDetail?.stat?.cost}
                  />
                }
                id={title + itemm.itemId + idx}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

const NeutralList = ({
  tier,
  currentNav,
}: {
  tier: Tier;
  currentNav: number;
}) => {
  const {
    title,
    data: { items, total },
  } = tier;
  return (
    <>
      <h6 className="capitalize font-bold">{title}</h6>
      <div className="flex mt-2 -ml-1 -mr-1">
        {items.map((itemNeutral, idx) => {
          if (idx >= 4) return;
          const {
            item: { shortName, displayName },
            itemNeutrals: { equippedMatchCount, equippedMatchWinCount },
          } = itemNeutral;
          const img = getImgStratsDota("/items/" + shortName + ".png");
          const winRate = (
            (equippedMatchWinCount * 100) /
            equippedMatchCount
          ).toFixed(0);
          const pickRate = ((equippedMatchCount * 100) / total).toFixed(0);
          return (
            <div key={idx} className="px-1">
              <ToolTip
                target={
                  <div>
                    <MyImage
                      src={img}
                      width="40px"
                      height="30px"
                      borderRadius={5}
                      alt={displayName || " "}
                    />
                    <span className="text-xs text-center block">
                      {currentNav === 0 ? winRate : pickRate}%
                    </span>
                  </div>
                }
                tooltip={
                  <ToolTipItem
                    name={displayName}
                    winRate={winRate}
                    pickRate={pickRate}
                  />
                }
                id={title + idx}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

const HeroItems = ({ stats }: { stats: HeroStats }) => {
  const items = useAppSelector((state) => state.globalData.items);
  const navs = useRef<string[]>(["Win rate", "Pick rate"]).current;
  const [currentNav, setCurrentNav] = useState<number>(0);
  const [boots, setBoots] = useState<{
    items: ItemBootPurchase[];
    total: number;
  }>();
  const [timelines, setTimelines] = useState<
    {
      title: string;
      data: {
        items: ItemBootPurchase[];
        total: number;
      };
      time: string;
    }[]
  >([]);
  const [tiers, setTiers] = useState<Tier[]>([]);

  useEffect(() => {
    const getNewArr = (itemList: ItemBootPurchase[]) => {
      const total = _.reduce(
        itemList,
        (prev, curr) => {
          return prev + curr.matchCount;
        },
        0
      );
      const items = _.orderBy(
        itemList,
        (item) => {
          const { matchCount, winCount } = item;
          if (currentNav === 1) return matchCount / total;
          return winCount / matchCount;
        },
        ["desc"]
      );
      return {
        items,
        total,
      };
    };
    const {
      itemBootPurchase,
      purchasePattern: { startingItems, earlyGame, midGame, lateGame },
      itemNeutral,
    } = stats;
    setBoots(getNewArr(itemBootPurchase));
    const resultTimelines = [];
    resultTimelines.push({
      title: "Starting",
      data: getNewArr(startingItems),
      time: "-1:40",
    });
    resultTimelines.push({
      title: "Early",
      data: getNewArr(earlyGame),
      time: "00:00 - 15:00",
    });
    resultTimelines.push({
      title: "Mid",
      data: getNewArr(midGame),
      time: "15:00 - 35:00",
    });
    resultTimelines.push({
      title: "Late",
      data: getNewArr(lateGame),
      time: "35:00+",
    });
    const resultTiers: Tier[] = [
      { title: "Tier 1", data: { items: [], total: 0 } },
      { title: "Tier 2", data: { items: [], total: 0 } },
      { title: "Tier 3", data: { items: [], total: 0 } },
      { title: "Tier 4", data: { items: [], total: 0 } },
      { title: "Tier 5", data: { items: [], total: 0 } },
    ];
    _.forEach(items, (item) => {
      const { id, stat } = item;
      if (stat) {
        const { neutralItemTier } = stat;
        const idx = _.findIndex(itemNeutral, (itemm) => itemm.itemId === id);
        if (idx !== -1) {
          switch (neutralItemTier) {
            case "TIER_1":
              resultTiers[0].data.items.push({
                item,
                itemNeutrals: itemNeutral[idx],
              });
              resultTiers[0].data.total += itemNeutral[idx].equippedMatchCount;
              break;
            case "TIER_2":
              resultTiers[1].data.items.push({
                item,
                itemNeutrals: itemNeutral[idx],
              });
              resultTiers[1].data.total += itemNeutral[idx].equippedMatchCount;
              break;
            case "TIER_3":
              resultTiers[2].data.items.push({
                item,
                itemNeutrals: itemNeutral[idx],
              });
              resultTiers[2].data.total += itemNeutral[idx].equippedMatchCount;
              break;
            case "TIER_4":
              resultTiers[3].data.items.push({
                item,
                itemNeutrals: itemNeutral[idx],
              });
              resultTiers[3].data.total += itemNeutral[idx].equippedMatchCount;
              break;
            case "TIER_5":
              resultTiers[4].data.items.push({
                item,
                itemNeutrals: itemNeutral[idx],
              });
              resultTiers[4].data.total += itemNeutral[idx].equippedMatchCount;
              break;
            default:
              break;
          }
        }
      }
    });
    _.forEach(resultTiers, (tier) => {
      const {
        data: { items, total },
      } = tier;
      tier.data.items = _.sortBy(
        items,
        (item) => {
          const { equippedMatchCount, equippedMatchWinCount } =
            item.itemNeutrals;
          if (currentNav === 1) {
            return equippedMatchCount / total;
          }
          return equippedMatchWinCount / equippedMatchCount;
        },
        ["desc"]
      );
    });
    setTiers(resultTiers);
    setTimelines(resultTimelines);
  }, [stats, currentNav, items]);

  return (
    <section className="p-2 rounded-md bg-layer-light dark:bg-layer-dark">
      <div className="flex justify-between">
        <h5>Items</h5>
        <div className="flex items-center">
          <ul className="flex items-center ">
            {navs.map((nav, idx) => {
              return (
                <li
                  key={nav}
                  onClick={() => setCurrentNav(idx)}
                  className={`${
                    idx === currentNav
                      ? "dark:bg-layerStrong-dark bg-layerStrong-light border-gray-400"
                      : "dark:bg-button-dark bg-button-light opacity-40"
                  } ${
                    idx === 0
                      ? "rounded-tl-2xl rounded-bl-2xl"
                      : "rounded-tr-2xl rounded-br-2xl"
                  } dark:hover:bg-layerStrong-dark hover:bg-layerStrong-light border px-[15px] py-[3px] capitalize text-sm cursor-pointer`}
                >
                  {nav}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap mt-2">
        <div className="w-full xl:w-[200px] py-4 ">
          {boots && (
            <ItemList
              title="boosts"
              itemList={boots.items}
              totalMatchCount={boots.total}
              currentNav={currentNav}
            />
          )}
        </div>
        <div className="w-[1px] bg-gray-800 mx-5 xl:block hidden"></div>
        <div className="w-full xl:w-auto flex-1">
          <div className="flex flex-wrap -ml-4 -mr-4">
            {timelines.map((timeline, idx) => {
              return (
                <div key={timeline.title} className="w-full xl:w-[200px] p-4">
                  <ItemList
                    title={timeline.title}
                    itemList={timeline.data.items}
                    totalMatchCount={timeline.data.total}
                    timeline={timeline.time}
                    currentNav={currentNav}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap -ml-4 -mr-4">
            {tiers.map((tier, idx) => {
              return (
                <div key={idx} className="w-full xl:w-[200px] p-4">
                  <NeutralList tier={tier} currentNav={currentNav} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroItems;
