import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineDown,
  AiOutlineHeart,
  AiOutlineUp,
} from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import { getTypeOfHero } from "../../../share";
import { useAppSelector } from "../../../store";
import IconTypeRole from "../../IconTypeRole";
import MyImage from "../../MyImage";
import ToolTip from "../../ToolTip";
import uniqid from "uniqid";
import { Season } from "../../../interfaces/players";
import RankIcon from "../../RankIcon";
import InfiniteScroll from "react-infinite-scroll-component";
import _ from "lodash";

const Row = ({ s }: { s: Season }) => {
  const {
    position,
    rank,
    rankShift,
    steamAccount: { name, proSteamAccount },
  } = s;
  let finalName = name;
  let finalTeam = "";
  let flag = "";
  let color = "hsl(253,44%,47%)";
  let border = "hsl(187,28.999999999999996%,73%)";
  if (proSteamAccount) {
    const { name, team, countries } = proSteamAccount;
    finalName = name;
    if (team) {
      finalTeam = team.tag || "";
    }
    if (countries.length > 0) {
      flag = countries[0];
    }
  }
  if (rank > 10 && rank <= 100) {
    color = "hsl(358,81%,18%)";
    border = "hsl(43,63%,56.99999999999999%)";
  }
  if (rank > 100) {
    color = "hsl(44,100%,24%)";
    border = "hsl(240,1%,74%)";
  }
  const rankCheck = rankShift ? rankShift - rank : 0;
  const flagImg = `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/${flag}.svg`;
  return (
    <div className="flex items-center justify-between text-textMain-dark py-5 px-5 border-b border-solid border-borderTender-dark">
      <div className="flex items-center">
        <div className="w-[100px] flex justify-start">
          <div className="flex justify-center items-center relative text-[11px]">
            <svg width={9} height={24}>
              <g transform="matrix(1,0,0,1,-0.321777,0)">
                <path
                  d="M9.5,24L9.5,0L6.064,0L6.064,0.579C6.064,3.435 3.752,5.75 0.901,5.75L0.322,5.75L0.322,18.25L0.901,18.25C3.752,18.25 6.064,20.564 6.064,23.419L6.064,24L9.5,24Z"
                  fillOpacity="0.6"
                />
                <path
                  d="M9.5,1.162L9.5,22.841L7.198,22.841C6.922,19.808 4.51,17.392 1.48,17.117L1.48,6.884C4.51,6.609 6.922,4.194 7.198,1.162L9.5,1.162Z"
                  fill={border}
                />
                <path
                  d="M9.5,2.984L9.5,21.01L8.698,21.01L8.559,20.629C7.737,18.367 5.945,16.572 3.686,15.75L3.305,15.61L3.305,8.384L3.686,8.245C5.945,7.423 7.737,5.628 8.559,3.366L8.698,2.984L9.5,2.984Z"
                  fill={color}
                />
                <path
                  d="M9.5,2.984L9.5,4.145C8.557,6.422 6.738,8.243 4.465,9.186L4.464,14.807C6.738,15.752 8.557,17.573 9.5,19.85L9.5,21.01L8.698,21.01L8.561,20.629L8.559,20.629C7.737,18.367 5.945,16.572 3.686,15.75L3.305,15.61L3.305,8.384L3.686,8.245C5.945,7.423 7.737,5.628 8.559,3.366L8.698,2.984L9.5,2.984Z"
                  fillOpacity="0.6"
                />
              </g>
            </svg>
            <svg width={rank.toString().length * 4 + 4} height={24}>
              <g transform="matrix(1,0,0,1,-9.5,0)">
                <rect
                  x="9.5"
                  y={0}
                  width="100%"
                  height={24}
                  fillOpacity="0.6"
                  fillRule="nonzero"
                />
                <rect
                  x="9.5"
                  y="1.162"
                  width="100%"
                  height="21.679"
                  fill={border}
                  fillRule="nonzero"
                />
                <rect
                  x="9.5"
                  y="2.984"
                  width="100%"
                  height="18.026"
                  fill={color}
                  fillRule="nonzero"
                />
                <rect
                  x="9.5"
                  y="2.984"
                  width="100%"
                  height="1.2"
                  fill="black"
                  fillOpacity="0.6"
                />
                <rect
                  x="9.5"
                  y="19.784"
                  width="100%"
                  height="1.2"
                  fill="black"
                  fillOpacity="0.6"
                />
              </g>
            </svg>
            <svg width={10} height={24}>
              <g transform="matrix(1,0,0,1,-17.5,0)">
                <path
                  d="M20.934,0L20.934,0.579C20.934,3.435 23.246,5.75 26.098,5.75L26.678,5.75L26.678,18.25L26.098,18.25C23.246,18.25 20.934,20.564 20.934,23.419L20.934,24L17.5,24L17.5,0L20.934,0Z"
                  fillOpacity="0.6"
                />
                <path
                  d="M17.5,1.162L19.802,1.162C20.077,4.194 22.49,6.609 25.518,6.884L25.518,17.117C22.49,17.392 20.077,19.808 19.802,22.841L17.5,22.841L17.5,1.162Z"
                  fill={border}
                />
                <path
                  d="M17.5,2.984L18.301,2.984L18.439,3.366C19.261,5.628 21.054,7.423 23.312,8.245L23.694,8.384L23.694,15.61L23.312,15.75C21.054,16.572 19.261,18.367 18.439,20.629L18.301,21.01L17.5,21.01L17.5,2.984Z"
                  fill={color}
                />
                <path
                  d="M17.5,2.984L18.301,2.984L18.439,3.366C19.261,5.628 21.054,7.423 23.312,8.245L23.694,8.384L23.694,15.61L23.312,15.75C21.054,16.572 19.261,18.367 18.439,20.629L18.301,21.01L17.5,21.01L17.5,19.846C18.444,17.571 20.261,15.752 22.535,14.807L22.535,9.186C20.261,8.243 18.444,6.423 17.5,4.148L17.5,2.984Z"
                  fillOpacity="0.6"
                />
              </g>
            </svg>
            <div className="absolute">
              <svg viewBox="0 0 32 13" width={32} height={13}>
                <text
                  x={16}
                  y="10.4"
                  textAnchor="middle"
                  fontWeight="bold"
                  stroke="hsl(0,0%,0%)"
                  strokeWidth={4}
                >
                  {rank}
                </text>
                <text
                  x={16}
                  y="10.4"
                  textAnchor="middle"
                  fontWeight="bold"
                  fill="hsl(0,0%,100%)"
                >
                  {rank}
                </text>
              </svg>
            </div>
          </div>
        </div>
        <div className="w-[100px]">
          {rankShift && rankCheck !== 0 && (
            <div className="flex items-center">
              {rankCheck >= 0 ? (
                <AiOutlineUp className="text-green-500 mr-2 text-xs" />
              ) : (
                <AiOutlineDown className="text-red-500 mr-2 text-xs" />
              )}
              <span className="text-xs">
                {rankCheck >= 0 ? rankCheck : -rankCheck}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center">
          {position && (
            <div className="mr-3">
              <IconTypeRole role={position} width={15} height={15} />
            </div>
          )}
          {finalTeam && (
            <>
              <div className="w-[9px] h-[9px] mr-2">
                <MyImage
                  src="/ExtendIcon/proplayer.svg"
                  width="9px"
                  height="9px"
                  alt=""
                />
              </div>
              <span className="text-textSecondPrimary-dark">{finalTeam}.</span>
            </>
          )}
          <span>{finalName}</span>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-5">
          {flagImg && (
            <MyImage src={flagImg} width="25px" height="15px" alt="" />
          )}
        </div>
        <ToolTip
          target={
            <button className="text-lg group p-1 rounded-sm hover:bg-layerStrong-dark">
              <AiOutlineHeart className="" />
            </button>
          }
          tooltip={
            <p className="text-sm px-2 py-1 rounded-md">Follow {finalName}</p>
          }
          id={uniqid()}
        />
      </div>
    </div>
  );
};

const PlayerList = () => {
  const season = useAppSelector((state) => state.playersLeaderboard.season);
  const loading = useAppSelector((state) => state.playersLeaderboard.loading);

  const [immortals, setImmortals] = useState<Season[]>([]);
  const [showImt, setShowImt] = useState<number>(10);
  const [loadMore, setLoadMore] = useState<boolean>(true);
  const handleNext = () => {
    setShowImt(showImt + 20);
  };

  useEffect(() => {
    if (showImt + 100 >= season.length) {
      setLoadMore(false);
      return;
    } else {
      setLoadMore(true);
    }
    setImmortals(
      _.filter(season, (s) => {
        return s.rank > 100 && s.rank - 100 <= showImt;
      })
    );
  }, [season, showImt, loading]);
  if (loading) {
    return (
      <div className="justify-center flex">
        <ClipLoader color="#fff" size={40} />
      </div>
    );
  }
  console.log(season);
  return (
    <div>
      <div className="mb-5">
        <div className="flex items-center justify-start px-4">
          <div className="w-[30px]">
            <RankIcon rank={80} top={true} size={30} />
          </div>
          <h6 className="text-lg text-blue-200 font-bold my-5 ml-2">Top 10</h6>
        </div>
        {season.map((s, idx) => {
          if (s.rank <= 10) return <Row key={idx} s={s} />;
        })}
      </div>
      <div className="mb-5">
        <div className="flex items-center justify-start px-4">
          <div className="w-[30px]">
            <RankIcon rank={80} top={true} size={30} />
          </div>
          <h6 className="text-lg text-yellow-500 font-bold my-5 ml-2">
            Top 100
          </h6>
        </div>
        {season.map((s, idx) => {
          if (s.rank > 10 && s.rank <= 100) return <Row key={idx} s={s} />;
        })}
      </div>
      <div className="mb-5">
        <div className="flex items-center justify-start px-4">
          <div className="w-[30px]">
            <RankIcon rank={80} top={true} size={30} />
          </div>
          <h6 className="text-lg text-textSecondPrimary-dark font-bold my-5 ml-2">
            Ranked Immortals
          </h6>
        </div>
        <InfiniteScroll
          dataLength={immortals.length}
          next={handleNext}
          hasMore={loadMore}
          loader={<h4>Loading...</h4>}
          scrollableTarget="main"
        >
          {immortals.map((s, idx) => {
            if (s.rank > 100) return <Row key={idx} s={s} />;
          })}
        </InfiniteScroll>
        {/* {season.map((s, idx) => {
          if (s.rank > 100) return <Row key={idx} s={s} />;
        })} */}
      </div>
    </div>
  );
};

export default PlayerList;
