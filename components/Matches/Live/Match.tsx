import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { MatchLive } from "../../../interfaces/matches";
import HeroIcon from "../../HeroIcon";
import MyImage from "../../MyImage";
import { nFormatter } from "../../../share/ultils";
import Map from "../../Map";

const Match = ({ match }: { match: MatchLive }) => {
  const [networths, setNetworths] = useState<{
    radiant: number;
    dire: number;
  }>({
    radiant: 0,
    dire: 0,
  });
  const [winrate, setWinrate] = useState<{
    isRadiant: boolean;
    wr: number;
  }>({
    isRadiant: false,
    wr: 0,
  });
  const { players, winRateValues, direScore, radiantScore } = match;
  const time = moment.utc(match.gameTime * 1000).format("HH:mm:ss");
  useEffect(() => {
    let totalWr = 0;
    const { players, liveWinRateValues } = match;
    const wr = _.findLast(liveWinRateValues);
    let radiantNw = 0;
    let direNw = 0;
    _.forEach(players, (player) => {
      if (player.isRadiant) {
        radiantNw += player.networth;
      } else {
        direNw += player.networth;
      }
    });
    setNetworths({
      radiant: radiantNw,
      dire: direNw,
    });
    if (wr) {
      setWinrate({
        isRadiant: true,
        wr: wr.winRate * 100,
      });
    }
  }, [match]);

  return (
    <section className="p-2 rounded-md bg-layer-dark">
      <div className="flex justify-between">
        <div className="">
          <span>{match.gameTime < 0 ? "Hero Selection" : time} </span>
        </div>
        <span className="text-sm text-textSecondPrimary-dark">
          {match.averageRank} Average MMR
        </span>
      </div>
      <div className="flex flex-wrap -ml-2 -mr-2">
        <div className="w-3/12 p-2 ">
          <div className="bg-layerStrong-dark p-2 rounded-md">
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
                    <div className="flex items-center">
                      <div className="w-[30px] h-[30px] flex justify-center items-center">
                        {heroId ? (
                          <div className="filter-green">
                            <HeroIcon id={heroId} />
                          </div>
                        ) : (
                          <div className="w-[15px] h-[15px] rounded-full bg-gray-400"></div>
                        )}
                      </div>
                      <div className="ml-1 text-sm">
                        {proSteamAccount ? (
                          <div className="flex items-center">
                            <MyImage
                              src="/proPlayer.svg"
                              width={15}
                              height={15}
                              alt="pro player"
                            />
                            <span className="ml-1">
                              {player.steamAccount.proSteamAccount?.name}
                            </span>
                          </div>
                        ) : (
                          <span className="ml-1">
                            {player.steamAccount.name}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-textSecondPrimary-dark">{`${numKills} / ${numDeaths} / ${numAssists}`}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-[300px] p-2">
          <div className="p-2 h-[200px] w-[200px] bg-layer-dark rounded-md">
            <Map match={match} />
          </div>
        </div>
        <div className="w-3/12 p-2 ">
          <div className="bg-layerStrong-dark p-2 rounded-md">
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
                    <span className="text-sm text-textSecondPrimary-dark">{`${numKills} / ${numDeaths} / ${numAssists}`}</span>
                    <div className="flex items-center">
                      <div className="mr-2 text-sm">
                        {proSteamAccount ? (
                          <div className="flex items-center">
                            <MyImage
                              src="/proPlayer.svg"
                              width={15}
                              height={15}
                              alt="pro player"
                            />
                            <span className="ml-1">
                              {player.steamAccount.proSteamAccount?.name}
                            </span>
                          </div>
                        ) : (
                          <span className="ml-1">
                            {player.steamAccount.name}
                          </span>
                        )}
                      </div>
                      <div className="w-[30px] h-[30px] flex justify-center items-center">
                        {heroId ? (
                          <div className="filter-red">
                            <HeroIcon id={heroId} />
                          </div>
                        ) : (
                          <div className="w-[15px] h-[15px] rounded-full bg-gray-400"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex-1 p-2 ">
          <div className="bg-layerStrong-dark overflow-hidden rounded-md flex flex-col h-[214px]">
            <div className="flex justify-center h-[70px] relative">
              <div
                className={`${
                  networths.radiant - networths.dire > 0 ? "left-0" : "right-0"
                } absolute  top-0 bottom-0 w-[70px] bg-layer-dark rounded-md flex flex-col justify-center items-center`}
              >
                <MyImage src="/gold.png" height={9} width={15} alt="gold" />
                <span className="text-sm text-yellow-500">
                  +
                  {networths.radiant - networths.dire > 0
                    ? nFormatter(networths.radiant - networths.dire, 0)
                    : nFormatter(networths.dire - networths.radiant, 0)}
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
              <span className="text-sm text-textSecondPrimary-dark">
                Win Probability
              </span>
              <span
                className={`${
                  winrate.isRadiant ? "text-green-500" : "text-red-500"
                }`}
              >
                {winrate.isRadiant ? "Radiant" : "Dire"} (
                {nFormatter(winrate.wr, 0)}%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Match;
