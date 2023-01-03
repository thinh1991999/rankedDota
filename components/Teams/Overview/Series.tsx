import React, { useState } from "react";
import { TeamOverview } from "../../../interfaces/teamsPage";
import {
  DIRE_ICON,
  getImgStratsDota,
  makeArray,
  RADIANT_ICON,
} from "../../../share";

import MyImage from "../../MyImage";
import ToolTip from "../../ToolTip";
import uniqid from "uniqid";
import {
  AiOutlineCheckCircle,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { getSum, getTimeBySeconds } from "../../../share/ultils";
import HeroIcon from "../../HeroIcon";
import _ from "lodash";
import IconTypeRole from "../../IconTypeRole";
import Link from "next/link";

const Series = ({ team: teamInfo }: { team: TeamOverview }) => {
  const [showId, setShowId] = useState<number | null>(null);
  const {
    team: { series },
  } = teamInfo;

  return (
    <div className="p-2 rounded-md dark:bg-layer-dark bg-layer-light my-4">
      <h5>Recently Completed Series</h5>
      <div className="mt-3">
        {series.map((seri, idx) => {
          const {
            id,
            league,
            matches,
            teamOne,
            teamTwo,
            teamOneWins,
            teamTwoWins,
          } = seri;
          const isRandiantWin = teamOneWins > teamTwoWins;
          const imgTeamOne = getImgStratsDota("/teams/" + teamOne.id + ".png");
          const imgTeamTwo = getImgStratsDota("/teams/" + teamTwo.id + ".png");
          const imgLegend = getImgStratsDota("/leagues/" + league.id + ".png");
          const countMatchTbd = Math.floor((matches.length + 1) / 2);
          const arrMatches = makeArray(countMatchTbd, 1);
          const lastMath = matches[matches.length - 1];
          return (
            <div className="" key={idx}>
              <div
                className={`${
                  id === showId ? "bg-layer-light dark:bg-layer-dark" : ""
                } dark:text-textSecondPrimary-dark text-textSecondPrimary-light px-5 py-3 flex items-center justify-center border-b hover:bg-layer-light dark:hover:bg-layer-dark dark:border-borderTender-dark border-borderTender-light`}
              >
                <div className="flex items-center xl:w-[100px] w-[40px]">
                  <AiOutlineCheckCircle className="mr-1 text-3xl" />
                  <div className="flex-col xl:flex hidden">
                    <span className="font-bold">Finished</span>
                    <span className="text-sm">
                      {getTimeBySeconds(lastMath.startDateTime)}
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="flex justify-end items-center w-2/5">
                    <div
                      className={`flex items-center ${
                        isRandiantWin ? "" : "grayscale opacity-50"
                      }`}
                    >
                      <span className="lg:block hidden">{teamOne?.name}</span>
                      <div className="mx-3">
                        <MyImage
                          src={imgTeamOne}
                          width="40px"
                          height="40px"
                          alt={teamOne?.name || ""}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      {arrMatches.map((vl, idx) => {
                        return (
                          <div
                            className={`${
                              idx < teamOneWins
                                ? "bg-yellow-500"
                                : "dark:bg-layerStrong-dark bg-layerStrong-light"
                            } w-[10px] h-[10px] rounded-full `}
                            key={idx}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                  <span className="w-1/5 text-center text-sm text-textSecondPrimary-light dark:text-textSecondPrimary-dark">
                    vs
                  </span>
                  <div className="flex items-center w-2/5">
                    <div className="flex flex-col">
                      {arrMatches.map((vl, idx) => {
                        return (
                          <div
                            className={`${
                              idx < teamTwoWins
                                ? "bg-yellow-500"
                                : "dark:bg-layerStrong-dark bg-layerStrong-light"
                            } w-[10px] h-[10px] rounded-full `}
                            key={idx}
                          ></div>
                        );
                      })}
                    </div>
                    <div
                      className={`flex items-center ${
                        !isRandiantWin ? "" : "grayscale opacity-50"
                      }`}
                    >
                      <div className="mx-3">
                        <MyImage
                          src={imgTeamTwo}
                          width="40px"
                          height="40px"
                          alt={teamTwo?.name || ""}
                        />
                      </div>
                      <span className="lg:block hidden">{teamTwo?.name}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end w-[40px] xl:w-[150px]">
                  <div className="xl:block hidden">
                    <ToolTip
                      target={
                        <MyImage
                          src={imgLegend}
                          width="100px"
                          height="50px"
                          alt=""
                          borderRadius={3}
                        />
                      }
                      tooltip={<span>{league.displayName}</span>}
                      id={uniqid()}
                    />
                  </div>
                  <button
                    onClick={() =>
                      id === showId ? setShowId(null) : setShowId(id)
                    }
                    className="ml-2 py-2 px-3 rounded-sm hover:bg-layerStrong-light dark:hover:bg-layerStrong-dark"
                  >
                    {id === showId ? <AiOutlineMinus /> : <AiOutlinePlus />}
                  </button>
                </div>
              </div>
              {id === showId && (
                <div className="dark:text-textSecondPrimary-dark text-textSecondPrimary-light">
                  {_.sortBy(matches, (match) => match.startDateTime).map(
                    (match, idx) => {
                      const {
                        id,
                        pickBans,
                        players,
                        direKills,
                        radiantKills,
                        durationSeconds,
                      } = match;
                      let firstPickRadiant = true;
                      _.forEach(pickBans, (p) => {
                        if (p.isPick) {
                          firstPickRadiant = p.isRadiant;
                          return false;
                        }
                      });
                      return (
                        <Link href={"/matches/" + id} key={idx}>
                          <a className="flex flex-wrap items-center px-5 py-3 border-t border-b hover:bg-layer-light dark:hover:bg-layer-dark dark:border-borderTender-dark border-borderTender-light">
                            <div className="xl:hidden flex justify-between w-full">
                              <div className="flex items-center">
                                <AiOutlineCheckCircle className="mr-1 text-3xl" />
                                <div className="flex flex-col">
                                  <span className="font-bold">
                                    Game {idx + 1}
                                  </span>
                                  <span className="text-sm">Finished</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-center text-sm">
                                <span>{getSum(radiantKills)}</span>
                                <span className="mx-2">-</span>
                                <span>{getSum(direKills)}</span>
                              </div>
                              <div className="flex items-center justify-center text-sm">
                                <span className="text-sm font-light">
                                  {getTimeBySeconds(durationSeconds)}
                                </span>
                              </div>
                            </div>
                            <div className="hidden xl:flex items-center w-[100px]">
                              <AiOutlineCheckCircle className="mr-1 text-3xl" />
                              <div className="flex flex-col">
                                <span className="font-bold">
                                  Game {idx + 1}
                                </span>
                                <span className="text-sm">Finished</span>
                              </div>
                            </div>
                            <div className="xl:my-0 my-3 w-full xl:flex-1 flex items-center">
                              <div className="w-1/2 xl:w-2/5 flex items-center xl:justify-end justify-start">
                                <div className="items-center xl:flex hidden">
                                  {firstPickRadiant && (
                                    <div className="w-[30px] h-[25px]  rounded-md text-xs dark:bg-layerStrong-dark bg-layerStrong-light mr-2">
                                      <ToolTip
                                        target={
                                          <div className="w-full h-full flex justify-center items-center">
                                            <span>1st</span>
                                          </div>
                                        }
                                        tooltip={<span>First Pick</span>}
                                        id={uniqid()}
                                      />
                                    </div>
                                  )}
                                  <MyImage
                                    src={RADIANT_ICON}
                                    width="20px"
                                    height="20px"
                                    alt=""
                                    borderRadius={5}
                                  />
                                </div>
                                <div className="xl:block hidden w-[1px] bg-borderSecondary-dark h-[15px] mx-5"></div>
                                {pickBans.map((p, idx) => {
                                  if (!p.isPick || !p.isRadiant) return;
                                  const player = players.filter(
                                    (player) => player.heroId === p.heroId
                                  );
                                  const playerReal = player[0];
                                  const img = getImgStratsDota(
                                    "/players/" +
                                      playerReal.steamAccount.id +
                                      ".png"
                                  );
                                  return (
                                    <div
                                      className="w-[20px] h-[20px] xl:h-[30px] xl:w-[30px] mx-1"
                                      key={idx}
                                    >
                                      <HeroIcon
                                        id={p.heroId}
                                        tooltip={
                                          <div className="p-2 rounded-md">
                                            <div className="flex items-center">
                                              <div className="w-[50px] h-[50px]">
                                                <MyImage
                                                  src={img}
                                                  width="100%"
                                                  height="100%"
                                                  alt=""
                                                  borderRadius={5}
                                                />
                                              </div>
                                              <div className="">
                                                <span>
                                                  {
                                                    playerReal.steamAccount
                                                      .proSteamAccount.name
                                                  }
                                                </span>
                                                <div className="">
                                                  {/* <IconTypeRole role={playerReal.steamAccount.proSteamAccount.}/> */}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        }
                                        full={true}
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="w-1/5 hidden xl:flex items-center justify-center text-sm">
                                <span>{getSum(radiantKills)}</span>
                                <span className="mx-2">-</span>
                                <span>{getSum(direKills)}</span>
                              </div>
                              <div className="w-1/2 xl:w-2/5 flex items-center xl:justify-start justify-end">
                                {pickBans.map((p, idx) => {
                                  if (!p.isPick || p.isRadiant) return;
                                  const player = players.filter(
                                    (player) => player.heroId === p.heroId
                                  );
                                  const playerReal = player[0];
                                  const img = getImgStratsDota(
                                    "/players/" +
                                      playerReal.steamAccount.id +
                                      ".png"
                                  );
                                  return (
                                    <div
                                      className="w-[20px] h-[20px] xl:h-[30px] xl:w-[30px] mx-1"
                                      key={idx}
                                    >
                                      <HeroIcon
                                        id={p.heroId}
                                        tooltip={
                                          <div className="p-2 rounded-md">
                                            <div className="flex items-center">
                                              <div className="w-[50px] h-[50px]">
                                                <MyImage
                                                  src={img}
                                                  width="100%"
                                                  height="100%"
                                                  alt=""
                                                  borderRadius={5}
                                                />
                                              </div>
                                              <div className="">
                                                <span>
                                                  {
                                                    playerReal.steamAccount
                                                      .proSteamAccount.name
                                                  }
                                                </span>
                                                <div className="">
                                                  {/* <IconTypeRole role={playerReal.steamAccount.proSteamAccount.}/> */}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        }
                                        full={true}
                                      />
                                    </div>
                                  );
                                })}
                                <div className="w-[1px] xl:block hidden bg-borderSecondary-dark h-[15px] mx-5"></div>
                                <div className="items-center xl:flex hidden">
                                  <MyImage
                                    src={DIRE_ICON}
                                    width="20px"
                                    height="20px"
                                    alt=""
                                    borderRadius={5}
                                  />
                                  {!firstPickRadiant && (
                                    <div className="w-[30px] h-[25px]  rounded-md text-xs dark:bg-layerStrong-dark bg-layerStrong-light ml-2">
                                      <ToolTip
                                        target={
                                          <div className="w-full h-full flex justify-center items-center">
                                            <span>1st</span>
                                          </div>
                                        }
                                        tooltip={<span>First Pick</span>}
                                        id={uniqid()}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="xl:flex hidden w-[150px] justify-end items-center">
                              <span className="text-sm font-light">
                                {getTimeBySeconds(durationSeconds)}
                              </span>
                            </div>
                            <div className="xl:hidden w-full flex items-center justify-between">
                              <div className="flex items-center">
                                {firstPickRadiant && (
                                  <div className="w-[30px] h-[25px]  rounded-md text-xs dark:bg-layerStrong-dark bg-layerStrong-light mr-2">
                                    <ToolTip
                                      target={
                                        <div className="w-full h-full flex justify-center items-center">
                                          <span>1st</span>
                                        </div>
                                      }
                                      tooltip={<span>First Pick</span>}
                                      id={uniqid()}
                                    />
                                  </div>
                                )}
                                <MyImage
                                  src={RADIANT_ICON}
                                  width="20px"
                                  height="20px"
                                  alt=""
                                  borderRadius={5}
                                />
                              </div>
                              <div className="flex items-center">
                                <MyImage
                                  src={DIRE_ICON}
                                  width="20px"
                                  height="20px"
                                  alt=""
                                  borderRadius={5}
                                />
                                {!firstPickRadiant && (
                                  <div className="w-[30px] h-[25px]  rounded-md text-xs dark:bg-layerStrong-dark bg-layerStrong-light ml-2">
                                    <ToolTip
                                      target={
                                        <div className="w-full h-full flex justify-center items-center">
                                          <span>1st</span>
                                        </div>
                                      }
                                      tooltip={<span>First Pick</span>}
                                      id={uniqid()}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </a>
                        </Link>
                      );
                    }
                  )}
                  <div
                    className={`${
                      id === showId ? "bg-layer-light dark:bg-layer-dark" : ""
                    } xl:hidden flex justify-end px-5 py-3 border-t border-b hover:bg-layer-light dark:hover:bg-layer-dark dark:border-borderTender-dark border-borderTender-light`}
                  >
                    <div className="">
                      <ToolTip
                        target={
                          <MyImage
                            src={imgLegend}
                            width="80px"
                            height="30px"
                            alt=""
                            borderRadius={3}
                          />
                        }
                        tooltip={<span>{league.displayName}</span>}
                        id={uniqid()}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Series;
