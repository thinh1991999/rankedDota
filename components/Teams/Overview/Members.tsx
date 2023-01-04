import React, { useState, useEffect } from "react";
import orderBy from "lodash/orderBy";
import forEach from "lodash/forEach";
import moment from "moment";
import { Member, TeamOverview } from "../../../interfaces/teamsPage";
import MyImage from "../../MyImage";
import {
  getFlagImgLink,
  getImgStratsDota,
  sortRolesTeam,
} from "../../../share/ultils";
import IconTypeRole from "../../IconTypeRole";

const Members = ({ team: teamInfo }: { team: TeamOverview }) => {
  const [data, setData] = useState<(Member & { lane: string })[]>([]);
  const [headInfo, setHeadInfo] = useState<{
    matches: number;
    wr: number;
    lastMatch: string;
  }>();

  useEffect(() => {
    if (!teamInfo.team) return;
    const {
      team: { members, lastMatchDateTime, winCount, lossCount },
    } = teamInfo;
    const teams: (Member & { lane: string })[] = [];
    const newTeams = orderBy(members, (m) => {
      return m.lastMatchDateTime;
    });
    forEach(newTeams, (m) => {
      teams.push({
        ...m,
        lane: m.player.steamAccount.proSteamAccount?.position || "",
      });
    });
    setData(sortRolesTeam(teams));
    setHeadInfo({
      matches: lossCount + winCount,
      wr: Math.round((winCount * 100) / (winCount + lossCount)),
      lastMatch: moment.unix(lastMatchDateTime).fromNow(),
    });
  }, [teamInfo]);

  if (!teamInfo.team) return <></>;
  return (
    <>
      <div className="flex flex-wrap items-center my-4">
        <div className="p-2">
          <div className="flex items-center rounded-md dark:bg-layer-dark bg-layer-light ">
            <div className="px-2 capitalize text-textSecondPrimary-light dark:text-textSecondPrimary-dark text-sm">
              <span>Win rate</span>
            </div>
            <div className="px-4 py-3 rounded-sm bg-layerStrong-light dark:bg-layerStrong-dark">
              <span
                className={`${
                  headInfo?.wr && headInfo.wr >= 50
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {headInfo?.wr}%
              </span>
            </div>
          </div>
        </div>
        <div className="p-2">
          <div className="flex items-center rounded-md dark:bg-layer-dark bg-layer-light ">
            <div className="px-2 capitalize text-textSecondPrimary-light dark:text-textSecondPrimary-dark text-sm">
              <span>match count</span>
            </div>
            <div className="px-4 py-3 rounded-sm bg-layerStrong-light dark:bg-layerStrong-dark">
              <span className={`text-yellow-500`}>{headInfo?.matches}</span>
            </div>
          </div>
        </div>
        <div className="p-2">
          <div className="flex items-center rounded-md dark:bg-layer-dark bg-layer-light ">
            <div className="px-2 capitalize text-textSecondPrimary-light dark:text-textSecondPrimary-dark text-sm">
              <span>last match</span>
            </div>
            <div className="px-4 py-3 rounded-sm bg-layerStrong-light dark:bg-layerStrong-dark">
              <span className={``}>{headInfo?.lastMatch}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="my-4">
        <div className="flex flex-wrap -ml-2 -mr-2">
          {data.map((member, idx) => {
            const {
              firstMatchDateTime,
              lane,
              player: {
                matchesGroupBy,
                steamAccountId,
                steamAccount: {
                  id,
                  name,
                  avatar,
                  proSteamAccount: { name: proName, realName, countries },
                },
              },
            } = member;
            const img = getImgStratsDota("/players/" + id + ".png");
            const flag = getFlagImgLink(countries[0]);
            return (
              <div
                className="xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-2"
                key={idx}
              >
                <div className="flex flex-col bg-layer-light dark:bg-layer-dark rounded-md">
                  <div className="flex justify-center">
                    <MyImage
                      src={img}
                      width="150px"
                      height="150px"
                      alt={name}
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center py-2 text-textSecondPrimary-light dark:text-textSecondPrimary-dark">
                    <span className="text-textMain-light dark:text-textMain-dark mb-1">
                      {proName}
                    </span>
                    <MyImage
                      src={flag}
                      width="25px"
                      height="15px"
                      alt=""
                      borderRadius={2}
                    />
                    <span className="my-1">{realName}</span>
                    <div className="my-1">
                      <IconTypeRole role={lane} width={20} height={20} />
                    </div>
                    <div className="flex flex-col my-1 justify-center items-center">
                      <span>Match count</span>
                      <span className="text-textMain-light dark:text-textMain-dark ">
                        {matchesGroupBy[0]?.matchCount || 0}
                      </span>
                    </div>
                    <div className="flex flex-col my-1 justify-center items-center">
                      <span>First match</span>
                      <span className="text-textMain-light dark:text-textMain-dark ">
                        {moment.unix(firstMatchDateTime).fromNow()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Members;
