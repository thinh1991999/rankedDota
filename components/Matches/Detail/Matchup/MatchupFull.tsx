import _ from "lodash";
import React, { useEffect, useState, memo } from "react";
import {
  BackPack0,
  PlayerMatchDetail,
  PlayerTimeline,
  TeamTotalInfo,
} from "../../../../interfaces/matches";
import {
  getDetaiHero,
  getImgStratsDota,
  getPartyColor,
  nFormatter,
  romanize,
} from "../../../../share";
import { useAppSelector } from "../../../../store";
import IconTypeRole from "../../../IconTypeRole";
import ItemIcon from "../../../ItemIcon";
import MyImage from "../../../MyImage";
import Footer from "./Footer";
import Header from "./Header";

const RowInfo = ({ info }: { info: PlayerTimeline }) => {
  const heroes = useAppSelector((state) => state.globalData.heroes);
  const {
    heroId,
    partyId,
    role,
    lane,
    lv,
    kills,
    deaths,
    assists,
    networth,
    imp,
    numLastHits,
    numDenies,
    goldPerMinute,
    experiencePerMinute,
    heroDamage,
    towerDamage,
    heroHealing,
    inventory: { item0, item1, item2, item3, item4, item5, neutral0 },
    steamAccount: { name },
  } = info;
  const itemsBuild: (BackPack0 | null)[] = [
    item0,
    item1,
    item2,
    item3,
    item4,
    item5,
  ];
  const heroDetail = getDetaiHero(heroes, heroId);
  const imgHero = getImgStratsDota(`/heroes/${heroDetail?.shortName}_horz.png`);
  const lvScore = (lv ? lv : 30 / 30) * 10;
  // const lvNw = networth / maxPlayerNw;
  const partyColor = getPartyColor(partyId);
  return (
    <div
      className={`py-3 flex justify-between items-center  border-solid border-borderTender-dark`}
    >
      <div className="mx-2 w-[16px] flex justify-center">
        <IconTypeRole role={role} lane={lane} />
      </div>
      <div className="w-[70px] mx-2 relative rounded-md overflow-hidden">
        <div className="relative">
          <MyImage
            src={imgHero}
            height="40px"
            width="68px"
            alt={heroDetail?.shortName || ""}
            borderRadius={6}
          />
          {partyId !== null && (
            <>
              <div
                className={`${partyId} w-[20px] h-[15px] absolute top-0 left-1 `}
              >
                <div className="w-full h-full relative">
                  <div className="absolute top-0 left-0 bottom-0 right-0 bg-black opacity-80"></div>
                  <div className="absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center">
                    <span className={`${partyColor.text}`}>
                      {romanize(partyId === 0 ? partyId + 1 : partyId)}
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`${partyColor.bg} absolute top-0 left-0 bottom-0 w-1 `}
              ></div>
            </>
          )}
        </div>
      </div>
      <div className="mx-2 w-[130px] one-line-max">
        <span>{name}</span>
      </div>
      <div className="mx-2 w-[24px] flex justify-center">
        <div className="w-[24px] h-[24px] relative flex justify-center items-center">
          <span className="text-xs relative z-20">{lv}</span>
          {lvScore > 5 ? (
            <div
              className="absolute w-full h-full rounded-full border border-solid border-gray-500"
              style={{
                clip: `rect(0,12px,40px,0)`,
                transform: `rotate(${180 + (180 / 5) * (lvScore - 5)}deg)`,
              }}
            ></div>
          ) : (
            <div
              className="absolute w-full h-full rounded-full z-10  "
              style={{
                clip: `rect(0,12px,40px,0)`,
                transform: `rotate(${0}deg)`,
              }}
            ></div>
          )}
          <div
            className="absolute w-full h-full rounded-full border border-solid border-gray-500"
            style={{
              clip: `rect(0,12px,40px,0)`,
              transform: `${
                lvScore > 5
                  ? `rotate(180deg)`
                  : `rotate(${(180 / 5) * lvScore}deg)`
              }`,
            }}
          ></div>
        </div>
      </div>
      <div className="mx-2 w-[88px] flex justify-center">
        <span>{`${kills} /  ${deaths} /  ${assists}`}</span>
      </div>
      <div className="mx-2 flex-1 flex items-center ">
        <span className="text-end w-[40px]">{nFormatter(networth, 1)}</span>
        {/* <div className="ml-3 w-[70px] h-[7px] bg-gray-800 rounded-md relative">
          <div
            className="absolute left-0 top-0 bottom-0 bg-yellow-500 rounded-md"
            style={{
              width: `${lvNw * 70}px`,
            }}
          ></div>
        </div> */}
      </div>
      <div className="mx-2 flex-1 flex items-center ">
        <span className="text-end w-[20px]">{imp > 0 ? `+${imp}` : imp}</span>
        <div className="ml-3 w-[70px] h-[7px] bg-gray-800 rounded-md relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white -translate-x-1/2"></div>
          {imp >= 0 ? (
            <div
              className={`absolute top-0 left-1/2 bottom-0 bg-purple-500 rounded-tr-md rounded-br-md`}
              style={{
                width: `${(imp / 24) * 35}px`,
              }}
            ></div>
          ) : (
            <div
              className={`absolute top-0 left-0 w-1/2 bottom-0 flex justify-end`}
            >
              <div
                className="h-full bg-gray-600 rounded-tl-md rounded-bl-md"
                style={{
                  width: `${(-imp / 24) * 35}px`,
                }}
              ></div>
            </div>
          )}
        </div>
      </div>
      <div className="mx-2 w-[80px] flex justify-center">
        <span>{numLastHits}</span>
        <span className="mx-2">/</span>
        <span>{numDenies}</span>
      </div>
      <div className="mx-2 w-[90px] flex justify-center">
        <span>{nFormatter(goldPerMinute, 1)}</span>
        <span className="mx-2">/</span>
        <span>{nFormatter(experiencePerMinute, 1)}</span>
      </div>
      <div className="mx-2  w-[45px] flex justify-center">
        <span>{nFormatter(heroDamage, 1)}</span>
      </div>
      <div className="mx-2 w-[45px] flex justify-center">
        <span>{nFormatter(towerDamage, 1)}</span>
      </div>
      <div className="mx-2 w-[45px] flex justify-center">
        <span>{nFormatter(heroHealing, 1)}</span>
      </div>
      <div className="mx-2 w-[140px] flex items-center justify-center">
        <div className="flex flex-wrap w-[90px]">
          {itemsBuild.map((item, idx) => {
            if (!item)
              return (
                <div key={idx} className="p-1 w-[30px] ">
                  <div className="h-[20px] w-full bg-gray-500"></div>
                </div>
              );
            const { itemId } = item;
            return (
              <div key={idx} className="p-1 w-[30px] ">
                <ItemIcon width="100%" height="20px" id={itemId} />
              </div>
            );
          })}
        </div>
        <div className="rounded-full overflow-hidden w-[18px] h-[18px]">
          {neutral0 ? (
            <ItemIcon id={neutral0.itemId} width="18px" height="18px" />
          ) : (
            <div className="h-full w-full bg-gray-500 rounded-full"></div>
          )}
        </div>
      </div>
    </div>
  );
};

const MatchupFull = ({
  currentInfo,
}: {
  currentInfo: {
    radiant: PlayerTimeline[];
    dire: PlayerTimeline[];
  };
}) => {
  const matchDetail = useAppSelector((state) => state.matchDetail.matchDetail);
  const heroes = useAppSelector((state) => state.globalData.heroes);
  // const matchDetail = useAppSelector((state) => state.matchDetail.matchDetail);
  // const timeSeek = useAppSelector((state) => state.matchDetail.timeSeek);

  // const [maxPlayerNw, setMaxPlayerNw] = useState<number>(0);
  // const [radiantInfo, setRadiantInfo] = useState<TeamTotalInfo | null>();
  // const [direInfo, setDireInfo] = useState<TeamTotalInfo | null>();
  // useEffect(() => {
  //   if (!matchDetail) return;
  //   const radiant: TeamTotalInfo = {
  //     lv: 0,
  //     kills: 0,
  //     deaths: 0,
  //     assists: 0,
  //     nw: 0,
  //     imp: 0,
  //     lh: 0,
  //     dn: 0,
  //     gpm: 0,
  //     xpm: 0,
  //     hd: 0,
  //     td: 0,
  //     hh: 0,
  //   };
  //   const dire: TeamTotalInfo = {
  //     lv: 0,
  //     kills: 0,
  //     deaths: 0,
  //     assists: 0,
  //     nw: 0,
  //     imp: 0,
  //     lh: 0,
  //     dn: 0,
  //     gpm: 0,
  //     xpm: 0,
  //     hd: 0,
  //     td: 0,
  //     hh: 0,
  //   };
  //   const { players } = matchDetail;
  //   let maxNw = 0;
  //   _.forEach(players, (player) => {
  //     const {
  //       isRadiant,
  //       imp,
  //       level,
  //       kills,
  //       deaths,
  //       assists,
  //       networth,
  //       numLastHits,
  //       numDenies,
  //       goldPerMinute,
  //       experiencePerMinute,
  //       heroDamage,
  //       towerDamage,
  //       heroHealing,
  //     } = player;
  //     if (isRadiant) {
  //       radiant.lv += level;
  //       radiant.kills += kills;
  //       radiant.deaths += deaths;
  //       radiant.assists += assists;
  //       radiant.nw += networth;
  //       radiant.imp += imp;
  //       radiant.lh += numLastHits;
  //       radiant.dn += numDenies;
  //       radiant.gpm += goldPerMinute;
  //       radiant.xpm += experiencePerMinute;
  //       radiant.hd += heroDamage;
  //       radiant.td += towerDamage;
  //       radiant.hh += heroHealing;
  //     } else {
  //       dire.lv += level;
  //       dire.kills += kills;
  //       dire.deaths += deaths;
  //       dire.assists += assists;
  //       dire.nw += networth;
  //       dire.imp += imp;
  //       dire.lh += numLastHits;
  //       dire.dn += numDenies;
  //       dire.gpm += goldPerMinute;
  //       dire.xpm += experiencePerMinute;
  //       dire.hd += heroDamage;
  //       dire.td += towerDamage;
  //       dire.hh += heroHealing;
  //     }
  //     if (networth > maxNw) maxNw = networth;
  //   });
  //   setMaxPlayerNw(maxNw);
  //   setRadiantInfo(radiant);
  //   setDireInfo(dire);
  // }, [matchDetail]);
  return (
    <section className="xl:overflow-hidden overflow-x-scroll">
      <div className="w-[1208px]">
        <Header />
        {currentInfo.radiant.map((player, idx) => {
          return (
            <div
              className={`${
                idx <= currentInfo.radiant.length - 2
                  ? "border-b border-solid border-borderTender-dark"
                  : ""
              }`}
              key={idx}
            >
              <RowInfo info={player} />
            </div>
          );
        })}
        <div className="my-3 w-full border-b-[3px] border-solid border-borderTender-dark"></div>
        {currentInfo.dire.map((player, idx) => {
          return (
            <div
              className={`${
                idx > 0 ? "border-t border-solid border-borderTender-dark" : ""
              }`}
              key={idx}
            >
              <RowInfo info={player} />
            </div>
          );
        })}
        {/* {radiantInfo && direInfo && (
          <>
            <Footer
              isRadiant={true}
              data={radiantInfo}
              higherNw={
                radiantInfo.nw > direInfo.nw ? radiantInfo.nw : direInfo.nw
              }
            />
            <Footer
              isRadiant={false}
              data={direInfo}
              higherNw={
                radiantInfo.nw > direInfo.nw ? radiantInfo.nw : direInfo.nw
              }
            />
          </>
        )} */}
      </div>
    </section>
  );
};

export default memo(MatchupFull);
