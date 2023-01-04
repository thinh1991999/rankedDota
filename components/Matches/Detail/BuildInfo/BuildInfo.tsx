import forEach from "lodash/forEach";
import React, { useEffect, useState } from "react";
import { PlayerMatchDetail } from "../../../../interfaces/matches";
import { DIRE_ICON, RADIANT_ICON } from "../../../../share";
import { useAppSelector } from "../../../../store";
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
    forEach(matchDetail.players, (player) => {
      player.isRadiant ? arrRadi.push(player) : arrDire.push(player);
    });
    console.log(arrRadi);
    setRadiants(sortRolesTeam(arrRadi));
    setDires(sortRolesTeam(arrDire));
  }, [matchDetail]);
  return (
    <section className="p-2 rounded-md bg-layer-light dark:bg-layer-dark">
      <h5>Builds</h5>
      <div className="flex flex-wrap">
        <div className="lg:hidden flex items-center">
          <MyImage
            src={RADIANT_ICON}
            width="15px"
            height="15px"
            alt="radiant"
            borderRadius={2}
          />
          <h3 className="ml-2">Radiant</h3>
        </div>
        <div className="lg:w-[calc(50%_-_16px)] lg:flex lg:flex-col w-full">
          {radiants.map((player, idx) => {
            return (
              <div key={idx} className="lg:py-2 p-2 w-full">
                <Player player={player} />
              </div>
            );
          })}
        </div>
        <div className="lg:flex hidden mx-2  flex-col justify-between">
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
        <div className="lg:hidden flex items-center">
          <MyImage
            src={DIRE_ICON}
            width="15px"
            height="15px"
            alt="dire"
            borderRadius={2}
          />
          <h3 className="ml-2">Dire</h3>
        </div>
        <div className="lg:w-[calc(50%_-_16px)] lg:flex lg:flex-col w-full ">
          {dires.map((player, idx) => {
            return (
              <div key={idx} className="lg:py-2 p-2 w-full">
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
