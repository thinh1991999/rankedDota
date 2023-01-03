import _ from "lodash";
import React, { useEffect, useState } from "react";
import { PlayerMatchDetail } from "../../../../interfaces/matches";
import { DIRE_ICON, RADIANT_ICON, sortRolesTeam } from "../../../../share";
import { useAppSelector } from "../../../../store/hook";
import MyImage from "../../../MyImage";
import KillRow from "./KillRow";

const KillBreakdown = () => {
  const matchDetail = useAppSelector((state) => state.matchDetail.matchDetail);

  const [radiants, setRadiants] = useState<PlayerMatchDetail[]>([]);
  const [dires, setDires] = useState<PlayerMatchDetail[]>([]);
  const [enemiesRad, setEnemiesRad] = useState<number[]>([]);
  const [enemiesDire, setEnemiesDire] = useState<number[]>([]);

  useEffect(() => {
    if (!matchDetail) return;
    const { players, durationSeconds } = matchDetail;
    const arrRadi: PlayerMatchDetail[] = [];
    const arrDire: PlayerMatchDetail[] = [];
    const arrEneRad: number[] = [];
    const arrEneDire: number[] = [];
    _.forEach(players, (player) =>
      player.isRadiant
        ? arrEneDire.push(player.heroId)
        : arrEneRad.push(player.heroId)
    );
    _.forEach(players, (player) =>
      player.isRadiant ? arrRadi.push(player) : arrDire.push(player)
    );
    const sortRad = sortRolesTeam(arrRadi);
    const sortDire = sortRolesTeam(arrDire);
    setRadiants(sortRad);
    setDires(sortDire);
    setEnemiesRad(arrEneRad);
    setEnemiesDire(arrEneDire);
  }, [matchDetail]);

  return (
    <section className="p-2 rounded-md bg-layer-light dark:bg-layer-dark">
      <h5>KillBreakdown</h5>
      <div className="flex flex-wrap -ml-2 -mr-2">
        <div className="xl:hidden flex items-center p-2">
          <MyImage
            src={RADIANT_ICON}
            width="15px"
            height="15px"
            alt="radiant"
            borderRadius={2}
          />
          <h3 className="ml-2">Radiant</h3>
        </div>
        <div className="w-full xl:w-1/2 p-2 overflow-x-auto">
          <div className="w-[768px] md:w-full flex flex-wrap -ml-2 -mr-2">
            {radiants.map((player, idx) => {
              return (
                <div key={idx} className="p-2 w-full">
                  <KillRow player={player} enemies={enemiesRad} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="xl:hidden flex items-center p-2">
          <MyImage
            src={DIRE_ICON}
            width="15px"
            height="15px"
            alt="dire"
            borderRadius={2}
          />
          <h3 className="ml-2">Dire</h3>
        </div>
        <div className="w-full xl:w-1/2 p-2 overflow-x-auto">
          <div className="w-[768px] md:w-full flex flex-wrap -ml-2 -mr-2">
            {dires.map((player, idx) => {
              return (
                <div key={idx} className="p-2 w-full">
                  <KillRow player={player} enemies={enemiesDire} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KillBreakdown;
