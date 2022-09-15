import React from "react";
import moment from "moment";
import { Guide, GuideSymbol, ItemPurchase } from "../../interfaces/guide";
import { Hero } from "../../interfaces/heroes";
import { useAppSelector } from "../../store/hook";
import MyImage from "../MyImage";
import { RADIANT_ICON, DIRE_ICON } from "../../share/constant";
import _ from "lodash";
import { getDetailItem, getImgStratsDota } from "../../share/ultils";

const FeaturedGuides = ({ guide }: { guide: GuideSymbol }) => {
  const { guides } = guide;
  const items = useAppSelector((state) => state.globalData.items);
  return (
    <section>
      {guides.map((guide, idx) => {
        const {
          match: { durationSeconds },
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
            stats: { itemPurchases },
          },
        } = guide;
        const itemsResult: ItemPurchase[] = [];
        _.forEach(itemPurchases, (item) => {
          if (
            item.itemId === item0Id ||
            item.itemId === item1Id ||
            item.itemId === item2Id ||
            item.itemId === item3Id ||
            item.itemId === item4Id ||
            item.itemId === item5Id
          ) {
            itemsResult.push(item);
          }
        });
        const time = moment
          .utc(durationSeconds * 1000)
          .format(durationSeconds >= 3600 ? "HH:mm:ss" : "mm:ss");
        return (
          <div
            key={idx}
            className="my-2 px-3 py-2 bg-gray-500 flex items-center"
          >
            <div className="">
              <MyImage src="/sp.svg" width={20} height={20} alt="sp" />
            </div>
            <div className="flex flex-col">
              <span>{name}</span>
              <div className="flex items-center">
                <span>{time}</span>
                <div className="mx-5">
                  <MyImage
                    src={isRadiant ? RADIANT_ICON : DIRE_ICON}
                    width={20}
                    height={20}
                    alt=""
                    borderRadius={5}
                  />
                </div>
                <span>{`${kills}/ ${deaths}/ ${assists}`}</span>
              </div>
            </div>
            <div className="flex items-center ">
              {itemsResult.map((item) => {
                const { time, itemId } = item;
                const newTime = moment
                  .utc(time * 1000)
                  .format(time >= 3600 ? "HH:mm:ss" : "mm:ss");
                const vl = getDetailItem(items, itemId);
                const img = getImgStratsDota(
                  "/items/" + vl?.shortName + ".png"
                );
                return (
                  <div key={itemId} className="mx-2 flex flex-col items-center">
                    <MyImage
                      src={img}
                      width={50}
                      height={30}
                      borderRadius={5}
                      alt={vl?.displayName || " "}
                    />
                    <span className="text-sm">{newTime}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default FeaturedGuides;
