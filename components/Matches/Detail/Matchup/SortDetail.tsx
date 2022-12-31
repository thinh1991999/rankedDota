import React from "react";
import { PlayerMatchDetail } from "../../../../interfaces/matches";
import IconTypeRole from "../../../IconTypeRole";
import MyImage from "../../../MyImage";
import RankIcon from "../../../RankIcon";
import {
  formatNumber,
  getTypeOfHero,
  nFormatter,
} from "../../../../share/ultils";

const SortDetail = ({ player }: { player: PlayerMatchDetail }) => {
  const {
    position,
    lane,
    imp,
    level,
    networth,
    kills,
    deaths,
    assists,
    goldPerMinute,
    experiencePerMinute,
    numLastHits,
    numDenies,
    heroDamage,
    steamAccount: { name, seasonRank },
  } = player;
  const herotype = getTypeOfHero(position, lane);
  const lvScore = (level / 30) * 10;
  return (
    <section className="pt-4 h-full w-full">
      <div className="p-2 h-full bg-gray-800 rounded-md">
        <div className="flex flex-wrap -ml-2 -mr-2 ">
          <div className="w-1/4 p-2 ">
            <div className="p-2 h-12 flex items-center justify-center border border-solid border-borderTender-dark rounded-md">
              <div className="w-[30px] h-[30px]">
                <RankIcon rank={seasonRank} size={30} />
              </div>
              <span className="ml-1 one-line-max">{name}</span>
            </div>
          </div>
          <div className="w-1/4 p-2 ">
            <div className="p-2 h-12 flex items-center justify-center border border-solid border-borderTender-dark rounded-md">
              <div className="w-[18px] h-[18px]">
                <IconTypeRole
                  height={18}
                  width={18}
                  role={position}
                  lane={lane}
                />
              </div>
              <div className="ml-1">
                <span>{herotype.name}</span>
              </div>
            </div>
          </div>
          <div className="w-2/4 p-2 ">
            <div className="p-2 h-12 flex items-center justify-center border border-solid border-borderTender-dark rounded-md">
              <span className="text-end w-1/5">
                {imp > 0 ? `+${imp}` : imp}
              </span>
              <div className="ml-2 w-3/5 h-[7px] bg-gray-500 rounded-md relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white -translate-x-1/2"></div>
                {imp >= 0 ? (
                  <div
                    className={`absolute top-0 left-1/2 bottom-0 bg-purple-500 rounded-tr-md rounded-br-md`}
                    style={{
                      width: `${(imp * 50) / 24}%`,
                    }}
                  ></div>
                ) : (
                  <div
                    className={`absolute top-0 left-0 w-1/2 bottom-0 flex justify-end`}
                  >
                    <div
                      className="h-full bg-gray-600 rounded-tl-md rounded-bl-md"
                      style={{
                        width: `${(-imp * 100) / 24}%`,
                      }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap p-2 border border-solid border-borderTender-dark rounded-md">
          <div className="w-1/6 flex justify-center items-center border-r border-solid border-borderTender-dark">
            <div className="w-[24px] h-[24px] relative flex justify-center items-center">
              <span className="text-xs">{level}</span>
              {lvScore > 5 && (
                <div
                  className="absolute top-0 left-0 bottom-0 right-0 rounded-full border border-solid border-gray-500"
                  style={{
                    clip: `rect(0,12px,40px,0)`,
                    transform: `rotate(${180 + (180 / 5) * (lvScore - 5)}deg)`,
                  }}
                ></div>
              )}
              <div
                className="absolute top-0 left-0 bottom-0 right-0 rounded-full border border-solid border-gray-500"
                style={{
                  clip: `rect(0,12px,40px,0)`,
                  transform: `${
                    lvScore > 5
                      ? `rotate(180deg)`
                      : `rotate(${(180 / 5) * lvScore}deg)`
                  }`,
                }}
              ></div>
            </div>
          </div>
          <div className="w-1/6 flex justify-center items-center border-r border-solid border-borderTender-dark">
            <div className="flex flex-col justify-center items-center">
              <span className="text-textSecondPrimary-dark">Net Worth</span>
              <div className="flex items-center">
                <MyImage
                  src="/gold.png"
                  width="15px"
                  height="10px"
                  alt="gold"
                />
                <span className="ml-1 text-yellow-500">
                  {formatNumber(networth)}
                </span>
              </div>
            </div>
          </div>
          <div className="w-1/6 flex justify-center items-center border-r border-solid border-borderTender-dark">
            <div className="flex flex-col justify-center items-center">
              <div className="text-textSecondPrimary-dark">
                <span>K</span>
                <span className="mx-1">/</span>
                <span>D</span>
                <span className="mx-1">/</span>
                <span>A</span>
              </div>
              <div className="flex items-center">
                <span>{kills}</span>
                <span className="mx-1">/</span>
                <span>{deaths}</span>
                <span className="mx-1">/</span>
                <span>{assists}</span>
              </div>
            </div>
          </div>
          <div className="w-1/6 flex justify-center items-center border-r border-solid border-borderTender-dark">
            <div className="flex flex-col justify-center items-center">
              <div className="text-textSecondPrimary-dark">
                <span>GPM</span>
                <span className="mx-1">/</span>
                <span>XPM</span>
              </div>
              <div className="flex items-center">
                <span>{nFormatter(goldPerMinute, 1)}</span>
                <span className="mx-1">/</span>
                <span>{nFormatter(experiencePerMinute, 1)}</span>
              </div>
            </div>
          </div>
          <div className="w-1/6 flex justify-center items-center border-r border-solid border-borderTender-dark">
            <div className="flex flex-col justify-center items-center">
              <div className="text-textSecondPrimary-dark">
                <span>LH</span>
                <span className="mx-1">/</span>
                <span>DN</span>
              </div>
              <div className="flex items-center">
                <span>{numLastHits}</span>
                <span className="mx-1">/</span>
                <span>{numDenies}</span>
              </div>
            </div>
          </div>
          <div className="w-1/6 flex justify-center items-center ">
            <div className="flex flex-col justify-center items-center">
              <span className="text-textSecondPrimary-dark">HD</span>
              <div className="">
                <span>{formatNumber(heroDamage)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SortDetail;
