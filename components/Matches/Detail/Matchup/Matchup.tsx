import forEach from "lodash/forEach";
import reduce from "lodash/reduce";
import findLast from "lodash/findLast";
import findLastIndex from "lodash/findLastIndex";
import React, { useState, useEffect, useMemo } from "react";
import { AiOutlineUngroup, AiOutlineUnorderedList } from "react-icons/ai";
import { PlayerTimeline } from "../../../../interfaces/matches";
import { sortRolesTeam, useGetTimeCurrentMatchDetail } from "../../../../share";
import { useAppSelector } from "../../../../store";
import MatchupFull from "./MatchupFull";
import MatchupSort from "./MatchupSort";

const Matchup = () => {
  const matchDetail = useAppSelector((state) => state.matchDetail.matchDetail);
  const currTime = useGetTimeCurrentMatchDetail();

  const [curr, setCurr] = useState<number>(0);
  const [totalInfo, setTotalInfo] = useState<
    {
      radiant: PlayerTimeline[];
      dire: PlayerTimeline[];
    }[]
  >([]);

  const currInfo = useMemo(() => {
    const idx = Math.ceil(currTime / 60);
    return totalInfo[idx];
  }, [totalInfo, currTime]);

  useEffect(() => {
    if (!matchDetail) return;
    const { players, durationSeconds } = matchDetail;
    const countStep = Math.ceil(durationSeconds / 60);
    const finalResult = [];
    for (let timeIdx = 0; timeIdx <= countStep; timeIdx++) {
      const currTime = timeIdx * 60;
      const resultRadiant: PlayerTimeline[] = [];
      const resultDire: PlayerTimeline[] = [];
      forEach(players, (player, idx) => {
        const {
          heroId,
          partyId,
          level,
          isRadiant,
          position,
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
          lastHitsPerMinute,
          deniesPerMinute,
          goldPerMinute: goldArr,
          experiencePerMinute: expArr,
          heroDamagePerMinute,
          towerDamagePerMinute,
          healPerMinute,
          impPerMinute,
          inventoryReport,
        } = stats;
        const initInven = inventoryReport
          ? inventoryReport[inventoryReport.length - 1]
          : null;
        let infoPlayer: PlayerTimeline = {
          heroId,
          partyId,
          lv: level,
          kills,
          deaths,
          assists,
          role: position,
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
        infoPlayer.lv = findLastIndex(lvArr, (lv) => lv <= currTime) + 1;
        infoPlayer.kills =
          findLastIndex(killEvents, (kill) => kill.time <= currTime) + 1;
        infoPlayer.deaths =
          findLastIndex(deathEvents, (death) => death.time <= currTime) + 1;
        infoPlayer.assists =
          findLastIndex(assistEvents, (assist) => assist.time <= currTime) + 1;
        const nw = networthPerMinute
          ? findLast(
              [...networthPerMinute, networth],
              (nw, idx) => idx <= timeIdx
            )
          : 0;
        infoPlayer.networth = nw !== undefined ? nw : networth;
        const newImp = impPerMinute
          ? findLast([...impPerMinute, imp], (imp, idx) => idx <= timeIdx)
          : 0;
        infoPlayer.imp = newImp !== undefined ? newImp : imp;
        infoPlayer.numLastHits = lastHitsPerMinute
          ? reduce(
              lastHitsPerMinute,
              (prev, curr, idx) => {
                if (timeIdx - 1 === lastHitsPerMinute.length)
                  return numLastHits;
                if (idx <= timeIdx - 1) {
                  return prev + curr;
                } else {
                  return prev;
                }
              },
              0
            )
          : 0;
        infoPlayer.numDenies = deniesPerMinute
          ? reduce(
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
            )
          : 0;
        const newGpm = goldArr
          ? findLast(
              [0, ...goldArr, goldPerMinute],
              (nw, idx) => idx <= timeIdx
            )
          : 0;
        infoPlayer.goldPerMinute =
          newGpm !== undefined ? newGpm : goldPerMinute;
        const newExp = expArr
          ? findLast(
              [0, ...expArr, experiencePerMinute],
              (nw, idx) => idx <= timeIdx
            )
          : 0;
        infoPlayer.experiencePerMinute =
          newExp !== undefined ? newExp : experiencePerMinute;
        isRadiant
          ? resultRadiant.push(infoPlayer)
          : resultDire.push(infoPlayer);
        infoPlayer.heroDamage = reduce(
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
        infoPlayer.towerDamage = reduce(
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
        infoPlayer.heroHealing = reduce(
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
        const newInvent = findLast(
          inventoryReport,
          (nw, idx) => idx <= timeIdx + 1
        );
        infoPlayer.inventory = newInvent ? newInvent : initInven;
      });
      finalResult.push({
        radiant: sortRolesTeam<PlayerTimeline>(resultRadiant),
        dire: sortRolesTeam<PlayerTimeline>(resultDire),
      });
    }
    setTotalInfo(finalResult);
  }, [matchDetail]);

  return (
    <div className=" bg-layer-light dark:bg-layer-dark rounded-md text-sm">
      <div className="py-4 px-3 flex justify-between items-center">
        <h6 className="text-xl font-bold">Matchup</h6>
        <ul className="flex bg-layerStrong-light dark:bg-layerStrong-dark rounded-full">
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
        {currInfo && <MatchupFull currentInfo={currInfo} />}
      </div>
      <div className={`${curr === 1 ? "block" : "hidden"}`}>
        {currInfo && <MatchupSort currentInfo={currInfo} />}
      </div>
    </div>
  );
};

export default Matchup;
