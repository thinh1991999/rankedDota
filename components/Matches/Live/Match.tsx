import _ from "lodash";
import moment from "moment";
import React from "react";
import { MatchLiveCal } from "../../../interfaces/matches";
import HeroIcon from "../../HeroIcon";
import MyImage from "../../MyImage";
import { nFormatter, formatNumber } from "../../../share/ultils";
import Map from "../../Map";

const Info = ({
  netWorth,
  wrr,
  radiantScore,
  direScore,
}: {
  netWorth: any;
  wrr: any;
  direScore: number;
  radiantScore: number;
}) => {
  return (
    <div className="bg-layerStrong-light dark:bg-layerStrong-dark overflow-hidden rounded-md flex flex-col h-[214px]">
      <div className="flex justify-center h-[70px] relative">
        <div
          className={`${
            netWorth.radiant - netWorth.dire > 0 ? "left-0" : "right-0"
          } absolute  top-0 bottom-0 w-[70px] bg-layerSecondary-light dark:bg-layerSecondary-dark rounded-md flex flex-col justify-center items-center`}
        >
          <MyImage src="/gold.png" height="9px" width="15px" alt="gold" />
          <span className="text-sm text-yellow-500">
            +
            {netWorth.radiant - netWorth.dire > 0
              ? nFormatter(netWorth.radiant - netWorth.dire, 0)
              : nFormatter(netWorth.dire - netWorth.radiant, 0)}
          </span>
        </div>
        <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-green-500"></div>
        <div className="flex items-center">
          <span className="text-xl">{radiantScore}</span>
          <span className="mx-2 text-xl"> - </span>
          <span className="text-xl">{direScore}</span>
        </div>

        <div className="absolute top-0 bottom-0 right-0 w-[2px] bg-red-500"></div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <span className="text-sm text-textSecondPrimary-light dark:text-textSecondPrimary-dark">
          Win Probability
        </span>
        <span
          className={`${wrr?.isRadiant ? "text-green-500" : "text-red-500"}`}
        >
          {wrr?.isRadiant ? "Radiant" : "Dire"} ({nFormatter(wrr?.wr || 0, 0)}%)
        </span>
      </div>
    </div>
  );
};

const Match = ({ matchData }: { matchData: MatchLiveCal }) => {
  const {
    match: { radiantScore, direScore, gameTime, averageRank, players },
    netWorth,
    wrr,
  } = matchData;
  const time = moment.utc(gameTime * 1000).format("HH:mm:ss");
  return (
    <div className="p-2 rounded-md bg-layer-light dark:bg-layer-dark shadow-cardLight">
      <div className="flex justify-between">
        <div className="">
          <span>{gameTime < 0 ? "Hero Selection" : time} </span>
        </div>
        <span className="text-sm text-textSecondPrimary-light dark:text-textSecondPrimary-dark">
          {averageRank ? formatNumber(averageRank) : "Unknown"} Average MMR
        </span>
      </div>
      <div className="flex flex-wrap -ml-2 -mr-2">
        <div className="lg:hidden block flex-1 p-2 ">
          <Info
            netWorth={netWorth}
            wrr={wrr}
            radiantScore={radiantScore}
            direScore={direScore}
          />
        </div>
        <div className="p-2 lg:hidden block w-full">
          <div className="w-full flex justify-center items-center h-full bg-layerStrong-light dark:bg-layerStrong-dark px-2 rounded-md">
            <Map match={matchData.match} size={300} />
          </div>
        </div>
        <div className="lg:w-3/12 w-full p-2 ">
          <div className="bg-layerStrong-light dark:bg-layerStrong-dark px-3 py-2 rounded-md">
            {players.map((player, idx) => {
              if (idx > 4) return;
              const {
                heroId,
                numKills,
                numAssists,
                numDeaths,
                steamAccount: { proSteamAccount },
              } = player;
              return (
                <div key={player.steamAccount.id} className="my-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center overflow-hidden mr-2">
                      <div className="w-[30px] h-[30px] flex justify-center items-center">
                        {heroId ? (
                          <HeroIcon id={heroId} filterClass="filter-green" />
                        ) : (
                          <div className="w-[15px] h-[15px] rounded-full bg-layer-dark"></div>
                        )}
                      </div>
                      <div className="ml-1 text-sm">
                        {proSteamAccount ? (
                          <div className="flex items-center">
                            <MyImage
                              src="/proPlayer.svg"
                              width="15px"
                              height="15px"
                              alt="pro player"
                            />
                            <span className="ml-1">
                              {player.steamAccount.proSteamAccount?.name}
                            </span>
                          </div>
                        ) : (
                          <span className="ml-1 one-line-max">
                            {player.steamAccount.name}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-textSecondPrimary-light dark:text-textSecondPrimary-dark flex items-center">
                      <span>{numKills}</span>
                      <span className="text-xs mx-2">/</span>
                      <span>{numDeaths}</span>
                      <span className="text-xs mx-2">/</span>
                      <span>{numAssists}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-2 lg:block hidden">
          <div className="w-full flex justify-center items-center h-full bg-layerStrong-light dark:bg-layerStrong-dark px-2 rounded-md">
            <Map match={matchData.match} />
          </div>
        </div>
        <div className="lg:w-3/12 w-full p-2 ">
          <div className="bg-layerStrong-light dark:bg-layerStrong-dark px-3 py-2 rounded-md">
            {players.map((player, idx) => {
              if (idx < 5) return;
              const {
                heroId,
                numKills,
                numAssists,
                numDeaths,
                steamAccount: { proSteamAccount },
              } = player;
              return (
                <div key={player.steamAccount.id} className="my-2">
                  <div className="flex items-center justify-between">
                    <div className="lg:hidden flex items-center overflow-hidden mr-2">
                      <div className="w-[30px] h-[30px] flex justify-center items-center">
                        {heroId ? (
                          <HeroIcon id={heroId} filterClass="filter-red" />
                        ) : (
                          <div className="w-[15px] h-[15px] rounded-full bg-layer-dark"></div>
                        )}
                      </div>
                      <div className="ml-1 text-sm">
                        {proSteamAccount ? (
                          <div className="flex items-center">
                            <MyImage
                              src="/proPlayer.svg"
                              width="15px"
                              height="15px"
                              alt="pro player"
                            />
                            <span className="ml-1">
                              {player.steamAccount.proSteamAccount?.name}
                            </span>
                          </div>
                        ) : (
                          <span className="ml-1 one-line-max">
                            {player.steamAccount.name}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-textSecondPrimary-light dark:text-textSecondPrimary-dark flex items-center">
                      <span>{numKills}</span>
                      <span className="text-xs mx-2">/</span>
                      <span>{numDeaths}</span>
                      <span className="text-xs mx-2">/</span>
                      <span>{numAssists}</span>
                    </div>
                    <div className="lg:flex hidden items-center overflow-hidden ml-2">
                      <div className="mr-2 text-sm">
                        {proSteamAccount ? (
                          <div className="flex items-center">
                            <MyImage
                              src="/proPlayer.svg"
                              width="15px"
                              height="15px"
                              alt="pro player"
                            />
                            <span className="ml-1">
                              {player.steamAccount.proSteamAccount?.name}
                            </span>
                          </div>
                        ) : (
                          <span className="ml-1 one-line-max">
                            {player.steamAccount.name}
                          </span>
                        )}
                      </div>
                      <div className="w-[30px] h-[30px] flex justify-center items-center">
                        {heroId ? (
                          <HeroIcon id={heroId} filterClass="filter-red" />
                        ) : (
                          <div className="w-[15px] h-[15px] rounded-full bg-layer-dark"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="lg:block hidden flex-1 p-2 ">
          <Info
            netWorth={netWorth}
            wrr={wrr}
            radiantScore={radiantScore}
            direScore={direScore}
          />
        </div>
      </div>
    </div>
  );
};

export default Match;
