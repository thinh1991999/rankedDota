import React, { useState, useEffect, useRef } from "react";
import {
  Event,
  Item,
  ItemBootPurchase,
  ItemNeutral,
  PurchasePattern,
} from "../../interfaces/item";
import {
  getDetailItem,
  getImgStratsDota,
  getTimeBySeconds,
} from "../../share/ultils";
import MyImage from "../MyImage";
import _ from "lodash";
import ToolTip from "../ToolTip";
import { useAppSelector } from "../../store";

type ResultItemNeutral = {
  item: ItemNeutral;
  detailItem: Item;
};

type Tier = {
  title: string;
  data: ResultItemNeutral[];
};

type Timeline = {
  title: string;
  data: Event[];
  time: string;
  total: number;
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
  events,
  totalMatchCount,
  title,
  timeline,
  currentNav,
}: {
  events: Event[];
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
        {events.map((event) => {
          const itemDetail = getDetailItem(items, event.itemId);
          const img = getImgStratsDota(
            "/items/" + itemDetail?.shortName + ".png"
          );
          const { winCount, matchCount, timeAverage } = event;
          const winRate = ((winCount * 100) / matchCount).toFixed(0);
          const pickRate = ((matchCount * 100) / totalMatchCount).toFixed(0);
          const time = timeAverage ? getTimeBySeconds(timeAverage) : null;
          return (
            <div key={event.itemId} className="px-1">
              <ToolTip
                target={
                  <div>
                    <MyImage
                      src={img}
                      width={40}
                      height={30}
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
                    cost={itemDetail?.stat.cost}
                  />
                }
                id={title + event.itemId}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

const NeutralList = ({
  itemsNeutral,
  totalMatchCount,
  title,
}: {
  itemsNeutral: ResultItemNeutral[];
  totalMatchCount: number;
  title: string;
}) => {
  return (
    <>
      <h6 className="capitalize font-bold">{title}</h6>
      <div className="flex mt-2 -ml-1 -mr-1">
        {itemsNeutral.map((itemNeutral, idx) => {
          if (idx >= 4) return;
          const {
            item: { equippedMatchCount, equippedMatchWinCount },
            detailItem,
          } = itemNeutral;
          const img = getImgStratsDota(
            "/items/" + detailItem?.shortName + ".png"
          );
          const winRate = (
            (equippedMatchWinCount * 100) /
            equippedMatchCount
          ).toFixed(0);
          const pickRate = (
            (equippedMatchCount * 100) /
            totalMatchCount
          ).toFixed(0);
          return (
            <div key={detailItem.id} className="px-1">
              <ToolTip
                target={
                  <div>
                    <MyImage
                      src={img}
                      width={40}
                      height={30}
                      borderRadius={5}
                      alt={detailItem?.displayName || " "}
                    />
                    <span className="text-xs text-center block">
                      {winRate}%
                    </span>
                  </div>
                }
                tooltip={
                  <ToolTipItem
                    name={detailItem.displayName}
                    winRate={winRate}
                    pickRate={pickRate}
                  />
                }
                id={title + detailItem.id}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

const HeroItems = ({
  purchasePattern,
  itemNeutral,
  itemBootPurchase,
}: {
  purchasePattern: PurchasePattern;
  itemNeutral: ItemNeutral[];
  itemBootPurchase: ItemBootPurchase;
}) => {
  const items = useAppSelector((state) => state.globalData.items);
  const navs = useRef<string[]>(["Win rate", "Pick rate"]).current;
  const [currentNav, setCurrentNav] = useState<number>(0);
  const [boots, setBoots] = useState<Event[]>([]);
  const [timelines, setTimelines] = useState<Timeline[]>([]);
  const [tiers, setTiers] = useState<Tier[]>([]);

  useEffect(() => {
    const getNewArr = (events: Event[], total: number): Event[] => {
      const newEvents: Event[] = [];
      _.forEach(events, (event) => {
        if (newEvents.length === 4) return;
        if (event.matchCount >= 100) {
          newEvents.push(event);
        }
      });
      const eventsSort = _.orderBy(
        newEvents,
        (event) => {
          const { winCount, matchCount } = event;
          if (currentNav === 0) {
            return winCount / matchCount;
          } else {
            return matchCount / total;
          }
        },
        ["desc"]
      );
      return eventsSort;
    };
    const { events, matchCount: countBoots } = itemBootPurchase;
    const {
      startingItems: { events: eventsStarting, matchCount: countStarting },
      earlyGame: { events: eventsEarly, matchCount: countEarly },
      midGame: { events: eventsMid, matchCount: countMid },
      lateGame: { events: eventsLate, matchCount: countLate },
    } = purchasePattern;
    const resultTimelines: Timeline[] = [];
    resultTimelines.push({
      title: "Starting",
      data: getNewArr(eventsStarting, countStarting),
      time: "-1:40",
      total: countStarting,
    });
    resultTimelines.push({
      title: "Early",
      data: getNewArr(eventsEarly, countEarly),
      time: "00:00 - 15:00",
      total: countEarly,
    });
    resultTimelines.push({
      title: "Mid",
      data: getNewArr(eventsMid, countMid),
      time: "15:00 - 35:00",
      total: countMid,
    });
    resultTimelines.push({
      title: "Late",
      data: getNewArr(eventsLate, countLate),
      time: "35:00+",
      total: countLate,
    });
    setBoots(getNewArr(events, countBoots));
    setTimelines(resultTimelines);
  }, [itemBootPurchase, purchasePattern, currentNav]);
  useEffect(() => {
    const getNewArr = (tier: Tier): Tier => {
      const eventsSort = _.orderBy(
        tier.data,
        (result) => {
          const {
            item: { equippedMatchCount, equippedMatchWinCount },
          } = result;
          return equippedMatchWinCount / equippedMatchCount;
        },
        ["desc"]
      );
      return {
        title: tier.title,
        data: eventsSort,
      };
    };
    const tier1: Tier = {
      title: "Tier 1",
      data: [],
    };
    const tier2: Tier = {
      title: "Tier 2",
      data: [],
    };
    const tier3: Tier = {
      title: "Tier 3",
      data: [],
    };
    const tier4: Tier = {
      title: "Tier 4",
      data: [],
    };
    const tier5: Tier = {
      title: "Tier 5",
      data: [],
    };
    _.forEach(itemNeutral, (item) => {
      if (item.equippedMatchCount === 0) return;
      const detailItem = getDetailItem(items, item.itemId);
      if (detailItem) {
        const {
          stat: { neutralItemTier },
        } = detailItem;
        if (neutralItemTier === "TIER_1") {
          tier1.data.push({
            item,
            detailItem,
          });
        }
        if (neutralItemTier === "TIER_2") {
          tier2.data.push({
            item,
            detailItem,
          });
        }
        if (neutralItemTier === "TIER_3") {
          tier3.data.push({
            item,
            detailItem,
          });
        }
        if (neutralItemTier === "TIER_4") {
          tier4.data.push({
            item,
            detailItem,
          });
        }
        if (neutralItemTier === "TIER_5") {
          tier5.data.push({
            item,
            detailItem,
          });
        }
      }
    });
    const resultTiers: Tier[] = [];
    resultTiers.push(getNewArr(tier1));
    resultTiers.push(getNewArr(tier2));
    resultTiers.push(getNewArr(tier3));
    resultTiers.push(getNewArr(tier4));
    resultTiers.push(getNewArr(tier5));
    setTiers(resultTiers);
  }, [itemNeutral, items]);

  return (
    <section>
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
                      ? "bg-gray-800 border-gray-400"
                      : "bg-gray-700 opacity-40"
                  } ${
                    idx === 0
                      ? "rounded-tl-2xl rounded-bl-2xl"
                      : "rounded-tr-2xl rounded-br-2xl"
                  } hover:bg-gray-800 hover:opacity-100 border px-[15px] py-[3px] capitalize text-sm cursor-pointer`}
                >
                  {nav}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex mt-2">
        <div className="">
          <ItemList
            title="boosts"
            events={boots}
            totalMatchCount={itemBootPurchase.matchCount}
            currentNav={currentNav}
          />
        </div>
        <div className="w-[1px] bg-gray-800 mx-5"></div>
        <div className="">
          <div className="flex -ml-4 -mr-4">
            {timelines.map((timeline) => {
              return (
                <div key={timeline.title} className="px-4">
                  <ItemList
                    title={timeline.title}
                    events={timeline.data}
                    totalMatchCount={timeline.total}
                    timeline={timeline.time}
                    currentNav={currentNav}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex -ml-4 -mr-4">
            {tiers.map((tier) => {
              return (
                <div key={tier.title} className="p-4">
                  <NeutralList
                    title={tier.title}
                    itemsNeutral={tier.data}
                    totalMatchCount={purchasePattern.startingItems.matchCount}
                  />
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
