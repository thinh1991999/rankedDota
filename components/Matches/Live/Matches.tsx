import forEach from "lodash/forEach";
import orderBy from "lodash/orderBy";
import map from "lodash/map";
import findLast from "lodash/findLast";
import { ClipLoader } from "react-spinners";
import React, { useState, useEffect } from "react";
import Match from "./Match";
import InfiniteScroll from "react-infinite-scroll-component";
import { MatchLive, MatchLiveCal } from "../../../interfaces/matches";
import stratsApiService from "../../../services/stratsApi.service";

const handleMatches = (matches: MatchLive[]) => {
  const newMatches = orderBy(matches, (match) => match.averageRank, "desc");
  const finalMatches = map(newMatches, (match) => {
    const { players, liveWinRateValues } = match;
    const wr = findLast(liveWinRateValues);
    let radiantNw = 0;
    let direNw = 0;
    forEach(players, (player) => {
      if (player.isRadiant) {
        radiantNw += player.networth;
      } else {
        direNw += player.networth;
      }
    });
    const netWorth = {
      radiant: radiantNw,
      dire: direNw,
    };
    let wrr = null;
    if (wr) {
      wrr = {
        isRadiant: true,
        wr: wr.winRate * 100,
      };
    }
    return {
      match,
      netWorth,
      wrr,
    };
  });
  return finalMatches;
};

const Matches = ({ matches }: { matches: MatchLive[] }) => {
  const [matchesSort, setMatchesSort] = useState<MatchLiveCal[]>([]);
  const [countShow, setCountShow] = useState<number>(3);
  const [showMore, setShowMore] = useState<boolean>(true);
  const [mainLoading, setMainLoading] = useState(true);

  const handleNext = () => {
    const newCount = countShow + 3;
    if (matchesSort.length - newCount < 3) {
      setCountShow(matchesSort.length);
      setShowMore(false);
    } else {
      setCountShow(newCount);
    }
  };

  useEffect(() => {
    setMainLoading(true);
    setTimeout(() => {
      setMatchesSort(handleMatches(matches));
      setMainLoading(false);
    }, 100);
  }, [matches]);

  useEffect(() => {
    const resetData = setInterval(() => {
      stratsApiService.getMatchesLive().then((res) => {
        const { data } = res.data;
        if (data) {
          const {
            live: { matches },
          } = data;
          setMatchesSort(handleMatches(matches));
        }
      });
    }, 30000);
    return () => {
      clearInterval(resetData);
    };
  }, []);

  if (mainLoading) {
    return (
      <div className="justify-center flex">
        <ClipLoader color="#fff" size={40} />
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={countShow}
      next={handleNext}
      hasMore={showMore}
      loader={<span className="text-white">Loading...</span>}
      scrollableTarget="main"
    >
      {matchesSort.map((match, idx) => {
        if (idx < countShow) {
          return (
            <div key={idx} className="my-4">
              <Match matchData={match} />
            </div>
          );
        }
        return;
      })}
    </InfiniteScroll>
  );
};
{
}
export default Matches;
