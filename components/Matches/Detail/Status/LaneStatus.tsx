import _, { uniqueId } from "lodash";
import React, { useEffect, useState } from "react";
import { BsArrowsAngleContract } from "react-icons/bs";
import { PlayerMatchDetail } from "../../../../interfaces/matches";
import { useAppSelector } from "../../../../store/hook";
import HeroIcon from "../../../HeroIcon";
import { getDetaiHero, getImgStratsDota } from "../../../../share/ultils";
import ToolTip from "../../../ToolTip";
import MyImage from "../../../MyImage";

type LaneType = {
  rads: PlayerMatchDetail[];
  dires: PlayerMatchDetail[];
  status: string;
};

const Lane = ({ info, lane }: { info: LaneType; lane: string }) => {
  const heroes = useAppSelector((state) => state.globalData.heroes);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center rounded-md bg-layer-dark">
      <div className="flex items-center justify-center">
        {info?.rads.map((player, idx) => {
          const {
            heroId,
            steamAccount: { name },
          } = player;
          const detailHero = getDetaiHero(heroes, heroId);
          const heroIcon = getImgStratsDota(
            "/heroes/" + detailHero?.shortName + "_icon.png"
          );
          return (
            <div key={idx} className="mx-2">
              <ToolTip
                target={
                  <div className={`flex justify-center items-center `}>
                    <MyImage
                      src={heroIcon}
                      width={20 + "px"}
                      height={20 + "px"}
                      alt={detailHero?.shortName || ""}
                    />
                  </div>
                }
                tooltip={
                  <div className="px-3 py-2 rounded-sm">
                    <span className="text-green-500">{name}</span>{" "}
                    <span>as {detailHero?.displayName}</span>
                  </div>
                }
                id={uniqueId()}
              />
            </div>
          );
        })}
        <span className="mx-1 text-textSecondPrimary-dark text-xs">vs</span>
        {info?.dires.map((player, idx) => {
          const {
            heroId,
            steamAccount: { name },
          } = player;
          const detailHero = getDetaiHero(heroes, heroId);
          const heroIcon = getImgStratsDota(
            "/heroes/" + detailHero?.shortName + "_icon.png"
          );
          return (
            <div key={idx} className="mx-2">
              <ToolTip
                target={
                  <div className={`flex justify-center items-center `}>
                    <MyImage
                      src={heroIcon}
                      width={20 + "px"}
                      height={20 + "px"}
                      alt={detailHero?.shortName || ""}
                    />
                  </div>
                }
                tooltip={
                  <div className="px-3 py-2 rounded-sm">
                    <span className="text-red-500">{name}</span>{" "}
                    <span>as {detailHero?.displayName}</span>
                  </div>
                }
                id={uniqueId()}
              />
            </div>
          );
        })}
      </div>
      <div
        className={`${
          info?.status === "TIE"
            ? "text-textSecondPrimary-dark"
            : info?.status === "RADIANT_VICTORY"
            ? "text-green-500"
            : "text-red-500"
        } flex items-center justify-center text-sm font-bold mt-3`}
      >
        <span>
          {info?.status === "TIE"
            ? "Draw"
            : info?.status === "RADIANT_VICTORY"
            ? "Radiant Won"
            : "Dire Won"}
        </span>
        <BsArrowsAngleContract className="mx-1 text-sm" />
        <span className="capitalize">{lane}</span>
      </div>
    </div>
  );
};

const LaneStatus = () => {
  const matchDetail = useAppSelector((state) => state.matchDetail.matchDetail);
  const [topLane, setTopLane] = useState<LaneType>();
  const [botLane, setBotLane] = useState<LaneType>();
  const [midLane, setMidLane] = useState<LaneType>();

  useEffect(() => {
    if (!matchDetail) return;
    const { topLaneOutcome, bottomLaneOutcome, midLaneOutcome, players } =
      matchDetail;
    const topRad: PlayerMatchDetail[] = [];
    const topDire: PlayerMatchDetail[] = [];
    const bottomRad: PlayerMatchDetail[] = [];
    const bottomDire: PlayerMatchDetail[] = [];
    const midRad: PlayerMatchDetail[] = [];
    const midDire: PlayerMatchDetail[] = [];
    _.forEach(players, (player) => {
      const { lane, isRadiant } = player;
      if (lane === "SAFE_LANE") {
        isRadiant ? bottomRad.push(player) : bottomDire.push(player);
      }
      if (lane === "OFF_LANE") {
        isRadiant ? topRad.push(player) : topDire.push(player);
      }
      if (lane === "MID_LANE") {
        isRadiant ? midRad.push(player) : midDire.push(player);
      }
    });
    setTopLane({
      rads: topRad,
      dires: topDire,
      status: topLaneOutcome ? topLaneOutcome : "TIE",
    });
    setBotLane({
      rads: bottomRad,
      dires: bottomDire,
      status: bottomLaneOutcome ? bottomLaneOutcome : "TIE",
    });
    setMidLane({
      rads: midRad,
      dires: midDire,
      status: midLaneOutcome ? midLaneOutcome : "TIE",
    });
  }, [matchDetail]);

  return (
    <div className="h-full flex flex-col -mt-2 -mb-2">
      <div className="h-1/3 w-full py-2">
        {topLane && <Lane info={topLane} lane="top lane" />}
      </div>
      <div className="h-1/3 w-full py-2">
        {midLane && <Lane info={midLane} lane="mid lane" />}
      </div>
      <div className="h-1/3 w-full py-2">
        {botLane && <Lane info={botLane} lane="bottom lane" />}
      </div>
    </div>
  );
};

export default LaneStatus;
