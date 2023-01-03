import _ from "lodash";
import React, { useEffect, useState } from "react";
import {
  Against,
  HeroStats,
  Position,
  RoleStatus,
} from "../../interfaces/heroes";
import {
  getTypeOfHero,
  getDetaiHero,
  getImgStratsDota,
} from "../../share/ultils";
import ToolTip from "../ToolTip";
import { useAppSelector } from "../../store/hook";
import MyImage from "../MyImage";
import HeroIcon from "../HeroIcon";
import { LaneOutcome } from "../../interfaces/heroes";

type Roles = {
  type: string;
  wr: string | number;
  pr: string | number;
  stompWinLane: string;
  winLane: string;
  drawLane: string;
  lossLane: string;
  stompLossLane: string;
  partners: LaneOutcome[];
  against: LaneOutcome[];
};

const RolesStatus = ({ stats }: { stats: HeroStats }) => {
  const [roles, setRoles] = useState<Roles[]>([]);

  useEffect(() => {
    const {
      position,
      laneOutcomeAgainst_POSITION_1,
      laneOutcomeAgainst_POSITION_2,
      laneOutcomeAgainst_POSITION_3,
      laneOutcomeAgainst_POSITION_4,
      laneOutcomeAgainst_POSITION_5,
      laneOutcomeWith_POSITION_1,
      laneOutcomeWith_POSITION_2,
      laneOutcomeWith_POSITION_3,
      laneOutcomeWith_POSITION_4,
      laneOutcomeWith_POSITION_5,
    } = stats;
    const total = _.reduce(
      position,
      (prev, curr) => {
        return (prev += curr.matchCount);
      },
      0
    );
    const getWrPr = (
      key: string
    ): {
      wr: string | number;
      pr: string | number;
    } => {
      const idx = _.findIndex(position, (pos) => pos.position === key);
      if (idx !== -1) {
        const { matchCount, winCount } = position[idx];
        return {
          wr: ((winCount * 100) / matchCount).toFixed(1),
          pr: ((matchCount * 100) / total).toFixed(1),
        };
      }
      return {
        wr: 0,
        pr: 0,
      };
    };
    const getStatus = (
      againstHeroes: LaneOutcome[],
      withHeroes: LaneOutcome[]
    ) => {
      let stompWin = 0;
      let win = 0;
      let draw = 0;
      let loss = 0;
      let stompLoss = 0;
      let total = 0;
      _.forEach([...againstHeroes, ...withHeroes], (value) => {
        const {
          stompWinCount,
          matchCount,
          winCount,
          drawCount,
          lossCount,
          stompLossCount,
        } = value;
        win += winCount;
        stompWin += stompWinCount;
        draw += drawCount;
        loss += lossCount;
        stompLoss += stompLossCount;
        total += matchCount;
      });
      const sortAgainst = (arr: LaneOutcome[], type: "desc" | "asc") => {
        return _.orderBy(
          arr,
          (item) => {
            const { matchCount, winCount } = item;
            return winCount / matchCount;
          },
          [type]
        );
      };
      return {
        stompWinLane: ((stompWin * 100) / total).toFixed(),
        winLane: ((win * 100) / total).toFixed(),
        drawLane: ((draw * 100) / total).toFixed(),
        lossLane: ((loss * 100) / total).toFixed(),
        stompLossLane: ((stompLoss * 100) / total).toFixed(),
        partners: sortAgainst(againstHeroes, "desc"),
        against: sortAgainst(withHeroes, "asc"),
      };
    };
    const result: Roles[] = [];
    result.push({
      type: "pos1",
      ...getWrPr("POSITION_1"),
      ...getStatus(laneOutcomeAgainst_POSITION_1, laneOutcomeWith_POSITION_1),
    });
    result.push({
      type: "pos2",
      ...getWrPr("POSITION_2"),
      ...getStatus(laneOutcomeAgainst_POSITION_2, laneOutcomeWith_POSITION_2),
    });
    result.push({
      type: "pos3",
      ...getWrPr("POSITION_3"),
      ...getStatus(laneOutcomeAgainst_POSITION_3, laneOutcomeWith_POSITION_3),
    });
    result.push({
      type: "pos4",
      ...getWrPr("POSITION_4"),
      ...getStatus(laneOutcomeAgainst_POSITION_4, laneOutcomeWith_POSITION_4),
    });
    result.push({
      type: "pos5",
      ...getWrPr("POSITION_5"),
      ...getStatus(laneOutcomeAgainst_POSITION_5, laneOutcomeWith_POSITION_5),
    });
    setRoles(result);
  }, [stats]);

  return (
    <div className="flex flex-wrap -ml-2 -mr-2">
      {roles.map((role, idx) => {
        const {
          type,
          wr,
          pr,
          stompWinLane,
          winLane,
          drawLane,
          lossLane,
          stompLossLane,
          partners,
          against,
        } = role;
        const { name, icon } = getTypeOfHero(type);
        return (
          <div className="p-2 xl:px-2 xl:m-0 xl:w-1/5 w-full" key={type}>
            <div className="p-2 bg-layer-light dark:bg-layer-dark rounded-md">
              <div className="flex items-center">
                <MyImage src={icon} width="20px" height="20px" alt={name} />
                <h6 className="font-bold ml-2">{name}</h6>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center my-1">
                  <span className="w-[45px] text-sm">{pr}%</span>
                  <div className="relative bg-gray-600 flex-1 h-[10px] rounded-sm">
                    <div
                      className={`absolute top-0 left-0 bottom-0 bg-blue-600 rounded-sm`}
                      style={{
                        width: `${pr}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center my-1">
                  <span className="w-[45px] text-sm">{wr}%</span>
                  <div className="relative bg-gray-600 flex-1 h-[10px] rounded-sm">
                    <div
                      className={`${
                        Number(wr) >= 50 ? "bg-green-600" : "bg-red-600"
                      } absolute top-0 left-0 bottom-0 rounded-sm`}
                      style={{
                        width: `${wr}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex my-2">
                <div className="w-1/5">
                  <ToolTip
                    target={
                      <div className="flex flex-col items-center text-sm">
                        <span className="text-green-500 font-bold">S</span>
                        <span className="text-xs">{stompWinLane}%</span>
                      </div>
                    }
                    tooltip={
                      <p>
                        Stomped lane{" "}
                        <span className="font-bold">{stompWinLane}%</span> of
                        the time
                      </p>
                    }
                    id={"stompWinLane" + idx}
                  />
                </div>
                <div className="w-1/5">
                  <ToolTip
                    target={
                      <div className="flex flex-col items-center text-sm">
                        <span className="text-green-500 font-bold">W</span>
                        <span className="text-xs">{winLane}%</span>
                      </div>
                    }
                    tooltip={
                      <p>
                        Won lane <span className="font-bold">{winLane}%</span>{" "}
                        of the time
                      </p>
                    }
                    id={"wonLane" + idx}
                  />
                </div>
                <div className="w-1/5">
                  <ToolTip
                    target={
                      <div className="flex flex-col items-center text-sm">
                        <span className="text-yellow-500 font-bold">D</span>
                        <span className="text-xs">{drawLane}%</span>
                      </div>
                    }
                    tooltip={
                      <p>
                        Drew lane <span className="font-bold">{drawLane}%</span>{" "}
                        of the time
                      </p>
                    }
                    id={"drewLane" + idx}
                  />
                </div>
                <div className="w-1/5">
                  <ToolTip
                    target={
                      <div className="flex flex-col items-center text-sm">
                        <span className="text-red-500 font-bold">L</span>
                        <span className="text-xs">{lossLane}%</span>
                      </div>
                    }
                    tooltip={
                      <p>
                        Lost lane <span className="font-bold">{lossLane}%</span>{" "}
                        of the time
                      </p>
                    }
                    id={"lostLane" + idx}
                  />
                </div>
                <div className="w-1/5">
                  <ToolTip
                    target={
                      <div className="flex flex-col items-center text-sm">
                        <span className="text-red-500 font-bold">S</span>
                        <span className="text-xs">{stompLossLane}%</span>
                      </div>
                    }
                    tooltip={
                      <p>
                        Got stomped in lane{" "}
                        <span className="font-bold">{stompLossLane}%</span> of
                        the time
                      </p>
                    }
                    id={"stompLossLane" + idx}
                  />
                </div>
              </div>
              <div className="h-[1px] w-full bg-gray-400"></div>
              <div className="my-2">
                <span className="text-xs text-center mb-2 block">
                  Suggested partners
                </span>
                <div className="flex">
                  {partners.map((par, idx) => {
                    if (idx > 4) return;
                    const { heroId2 } = par;
                    return (
                      <div key={heroId2} className="w-1/5 ">
                        <HeroIcon id={heroId2} />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="h-[1px] w-full bg-gray-400"></div>
              <div className="my-2">
                <span className="text-xs text-center mb-2 block">
                  Strongest against
                </span>
                <div className="flex">
                  {against.map((ag, idx) => {
                    if (idx > 4) return;
                    const { heroId2 } = ag;
                    return (
                      <div key={heroId2} className="w-1/5 ">
                        <HeroIcon id={heroId2} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RolesStatus;
