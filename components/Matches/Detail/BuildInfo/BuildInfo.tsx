import _ from "lodash";
import React, { useEffect, useState } from "react";
import { PlayerMatchDetail } from "../../../../interfaces/matches";
import { getTimeBySeconds } from "../../../../share";
import { useAppSelector } from "../../../../store";
import ItemIcon from "../../../ItemIcon";
import Player from "./Player";
import { sortRolesTeam } from "../../../../share/ultils";
import MyImage from "../../../MyImage";
import IconTypeRole from "../../../IconTypeRole";

const BuildInfo = () => {
  const matchDetail = useAppSelector((state) => state.matchDetail.matchDetail);

  const [radiants, setRadiants] = useState<PlayerMatchDetail[]>([]);
  const [dires, setDires] = useState<PlayerMatchDetail[]>([]);

  useEffect(() => {
    if (!matchDetail) return;
    const arrRadi: PlayerMatchDetail[] = [];
    const arrDire: PlayerMatchDetail[] = [];
    _.forEach(matchDetail.players, (player) => {
      player.isRadiant ? arrRadi.push(player) : arrDire.push(player);
    });
    setRadiants(sortRolesTeam(arrRadi));
    setDires(sortRolesTeam(arrDire));
  }, [matchDetail]);

  return (
    <section className="p-2 rounded-md bg-layer-dark">
      <h5>Builds</h5>
      <div className="flex ">
        <div className="w-[calc(50%_-_16px)] flex flex-col ">
          {radiants.map((player, idx) => {
            return (
              <div key={idx} className="py-2">
                <Player player={player} />
              </div>
            );
          })}
        </div>
        <div className="mx-2 flex flex-col justify-between">
          <div className="flex-1 flex items-center ">
            <IconTypeRole
              width={16}
              height={16}
              lane="SAFE_LANE"
              role="CORE"
              gray={true}
            />
          </div>
          <div className="flex-1 flex items-center ">
            <IconTypeRole
              width={16}
              height={16}
              lane="MID_LANE"
              role="CORE"
              gray={true}
            />
          </div>
          <div className="flex-1 flex items-center ">
            <IconTypeRole
              width={16}
              height={16}
              lane="OFF_LANE"
              role="CORE"
              gray={true}
            />
          </div>
          <div className="flex-1 flex items-center ">
            <IconTypeRole
              width={16}
              height={16}
              lane="MID"
              role="LIGHT_SUPPORT"
              gray={true}
            />
          </div>
          <div className="flex-1 flex items-center ">
            <IconTypeRole
              width={16}
              height={16}
              lane="MID"
              role="HARD_SUPPORT"
              gray={true}
            />
          </div>
        </div>
        <div className="w-[calc(50%_-_16px)] flex flex-col ">
          {dires.map((player, idx) => {
            return (
              <div key={idx} className="py-2">
                <Player player={player} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BuildInfo;
