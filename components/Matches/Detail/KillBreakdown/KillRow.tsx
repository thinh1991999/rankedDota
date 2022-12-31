import _ from "lodash";
import React, { useState, useEffect, useMemo } from "react";
import { PlayerMatchDetail } from "../../../../interfaces/matches";
import {
  getDetaiHero,
  getImgStratsDota,
  useGetTimeCurrentMatchDetail,
} from "../../../../share";
import { useAppSelector } from "../../../../store/hook";
import HeroIcon from "../../../HeroIcon";
import MyImage from "../../../MyImage";
import ToolTip from "../../../ToolTip";
import uniqid from "uniqid";
import { nFormatter } from "../../../../share/ultils";

const KillRow = ({
  player,
  enemies,
}: {
  player: PlayerMatchDetail;
  enemies: number[];
}) => {
  const heroes = useAppSelector((state) => state.globalData.heroes);

  const currTime = useGetTimeCurrentMatchDetail();

  const imgInfo = useMemo(() => {
    const heroDetail = getDetaiHero(heroes, player.heroId);
    return {
      img: getImgStratsDota(`/heroes/${heroDetail?.shortName}_horz.png`),
      nameImg: heroDetail?.displayName,
    };
  }, [player, heroes]);

  return (
    <div className="p-2 rounded-md bg-layerSecondary-light dark:bg-layerSecondary-dark">
      <div className="flex items-center">
        <div className="flex items-center w-[200px]">
          <div className="w-[68px]">
            <MyImage
              src={imgInfo.img}
              height="40px"
              width="68px"
              alt={imgInfo.nameImg || ""}
              borderRadius={6}
            />
          </div>
          <div className="ml-2">
            <h6 className="one-line-max">{player.steamAccount.name}</h6>
            <p className="text-sm">
              3{" "}
              <span className="text-textSecondPrimary-light dark:text-textSecondPrimary-dark">
                kills
              </span>
            </p>
          </div>
        </div>
        <div className="h-[40px] mx-2 border-r border-solid border-borderTender-dark"></div>
        <div className="flex-1 flex justify-between">
          {enemies.map((id) => {
            let count = 0;
            let goldEarn = 0;
            let expEarn = 0;
            _.forEach(player.stats.killEvents, (e) => {
              const { target, time, gold, xp } = e;
              if (target === id && time <= currTime) {
                count++;
                goldEarn = gold;
                expEarn = xp ? xp : 0;
              }
            });
            return (
              <div
                key={id}
                className="w-[60px] h-[25px] rounded-md bg-layerStrong-light dark:bg-layerStrong-dark"
              >
                <ToolTip
                  target={
                    <div
                      className={`${
                        count === 0 ? "opacity-50" : ""
                      } flex items-center justify-center`}
                    >
                      <HeroIcon
                        showTooltip={false}
                        gray={count === 0}
                        id={id}
                        size={20}
                      />
                      <span className="ml-2">{count}</span>
                    </div>
                  }
                  tooltip={
                    count > 0 ? (
                      <div className="p-2 rounded-md w-[160px] text-textSecondPrimary-dark">
                        <div className="flex justify-between">
                          <span>Gold earned</span>
                          <span className="text-yellow-500">
                            {nFormatter(goldEarn, 1)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Experience earned</span>
                          <span>{nFormatter(expEarn, 1)}</span>
                        </div>
                      </div>
                    ) : (
                      false
                    )
                  }
                  id={uniqid()}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KillRow;
