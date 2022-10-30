import React, { useState, useEffect } from "react";
import { Leaderboard, Player } from "../../../interfaces/players";
import MyImage from "../../MyImage";
import RankIcon from "../../RankIcon";
import {
  formatNumber,
  nFormatter,
  getImgStratsDota,
} from "../../../share/ultils";
import { GOLD_ICON } from "../../../share";
import _ from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";
import stratsApiService from "../../../services/stratsApi.service";

const Coaches = ({ leaderboard }: { leaderboard: Leaderboard | null }) => {
  const [coaches, setCoaches] = useState<Player[]>(
    leaderboard?.coaching.players || []
  );
  const [maxPoints, setMaxPoints] = useState<number>(50000);
  const [maxCoaches, setMaxCoaches] = useState<number>(1000);
  const [skip, setSkip] = useState(0);
  const [loadMore, setLoadMore] = useState<boolean>(true);

  const handleNext = () => {
    setSkip(skip + 20);
  };

  useEffect(() => {
    setMaxPoints(_.maxBy(coaches, (player) => player.rating)?.rating || 50000);
    setMaxCoaches(
      _.maxBy(coaches, (player) => player.matchCount)?.matchCount || 1000
    );
  }, [coaches]);

  useEffect(() => {
    stratsApiService
      .getCoachesLeaderboard(skip)
      .then((res) => {
        const { players } = res.data.data.leaderboard.coaching;
        setCoaches((prev) => {
          return [...prev, ...players];
        });
      })
      .catch(() => setLoadMore(false));
  }, [skip]);

  return (
    <div className="mt-5 w-[1240px] overflow-x-scroll lg:overflow-hidden text-textSecondPrimary-dark">
      <InfiniteScroll
        dataLength={coaches.length}
        next={handleNext}
        hasMore={loadMore}
        loader={<p>loading</p>}
        scrollableTarget="main"
      >
        <div className="flex items-center justify-between py-5 rounded-md bg-layer-dark  font-bold">
          <div className="w-[100px]"></div>
          <div className="w-[230px] text-center">Coach</div>
          <div className="w-[230px] text-center">Points</div>
          <div className="w-[230px] text-center">Matches Coached</div>
          <div className="w-[230px] text-center">Win Rate</div>
          <div className="flex-1 text-center">Region</div>
        </div>
        <div className="">
          {coaches.map((player, idx) => {
            const {
              rating,
              matchCount,
              winCount,
              steamAccount: { id, seasonRank, avatar, name, lastMatchRegionId },
            } = player;

            const wr = (winCount * 100) / matchCount;
            const pointPc = (rating * 100) / maxPoints;
            const matchesPc = (matchCount * 100) / maxCoaches;
            const checkAvatar = avatar.includes("https");

            return (
              <div
                key={id}
                className="flex items-center py-4 border border-solid border-borderTender-dark"
              >
                <div className="flex items-center w-[330px]">
                  <span className="w-[30px] text-center">{idx + 1}</span>
                  <div className="w-[30px] h-[30px]">
                    <RankIcon rank={seasonRank} size={30} />
                  </div>
                  <div className="mx-2 w-[50px] h-[50px]">
                    <MyImage
                      src={
                        checkAvatar
                          ? avatar
                          : `https://avatars.steamstatic.com/${avatar.slice(3)}`
                      }
                      width="50px"
                      height="50px"
                      alt={name}
                      borderRadius={6}
                    />
                  </div>
                  <h6 className="one-line-max flex-1">{name}</h6>
                </div>
                <div className="w-[230px] flex items-center">
                  <MyImage
                    src={GOLD_ICON}
                    width="18px"
                    height="18px"
                    alt="gold"
                  />
                  <span className="text-sm mx-2">{nFormatter(rating, 1)}</span>
                  <div className="relative w-[150px] h-[10px] bg-layerStrong-dark rounded-sm overflow-hidden">
                    <div
                      className={`bg-yellow-500 absolute left-0 bottom-0 top-0  rounded-sm`}
                      style={{
                        width: `${pointPc}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="w-[230px] flex items-center">
                  <span className="text-sm mx-2">{matchCount}</span>
                  <div className="relative w-[150px] h-[10px] bg-layerStrong-dark rounded-sm overflow-hidden">
                    <div
                      className={`bg-gray-500 absolute left-0 bottom-0 top-0  rounded-sm`}
                      style={{
                        width: `${matchesPc}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="w-[230px] flex items-center">
                  <span className="text-sm mx-2">{wr.toFixed(1)} %</span>
                  <div className="relative w-[150px] h-[10px] bg-layerStrong-dark rounded-sm">
                    <div
                      className={`${
                        wr >= 50 ? "bg-green-500" : "bg-red-500"
                      } absolute left-0 bottom-0 top-0  rounded-sm`}
                      style={{
                        width: `${wr}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Coaches;
