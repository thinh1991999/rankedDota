import React, { useEffect } from "react";
import { getTimeBySeconds } from "../../../../share";
import { useAppSelector } from "../../../../store";
import ItemIcon from "../../../ItemIcon";
import Player from "./Player";

const BuildInfo = () => {
  const matchDetail = useAppSelector((state) => state.matchDetail.matchDetail);

  useEffect(() => {
    if (!matchDetail) return;
  }, [matchDetail]);

  if (!matchDetail) return <></>;
  const { players } = matchDetail;
  return (
    <section className="p-2 rounded-md bg-layer-dark">
      <h5>Builds</h5>
      <div className="flex flex-wrap">
        {players.map((player, idx) => {
          if (idx === 0)
            return (
              <div key={idx} className="w-1/2 p-2 ">
                <Player player={player} />
              </div>
            );
        })}
      </div>
    </section>
  );
};

export default BuildInfo;
