import _ from "lodash";
import React, { useEffect, useState } from "react";
import { PlayerMatchDetail } from "../../../../interfaces/matches";
import { sortRolesTeam } from "../../../../share";
import { useAppSelector } from "../../../../store/hook";
import KillRow from "./KillRow";

const KillBreakdown = () => {
  const matchDetail = useAppSelector((state) => state.matchDetail.matchDetail);

  const [radiants, setRadiants] = useState<PlayerMatchDetail[]>([]);
  const [dires, setDires] = useState<PlayerMatchDetail[]>([]);
  const [enemiesRad, setEnemiesRad] = useState<number[]>([]);
  const [enemiesDire, setEnemiesDire] = useState<number[]>([]);

  useEffect(() => {
    if (!matchDetail) return;
    const { players } = matchDetail;
    const arrRadi: PlayerMatchDetail[] = [];
    const arrDire: PlayerMatchDetail[] = [];
    const arrEneRad: number[] = [];
    const arrEneDire: number[] = [];
    _.forEach(matchDetail.players, (player) => {
      player.isRadiant ? arrRadi.push(player) : arrDire.push(player);
    });
    const sortRad = sortRolesTeam(arrRadi);
    _.forEach(sortRad, (vl) => {
      arrEneDire.push(vl.heroId);
    });
    const sortDire = sortRolesTeam(arrDire);
    _.forEach(sortDire, (vl) => {
      arrEneRad.push(vl.heroId);
    });
    setRadiants(sortRad);
    setDires(sortDire);
    setEnemiesRad(arrEneRad);
    setEnemiesDire(arrEneDire);
  }, [matchDetail]);
  return (
    <section className="p-2 rounded-md bg-layer-dark">
      <h5>KillBreakdown</h5>
      <div className="flex flex-wrap -ml-2 -mr-2">
        <div className="w-1/2 p-2">
          {radiants.map((player, idx) => {
            return (
              <div key={idx} className="py-2">
                <KillRow player={player} enemies={enemiesRad} />
              </div>
            );
          })}
        </div>
        <div className="w-1/2 p-2">
          {dires.map((player, idx) => {
            return (
              <div key={idx} className="py-2">
                <KillRow player={player} enemies={enemiesDire} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KillBreakdown;
