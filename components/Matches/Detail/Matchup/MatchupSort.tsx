import React, { useState } from "react";
import { getDetaiHero, getImgStratsDota } from "../../../../share";
import { useAppSelector } from "../../../../store/hook";
import IconTypeRole from "../../../IconTypeRole";
import MyImage from "../../../MyImage";
import { getPartyColor, romanize } from "../../../../share/ultils";
import RankIcon from "../../../RankIcon";
import SortDetail from "./SortDetail";
import {
  PlayerMatchDetail,
  PlayerTimeline,
} from "../../../../interfaces/matches";
import { AiOutlineClose } from "react-icons/ai";
import { formatNumber } from "../../../../share/ultils";

const MatchupSort = ({
  currentInfo,
}: {
  currentInfo: {
    radiant: PlayerTimeline[];
    dire: PlayerTimeline[];
  };
}) => {
  const heroes = useAppSelector((state) => state.globalData.heroes);
  const [radiantHero, setRadiantHero] = useState<PlayerMatchDetail | null>(
    null
  );
  const [direHero, setDireHero] = useState<PlayerMatchDetail | null>(null);

  const handleRadiant = (player: PlayerMatchDetail) => {
    if (player.heroId !== radiantHero?.heroId) {
      setRadiantHero(player);
    } else {
      setRadiantHero(null);
    }
  };

  const handleDire = (player: PlayerMatchDetail) => {
    if (player.heroId !== direHero?.heroId) {
      setDireHero(player);
    } else {
      setDireHero(null);
    }
  };

  return (
    <section className="flex justify-between p-4 text-sm">
      <div className="flex-1 flex flex-col">
        <div className="flex flex-wrap -ml-2 -mr-2 -mt-2 -mb-2">
          {currentInfo.radiant.map((player) => {
            const {
              heroId,
              role,
              lane,
              kills,
              deaths,
              assists,
              networth,
              partyId,
              imp,
              steamAccount: { name, seasonRank },
            } = player;
            const heroDetail = getDetaiHero(heroes, heroId);
            const imgHero = getImgStratsDota(
              `/heroes/${heroDetail?.shortName}_horz.png`
            );
            const partyColor = getPartyColor(partyId);
            let checkShow = true;
            if (radiantHero) {
              checkShow = radiantHero.heroId === heroId;
            }
            return (
              <div key={heroId} className="w-1/5 p-2">
                <div
                  className="cursor-pointer rounded-md overflow-hidden border border-solid border-borderTender-dark"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(205, 185, 218, 0.15), rgba(61, 28, 109, 0.15))`,
                  }}
                >
                  <div
                    // onClick={() => handleRadiant(player)}
                    className={`relative ${checkShow ? "" : "grayscale"}`}
                  >
                    <MyImage
                      src={imgHero}
                      height="60px"
                      width="100%"
                      alt={heroDetail?.shortName || ""}
                      borderRadius={6}
                    />
                    {partyId !== null && (
                      <>
                        <div
                          className={` w-[20px] h-[15px] absolute top-1 left `}
                        >
                          <div className="w-full h-full relative">
                            <div className="absolute top-0 left-0 bottom-0 right-0 bg-black opacity-80"></div>
                            <div className="absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center">
                              {/* ${partyColor.text} */}
                              <span className={``}>
                                {romanize(
                                  partyId === 0 ? partyId + 1 : partyId
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* ${partyColor.bg} */}
                        <div
                          className={` absolute top-0 left-0 right-0 h-1 `}
                        ></div>
                      </>
                    )}
                    {radiantHero?.heroId === heroId && (
                      <button className="absolute top-1 right-1 text-xl text-white">
                        <AiOutlineClose />
                      </button>
                    )}
                  </div>
                  <div className={`${radiantHero ? "hidden" : "block"}`}>
                    <div>
                      <div className="py-3 bg-layer-dark flex items-center justify-center">
                        <span className="text-end w-1/5">
                          {imp > 0 ? `+${imp}` : imp}
                        </span>
                        <div className="ml-2 w-3/5 h-[7px] bg-gray-800 rounded-md relative">
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
                      <div className="my-3 flex justify-center items-center">
                        <IconTypeRole
                          height={18}
                          width={18}
                          role={role}
                          lane={lane}
                        />
                      </div>
                      <div className="my-3 flex justify-center items-center">
                        <span>{kills}</span>
                        <span className="mx-1">/</span>
                        <span>{deaths}</span>
                        <span className="mx-1">/</span>
                        <span>{assists}</span>
                      </div>
                      <div className="my-3 flex justify-center items-center">
                        <MyImage
                          src="/gold.png"
                          width="15px"
                          height="10px"
                          alt="gold"
                        />
                        <span className="ml-1">
                          {formatNumber(networth ? networth : 0)}
                        </span>
                      </div>
                    </div>
                    <div className="py-2 border-t border-solid border-borderTender-dark">
                      <div className="flex justify-center">
                        <div className="w-[30px]">
                          <RankIcon rank={seasonRank} size={30} />
                        </div>
                      </div>
                      <span className="one-line-max text-center">{name}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex-1 ">
          {radiantHero && <SortDetail player={radiantHero} />}
        </div>
      </div>
      <div className="mx-2 flex items-center">
        <span className="">vs</span>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex flex-wrap -ml-2 -mr-2 -mt-2 -mb-2">
          {currentInfo.dire.map((player) => {
            const {
              heroId,
              role,
              lane,
              kills,
              deaths,
              assists,
              networth,
              partyId,
              imp,
              steamAccount: { name, seasonRank },
            } = player;
            const heroDetail = getDetaiHero(heroes, heroId);
            const imgHero = getImgStratsDota(
              `/heroes/${heroDetail?.shortName}_horz.png`
            );
            const partyColor = getPartyColor(partyId);
            let checkShow = true;
            if (direHero) {
              checkShow = direHero.heroId === heroId;
            }
            return (
              <div key={heroId} className="w-1/5 p-2">
                <div
                  className="cursor-pointer rounded-md overflow-hidden border border-solid border-borderTender-dark"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(205, 185, 218, 0.15), rgba(61, 28, 109, 0.15))`,
                  }}
                >
                  <div
                    // onClick={() => handleDire(player)}
                    className={`relative ${checkShow ? "" : "grayscale"}`}
                  >
                    <MyImage
                      src={imgHero}
                      height="60px"
                      width="100%"
                      alt={heroDetail?.shortName || ""}
                      borderRadius={6}
                    />
                    {partyId !== null && (
                      <>
                        <div
                          className={` w-[20px] h-[15px] absolute top-1 left `}
                        >
                          <div className="w-full h-full relative">
                            <div className="absolute top-0 left-0 bottom-0 right-0 bg-black opacity-80"></div>
                            <div className="absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center">
                              {/* ${partyColor.text} */}
                              <span className={``}>
                                {romanize(
                                  partyId === 0 ? partyId + 1 : partyId
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* ${partyColor.bg} */}
                        <div
                          className={` absolute top-0 left-0 right-0 h-1 `}
                        ></div>
                      </>
                    )}
                    {direHero?.heroId === heroId && (
                      <button className="absolute top-1 right-1 text-xl text-white">
                        <AiOutlineClose />
                      </button>
                    )}
                  </div>
                  <div className={`${direHero ? "hidden" : "block"}`}>
                    <div>
                      <div className="py-3 bg-layer-dark flex items-center justify-center">
                        <span className="text-end w-1/5">
                          {imp > 0 ? `+${imp}` : imp}
                        </span>
                        <div className="ml-2 w-3/5 h-[7px] bg-gray-800 rounded-md relative">
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
                      <div className="my-3 flex justify-center items-center">
                        <IconTypeRole
                          height={18}
                          width={18}
                          role={role}
                          lane={lane}
                        />
                      </div>
                      <div className="my-3 flex justify-center items-center">
                        <span>{kills}</span>
                        <span className="mx-1">/</span>
                        <span>{deaths}</span>
                        <span className="mx-1">/</span>
                        <span>{assists}</span>
                      </div>
                      <div className="my-3 flex justify-center items-center">
                        <MyImage
                          src="/gold.png"
                          width="15px"
                          height="10px"
                          alt="gold"
                        />
                        <span className="ml-1">
                          {formatNumber(networth ? networth : 0)}
                        </span>
                      </div>
                    </div>
                    <div className="py-2 border-t border-solid border-borderTender-dark">
                      <div className="flex justify-center">
                        <div className="w-[30px]">
                          <RankIcon rank={seasonRank} size={30} />
                        </div>
                      </div>
                      <span className="one-line-max text-center">{name}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex-1">
          {direHero && <SortDetail player={direHero} />}
        </div>
      </div>
    </section>
  );
};

export default MatchupSort;
