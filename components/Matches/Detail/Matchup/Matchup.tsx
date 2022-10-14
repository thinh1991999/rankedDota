import _ from "lodash";
import React, { useState, useEffect } from "react";
import { AiOutlineUngroup, AiOutlineUnorderedList } from "react-icons/ai";
import {
  PlayerTimeline,
  PlayerMatchDetail,
} from "../../../../interfaces/matches";
import { sortRolesTeam, useGetTimeCurrentMatchDetail } from "../../../../share";
import { useAppSelector } from "../../../../store";
import MatchupFull from "./MatchupFull";
import MatchupSort from "./MatchupSort";

const Matchup = () => {
  const matchDetail = useAppSelector((state) => state.matchDetail.matchDetail);
  const currTime = useGetTimeCurrentMatchDetail();

  const [curr, setCurr] = useState<number>(0);
  const [currentInfo, setCurrentInfo] = useState<{
    radiant: PlayerTimeline[];
    dire: PlayerTimeline[];
  } | null>(null);

  useEffect(() => {
    if (!matchDetail) return;
    const { players } = matchDetail;
    const timeIdx = Math.ceil(currTime / 60);
    const resultRadiant: PlayerTimeline[] = [];
    const resultDire: PlayerTimeline[] = [];
    _.forEach(players, (player, idx) => {
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
      const {
        level: lvArr,
        killEvents,
        deathEvents,
        assistEvents,
        networthPerMinute,
        impPerMinute2,
        lastHitsPerMinute,
        deniesPerMinute,
        goldPerMinute: goldArr,
        experiencePerMinute: expArr,
        heroDamagePerMinute,
        towerDamagePerMinute,
        healPerMinute,
        inventoryReport,
      } = stats;
      const initInven = inventoryReport[inventoryReport.length - 1];
      let infoPlayer: PlayerTimeline = {
        heroId,
        partyId,
        lv: level,
        kills,
        deaths,
        assists,
        role,
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
        inventory: initInven,
        steamAccount,
      };
      infoPlayer.lv = _.findLastIndex(lvArr, (lv) => lv <= currTime) + 1;
      infoPlayer.kills =
        _.findLastIndex(killEvents, (kill) => kill.time <= currTime) + 1;
      infoPlayer.deaths =
        _.findLastIndex(deathEvents, (death) => death.time <= currTime) + 1;
      infoPlayer.assists =
        _.findLastIndex(assistEvents, (assist) => assist.time <= currTime) + 1;
      const nw = _.findLast(
        [...networthPerMinute, networth],
        (nw, idx) => idx <= timeIdx
      );
      infoPlayer.networth = nw !== undefined ? nw : networth;
      const newImp = _.findLast(
        [...impPerMinute2, imp],
        (imp, idx) => idx <= timeIdx
      );
      infoPlayer.imp = newImp !== undefined ? newImp : imp;
      infoPlayer.numLastHits = _.reduce(
        lastHitsPerMinute,
        (prev, curr, idx) => {
          if (timeIdx - 1 === lastHitsPerMinute.length) return numLastHits;
          if (idx <= timeIdx - 1) {
            return prev + curr;
          } else {
            return prev;
          }
        },
        0
      );
      infoPlayer.numDenies = _.reduce(
        deniesPerMinute,
        (prev, curr, idx) => {
          if (timeIdx - 1 === deniesPerMinute.length) return numDenies;
          if (idx <= timeIdx - 1) {
            return prev + curr;
          } else {
            return prev;
          }
        },
        0
      );
      const newGpm = _.findLast(
        [0, ...goldArr, goldPerMinute],
        (nw, idx) => idx <= timeIdx
      );
      infoPlayer.goldPerMinute = newGpm !== undefined ? newGpm : goldPerMinute;
      const newExp = _.findLast(
        [0, ...expArr, experiencePerMinute],
        (nw, idx) => idx <= timeIdx
      );
      infoPlayer.experiencePerMinute =
        newExp !== undefined ? newExp : experiencePerMinute;
      isRadiant ? resultRadiant.push(infoPlayer) : resultDire.push(infoPlayer);
      infoPlayer.heroDamage = _.reduce(
        heroDamagePerMinute,
        (prev, curr, idx) => {
          if (timeIdx - 1 === heroDamagePerMinute.length) return heroDamage;
          if (idx <= timeIdx - 1) {
            return prev + curr;
          } else {
            return prev;
          }
        },
        0
      );
      infoPlayer.towerDamage = _.reduce(
        towerDamagePerMinute,
        (prev, curr, idx) => {
          if (timeIdx - 1 === towerDamagePerMinute.length) return towerDamage;
          if (idx <= timeIdx - 1) {
            return prev + curr;
          } else {
            return prev;
          }
        },
        0
      );
      infoPlayer.heroHealing = _.reduce(
        healPerMinute,
        (prev, curr, idx) => {
          if (timeIdx - 1 === healPerMinute.length) return heroHealing;
          if (idx <= timeIdx - 1) {
            return prev + curr;
          } else {
            return prev;
          }
        },
        0
      );
      const newInvent = _.findLast(
        inventoryReport,
        (nw, idx) => idx <= timeIdx + 1
      );
      infoPlayer.inventory = newInvent ? newInvent : initInven;
    });
    setCurrentInfo({
      radiant: sortRolesTeam(resultRadiant),
      dire: sortRolesTeam(resultDire),
    });
  }, [matchDetail, currTime]);
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
