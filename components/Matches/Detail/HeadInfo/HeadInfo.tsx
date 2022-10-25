import React from "react";
import { AiOutlineDown, AiOutlineMinus } from "react-icons/ai";
import { BsCalendar4Week, BsFiles } from "react-icons/bs";
import moment from "moment";
import _ from "lodash";
import { DIRE_ICON, getTimeBySeconds, RADIANT_ICON } from "../../../../share";
import { useAppSelector } from "../../../../store/hook";
import MyImage from "../../../MyImage";
import RankIcon from "../../../RankIcon";
import { getRankName } from "../../../../share/ultils";
import { mathDetailNav } from "../../../../share/navData";

const HeadInfo = () => {
  const matchDetail = useAppSelector((state) => state.matchDetail.matchDetail);
  if (!matchDetail) return <></>;
  const {
    didRadiantWin,
    durationSeconds,
    gameMode,
    id,
    lobbyType,
    rank,
    endDateTime,
    stats: { direKills, radiantKills },
  } = matchDetail;

  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 bottom-0 blur-[160px]">
        <MyImage
          src={didRadiantWin ? RADIANT_ICON : DIRE_ICON}
          width="100%"
          height="100%"
          alt="banner"
        />
      </div>
      <div className="bg-black/10 border-t border-b border-solid border-borderTender-dark relative text-textSecondPrimary-dark">
        <ul className="flex items-center">
          {mathDetailNav.map((nav, idx) => {
            const { title, childs } = nav;
            return (
              <li
                key={idx}
                className="px-5 py-3 capitalize cursor-pointer hover:text-textMain-dark text-sm flex items-center"
              >
                <span>{title}</span>
                {childs && <AiOutlineDown className="ml-2" />}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="border-t border-b border-solid border-borderTender-dark py-5 relative">
        <div className="flex justify-between items-center  container m-auto">
          <div
            className={`${
              !didRadiantWin ? "grayscale-[0.8]" : ""
            } flex items-center `}
          >
            <div className="p-5 bg-layer-dark rounded-md">
              <MyImage
                src={RADIANT_ICON}
                width="50px"
                height="50px"
                alt="radiant"
                borderRadius={6}
              />
            </div>
            <div className="ml-3 ">
              <h6 className="text-textMain-dark text-3xl font-bold">Radiant</h6>
              <div className="mt-2 px-2 py-1 text-xs font-bold rounded-md bg-green-500 text-black inline-block">
                <span>{didRadiantWin ? "Won" : "Lost"}</span>
              </div>
            </div>
          </div>
          <div className="p-2 flex items-center bg-layer-dark rounded-md">
            <div className="rounded-md w-[60px] h-[50px] bg-black text-white flex items-center justify-center">
              <span className="text-2xl font-bold">{_.sum(radiantKills)}</span>
            </div>
            <div className="mx-3">
              <span className="text-textMain-dark font-bold">
                {getTimeBySeconds(durationSeconds)}
              </span>
            </div>
            <div className="rounded-md w-[60px] h-[50px] bg-black text-white flex items-center justify-center">
              <span className="text-2xl font-bold">{_.sum(direKills)}</span>
            </div>
          </div>
          <div
            className={`${
              didRadiantWin ? "grayscale-[0.8]" : ""
            } flex items-center `}
          >
            <div className="mr-3">
              <h6 className="text-textMain-dark text-3xl font-bold">Dire</h6>
              <div className="mt-2 px-2 py-1 text-xs font-bold rounded-md bg-red-500 text-black inline-block">
                <span>{!didRadiantWin ? "Won" : "Lost"}</span>
              </div>
            </div>
            <div className="p-5 bg-layer-dark rounded-md">
              <MyImage
                src={DIRE_ICON}
                width="50px"
                height="50px"
                alt="dire"
                borderRadius={6}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black/5 py-3 border-t border-b border-solid border-borderTender-dark relative text-textSecondPrimary-dark">
        <div className="flex items-center justify-between container m-auto">
          <div className="flex items-center">
            <div className="flex items-center mr-5">
              <AiOutlineMinus />
              <span className="ml-2 capitalize">
                {lobbyType.toLocaleLowerCase()} / {gameMode.toLocaleLowerCase()}
              </span>
            </div>
            <div className="flex items-center mr-5">
              <BsFiles />
              <span className="ml-2 capitalize">{id}</span>
            </div>
            <div className="flex items-center mr-5">
              <RankIcon rank={rank} />
              <span className="ml-2 capitalize">{getRankName(rank)}</span>
            </div>
          </div>
          <div className="flex items-center">
            <BsCalendar4Week />
            <span className="ml-2">
              {moment.unix(endDateTime).format("MMM D, YYYY, h:mm A")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadInfo;
