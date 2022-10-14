import _ from "lodash";
import React, { useState, useEffect } from "react";
import { Ability, PlayerMatchDetail } from "../../../../interfaces/matches";
import { getDetailItem } from "../../../../share";
import { useAppSelector } from "../../../../store/hook";
import { Item } from "../../../../interfaces/item";
import BotInfo from "./BotInfo";
import TopInfo from "./TopInfo";

const Player = ({ player }: { player: PlayerMatchDetail }) => {
  const items = useAppSelector((state) => state.globalData.items);

  const [itemsBuild, setItemsBuild] = useState<(Item & { time: number })[]>([]);
  const [spItems, setSpItems] = useState<(Item & { times: number[] })[]>([]);
  const [topInfo, setTopInfo] = useState<{
    heroId: number;
    name: string;
    abilities: Ability[];
    lvArr: number[];
  }>();
  useEffect(() => {
    const {
      heroId,
      backpack0Id,
      backpack1Id,
      backpack2Id,
      item0Id,
      item1Id,
      item2Id,
      item3Id,
      item4Id,
      item5Id,
      stats: { itemPurchases, wards, abilities, level: lvArr },
      steamAccount: { name },
    } = player;
    const spItemsResult: (Item & { times: number[] })[] = [];
    const arr: number[] = [];
    backpack0Id && arr.push(backpack0Id);
    backpack1Id && arr.push(backpack1Id);
    backpack2Id && arr.push(backpack2Id);
    item0Id && arr.push(item0Id);
    item1Id && arr.push(item1Id);
    item2Id && arr.push(item2Id);
    item3Id && arr.push(item3Id);
    item4Id && arr.push(item4Id);
    item5Id && arr.push(item5Id);
    const itemsResult: (Item & { time: number })[] = [];
    _.forEach(itemPurchases, (item) => {
      const detail = getDetailItem(items, item.itemId);
      if (!detail) return;
      const { isStackable, cost, isSupport } = detail.stat;
      if (detail.stat.needsComponents && cost >= 1000) {
        itemsResult.push({ ...detail, time: item.time });
      }
      if (isSupport && isStackable) {
        const checkIdx = _.findIndex(
          spItemsResult,
          (item) => item.id === detail.id
        );
        if (checkIdx === -1) {
          spItemsResult.push({ ...detail, times: [item.time] });
        } else {
          spItemsResult[checkIdx].times.push(item.time);
        }
      }
    });
    setSpItems(spItemsResult);
    setItemsBuild(itemsResult);
    setTopInfo({
      heroId,
      name,
      abilities,
      lvArr,
    });
  }, [player, items]);

  return (
    <section className=" rounded-md bg-layerSecondary-dark border border-solid border-borderTender-dark">
      <div className="flex items-center p-2 border-b border-solid border-borderTender-dark">
        {topInfo && <TopInfo topInfo={topInfo} />}
      </div>
      <div className="h-[80px] flex items-center">
        {(itemsBuild.length > 0 || spItems.length > 0) && (
          <BotInfo itemsBuild={itemsBuild} spItems={spItems} />
        )}
      </div>
    </section>
  );
};

export default Player;
