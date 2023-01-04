import forEach from "lodash/forEach";
import sum from "lodash/sum";
import moment from "moment";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { BsCalendar4Week, BsFiles } from "react-icons/bs";
import {
  DIRE_ICON,
  getRankName,
  getTimeBySeconds,
  RADIANT_ICON,
} from "../../../share";
import { useAppSelector } from "../../../store";
import MyImage from "../../MyImage";
import RankIcon from "../../RankIcon";
import { useAppDispatch } from "../../../store/hook";
import { setHeaderImg } from "../../../store/Slices/globalDataSlice";
import { PlayerMatchDetail } from "../../../interfaces/matches";
import { sortRolesTeam, getDetaiHero } from "../../../share/ultils";
import { Hero } from "../../../interfaces/heroes";
import HeroIcon from "../../HeroIcon";
import IconTypeRole from "../../IconTypeRole";
import { useModal } from "../../../share/customHooks";

const Modal = dynamic(() => import("../../Modal"), { ssr: false });

const SubHeader = () => {
  const dispatch = useAppDispatch();
  const matchDetail = useAppSelector((state) => state.matchDetail.matchDetail);
  const heroes = useAppSelector((state) => state.globalData.heroes);

  const { show, toggle } = useModal();
  console.log(show);
  const info = useMemo(() => {
    if (!matchDetail) return;
    const { didRadiantWin, players } = matchDetail;

    const radiant: (PlayerMatchDetail & { hero: Hero })[] = [];
    const dire: (PlayerMatchDetail & { hero: Hero })[] = [];
    forEach(players, (pl) => {
      const { heroId, isRadiant } = pl;
      const heroDetail = getDetaiHero(heroes, heroId);
      if (!heroDetail) return;
      isRadiant
        ? radiant.push({ ...pl, hero: heroDetail })
        : dire.push({ ...pl, hero: heroDetail });
    });
    return {
      radiant: sortRolesTeam(radiant),
      dire: sortRolesTeam(dire),
    };
  }, [matchDetail, heroes]);

  useEffect(() => {
    if (matchDetail?.didRadiantWin) {
      dispatch(setHeaderImg(RADIANT_ICON));
    } else {
      dispatch(setHeaderImg(DIRE_ICON));
    }
  }, [matchDetail, dispatch]);
  if (!matchDetail) return <></>;
  const {
    didRadiantWin,
    durationSeconds,
    gameMode,
    id,
    lobbyType,
    rank,
    endDateTime,
    direKills,
    radiantKills,
    players,
  } = matchDetail;
  return (
    <>
      <div className="border-b  border-borderTender-dark">
        <div className="relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bottom-0 blur-[160px]">
            <MyImage
              src={didRadiantWin ? RADIANT_ICON : DIRE_ICON}
              width="100%"
              height="100%"
              alt="banner"
            />
          </div>
          {/* <div className="bg-black/10 border-t border-b border-solid border-borderTender-dark relative text-textSecondPrimary-dark">
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
      </div> */}
          <div className="border-t border-b border-solid border-borderTender-dark py-5 relative">
            <div className="hidden lg:flex justify-between items-center  container m-auto">
              <div
                className={`${
                  !didRadiantWin ? "grayscale-[0.8]" : ""
                } flex items-center `}
              >
                <div className="p-5 bg-layer-light dark:bg-layer-dark rounded-md">
                  <MyImage
                    src={RADIANT_ICON}
                    width="50px"
                    height="50px"
                    alt="radiant"
                    borderRadius={6}
                  />
                </div>
                <div className="ml-3 ">
                  <h6 className=" text-3xl font-bold">Radiant</h6>
                  <div className="mt-2 px-2 py-1 text-xs font-bold rounded-md bg-green-500 text-black inline-block">
                    <span>{didRadiantWin ? "Won" : "Lost"}</span>
                  </div>
                </div>
              </div>
              <div className="p-2 flex items-center bg-layer-dark rounded-md">
                <div className="rounded-md w-[60px] h-[50px] bg-black text-white flex items-center justify-center">
                  <span className="text-2xl font-bold">
                    {sum(radiantKills)}
                  </span>
                </div>
                <div className="mx-3">
                  <span className="text-textMain-dark font-bold">
                    {getTimeBySeconds(durationSeconds)}
                  </span>
                </div>
                <div className="rounded-md w-[60px] h-[50px] bg-black text-white flex items-center justify-center">
                  <span className="text-2xl font-bold">{sum(direKills)}</span>
                </div>
              </div>
              <div
                className={`${
                  didRadiantWin ? "grayscale-[0.8]" : ""
                } flex items-center `}
              >
                <div className="mr-3">
                  <h6 className=" text-3xl font-bold">Dire</h6>
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
            <div className="lg:hidden flex flex-col justify-center items-center">
              <div className="px-5 py-3 bg-layer-dark rounded-md">
                <div className="flex items-center">
                  {info?.radiant.map((vl, idx) => {
                    const { heroId } = vl;
                    return (
                      <div className="mx-2" key={idx}>
                        <HeroIcon id={heroId} />
                      </div>
                    );
                  })}
                </div>
                <div className=" flex items-center justify-between my-2">
                  <div className="flex-1 flex items-center justify-center">
                    <IconTypeRole
                      width={16}
                      height={16}
                      lane="SAFE_LANE"
                      role="CORE"
                    />
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <IconTypeRole
                      width={16}
                      height={16}
                      lane="MID_LANE"
                      role="CORE"
                    />
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <IconTypeRole
                      width={16}
                      height={16}
                      lane="OFF_LANE"
                      role="CORE"
                    />
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <IconTypeRole
                      width={16}
                      height={16}
                      lane="MID"
                      role="LIGHT_SUPPORT"
                    />
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <IconTypeRole
                      width={16}
                      height={16}
                      lane="MID"
                      role="HARD_SUPPORT"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  {info?.dire.map((vl, idx) => {
                    const { heroId } = vl;
                    return (
                      <div className="mx-2" key={idx}>
                        <HeroIcon id={heroId} />
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>{didRadiantWin ? "Radiant Victory" : "Dire Victory"}</h5>
            </div>
          </div>
          <div className=" bg-black/5 py-3 border-t border-b border-solid border-borderTender-dark relative text-textSecondPrimary-light dark:text-textSecondPrimary-dark">
            <div className="hidden lg:flex items-center justify-between container m-auto">
              <div className="flex items-center">
                <div className="flex items-center mr-5">
                  <AiOutlineMinus />
                  <span className="ml-2 capitalize">
                    {lobbyType.toLocaleLowerCase()} /{" "}
                    {gameMode.toLocaleLowerCase()}
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
            <div className="lg:hidden flex justify-center items-center">
              <button
                className="px-4 py-2 rounded-md hover:bg-button-light dark:hover:bg-button-dark capitalize"
                onClick={() => toggle()}
              >
                Show details
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} toggle={toggle}>
        <div className="text-textSecondPrimary-light dark:text-textSecondPrimary-dark">
          <div className="flex items-center my-4">
            <AiOutlineMinus />
            <span className="ml-2 capitalize">
              {lobbyType.toLocaleLowerCase()} / {gameMode.toLocaleLowerCase()}
            </span>
          </div>
          <div className="flex items-center my-4">
            <BsFiles />
            <span className="ml-2 capitalize">{id}</span>
          </div>
          <div className="flex items-center my-4">
            <div className="w-[20px]">
              <RankIcon rank={rank} size={20} />
            </div>
            <span className="ml-2 capitalize">{getRankName(rank)}</span>
          </div>
          <div className="flex items-center my-4">
            <BsCalendar4Week />
            <span className="ml-2">
              {moment.unix(endDateTime).format("MMM D, YYYY, h:mm A")}
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SubHeader;
