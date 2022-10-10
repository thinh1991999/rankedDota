import _ from "lodash";
import React, { useState, useEffect } from "react";
import { AiOutlineUngroup, AiOutlineUnorderedList } from "react-icons/ai";
import { PlayerTimeline } from "../../../../interfaces/matches";
import { useAppSelector } from "../../../../store";
import MatchupFull from "./MatchupFull";
import MatchupSort from "./MatchupSort";
import { items } from "../../../../share/data";

const Matchup = () => {
  const matchDetail = useAppSelector((state) => state.matchDetail.matchDetail);
  const timeSeek = useAppSelector((state) => state.matchDetail.timeSeek);
  const timesLabel = useAppSelector((state) => state.matchDetail.timesLabel);
  const [curr, setCurr] = useState<number>(0);
  const [currentInfo, setCurrentInfo] = useState<{
    radiant: PlayerTimeline[];
    dire: PlayerTimeline[];
  } | null>(null);

  useEffect(() => {
    if (!matchDetail) return;
    const { players } = matchDetail;
    const secondSeek = timesLabel[timeSeek] * 60;
    const rangerLv = timesLabel.length - 1;
    const resultRadiant = new Array<PlayerTimeline>(5);
    const resultDire = new Array<PlayerTimeline>(5);
    _.forEach(players, (player) => {
      const {
        heroId,
        partyId,
        level,
        isRadiant,
        role,
        kills,
        deaths,
        assists,
        lane,
        networth,
        imp,
        numLastHits,
        numDenies,
        goldPerMinute,
        experiencePerMinute,
        heroDamage,
        towerDamage,
        heroHealing,
        stats,
        steamAccount,
      } = player;
      let infoPlayer = {
        heroId,
        partyId,
        lv: level,
        role,
        lane,
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
        inventory: stats.inventoryReport[timeSeek + 1],
        steamAccount,
      };
      if (timeSeek !== rangerLv) {
        const {
          level: lvArr,
          killEvents,
          deathEvents,
          assistEvents,
          networthPerMinute,
          impPerMinute2,
          lastHitsPerMinute,
          deniesPerMinute,
          goldPerMinute,
          experiencePerMinute,
          heroDamagePerMinute,
          towerDamagePerMinute,
          healPerMinute,
        } = stats;
        let countLv = 1;
        let countKills = 0;
        let countDeaths = 0;
        let countAssists = 0;
        let countLh = 0;
        let countDn = 0;
        let countExp = 0;
        let countHD = 0;
        let countTD = 0;
        let countHL = 0;
        _.forEach(lvArr, (lv) => {
          if (lv <= secondSeek && lv > 0) countLv++;
        });
        _.forEach(killEvents, (kill) => {
          if (kill.time <= secondSeek) countKills++;
        });
        _.forEach(deathEvents, (death) => {
          if (death.time <= secondSeek) countDeaths++;
        });
        _.forEach(assistEvents, (assist) => {
          if (assist.time <= secondSeek) countAssists++;
        });
        _.forEach(lastHitsPerMinute, (value, idx) => {
          if (idx < timeSeek) countLh += value;
        });
        _.forEach(deniesPerMinute, (value, idx) => {
          if (idx < timeSeek) countDn += value;
        });
        _.forEach(experiencePerMinute, (value, idx) => {
          if (idx < timeSeek) countExp += value;
        });
        _.forEach(heroDamagePerMinute, (value, idx) => {
          if (idx < timeSeek) countHD += value;
        });
        _.forEach(towerDamagePerMinute, (value, idx) => {
          if (idx < timeSeek) countTD += value;
        });
        _.forEach(healPerMinute, (value, idx) => {
          if (idx < timeSeek) countHL += value;
        });
        infoPlayer.lv = countLv;
        infoPlayer.kills = countKills;
        infoPlayer.deaths = countDeaths;
        infoPlayer.assists = countAssists;
        infoPlayer.networth = networthPerMinute[timeSeek - 1];
        infoPlayer.imp = impPerMinute2[timeSeek - 1];
        infoPlayer.numLastHits = countLh;
        infoPlayer.numDenies = countDn;
        infoPlayer.goldPerMinute = goldPerMinute[timeSeek - 1];
        infoPlayer.experiencePerMinute = Math.round(countExp / timeSeek);
        infoPlayer.heroDamage = countHD;
        infoPlayer.towerDamage = countTD;
        infoPlayer.heroHealing = countHL;
      }
      if (isRadiant) {
        switch (role) {
          case "CORE":
            if (lane === "SAFE_LANE") {
              resultRadiant[0] = infoPlayer;
            } else if (lane === "MID_LANE") {
              resultRadiant[1] = infoPlayer;
            } else {
              resultRadiant[2] = infoPlayer;
            }
            break;
          case "LIGHT_SUPPORT": {
            resultRadiant[3] = infoPlayer;
            break;
          }
          case "HARD_SUPPORT": {
            resultRadiant[4] = infoPlayer;
            break;
          }
          default:
            break;
        }
      } else {
        switch (role) {
          case "CORE":
            if (lane === "SAFE_LANE") {
              resultDire[0] = infoPlayer;
            } else if (lane === "MID_LANE") {
              resultDire[1] = infoPlayer;
            } else {
              resultDire[2] = infoPlayer;
            }
            break;
          case "LIGHT_SUPPORT": {
            resultDire[3] = infoPlayer;
            break;
          }
          case "HARD_SUPPORT": {
            resultDire[4] = infoPlayer;
            break;
          }
          default:
            break;
        }
      }
      // result.push()
      // console.log(level.filter((lv) => lv === secondSeek));
    });
    const finalResult = {
      radiant: resultRadiant,
      dire: resultDire,
    };
    setCurrentInfo(finalResult);
  }, [matchDetail, timeSeek, timesLabel]);
  return (
    <section className=" bg-layer-dark rounded-md text-sm">
      <div className="py-4 px-3 flex justify-between items-center">
        <h6 className="text-xl font-bold">Matchup</h6>
        <ul className="flex text-white  bg-layerStrong-dark rounded-full">
          <li
            onClick={() => setCurr(0)}
            className={`${
              curr !== 0 ? "opacity-20" : ""
            } px-3 py-2 border rounded-tl-full rounded-bl-full border-solid  border-borderTender-dark cursor-pointer hover:opacity-100`}
          >
            <AiOutlineUnorderedList />
          </li>
          <li
            onClick={() => setCurr(1)}
            className={`${
              curr !== 1 ? "opacity-20" : ""
            } px-3 py-2 border rounded-tr-full rounded-br-full border-solid border-borderTender-dark cursor-pointer hover:opacity-100`}
          >
            <AiOutlineUngroup />
          </li>
        </ul>
      </div>
      <div className={`${curr === 0 ? "block" : "hidden"}`}>
        {currentInfo && <MatchupFull currentInfo={currentInfo} />}
      </div>
      <div className={`${curr === 1 ? "block" : "hidden"}`}>
        {currentInfo && <MatchupSort currentInfo={currentInfo} />}
      </div>
    </section>
  );
};

export default Matchup;
