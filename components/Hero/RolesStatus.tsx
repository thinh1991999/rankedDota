import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Against, Position, RoleStatus } from "../../interfaces/heroes";
import {
  getTypeOfHero,
  getDetaiHero,
  getImgStratsDota,
} from "../../share/ultils";
import ToolTip from "../ToolTip";
import { useAppSelector } from "../../store/hook";
import MyImage from "../MyImage";
import HeroIcon from "../HeroIcon";

type Roles = {
  type: string;
  wr: string | number;
  pr: string | number;
  stompWinLane: string;
  winLane: string;
  drawLane: string;
  lossLane: string;
  stompLossLane: string;
  partners: Against[];
  against: Against[];
};

const RolesStatus = ({
  data,
  positions,
}: {
  data: {
    pos1: RoleStatus[];
    pos2: RoleStatus[];
    pos3: RoleStatus[];
    pos4: RoleStatus[];
    pos5: RoleStatus[];
  };
  positions: Position[];
}) => {
  const heroes = useAppSelector((state) => state.globalData.heroes);
  const [roles, setRoles] = useState<Roles[]>([]);

  useEffect(() => {
    let totalMatch = 0;
    _.forEach(positions, (pos) => {
      totalMatch += pos.matchCount;
    });
    const getWrPr = (
      key: string
    ): {
      wr: string | number;
      pr: string | number;
    } => {
      const idx = _.findIndex(positions, (pos) => pos.position === key);
      if (idx !== -1) {
        const { matchCount, winCount } = positions[idx];
        return {
          wr: ((winCount * 100) / matchCount).toFixed(1),
          pr: ((matchCount * 100) / totalMatch).toFixed(1),
        };
      }
      return {
        wr: 0,
        pr: 0,
      };
    };
    const getStatus = (
      roleStatus: RoleStatus
    ): {
      stompWinLane: string;
      winLane: string;
      drawLane: string;
      lossLane: string;
      stompLossLane: string;
      partners: Against[];
      against: Against[];
    } => {
      const {
        winCount,
        stompLossCount,
        stompWinCount,
        drawCount,
        lossCount,
        matchCount,
        partners,
        against,
      } = roleStatus;
      const sortAgainst = (arr: Against[], type: "desc" | "asc") => {
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
        stompWinLane: ((stompWinCount * 100) / matchCount).toFixed(),
        winLane: ((winCount * 100) / matchCount).toFixed(),
        drawLane: ((drawCount * 100) / matchCount).toFixed(),
        lossLane: ((lossCount * 100) / matchCount).toFixed(),
        stompLossLane: ((stompLossCount * 100) / matchCount).toFixed(),
        partners: sortAgainst(partners, "desc"),
        against: sortAgainst(against, "asc"),
      };
    };
    const result: Roles[] = [];
    result.push({
      type: "pos1",
      ...getWrPr("POSITION_1"),
      ...getStatus(data.pos1[0]),
    });
    result.push({
      type: "pos2",
      ...getWrPr("POSITION_2"),
      ...getStatus(data.pos2[0]),
    });
    result.push({
      type: "pos3",
      ...getWrPr("POSITION_3"),
      ...getStatus(data.pos3[0]),
    });
    result.push({
      type: "pos4",
      ...getWrPr("POSITION_4"),
      ...getStatus(data.pos4[0]),
    });
    result.push({
      type: "pos5",
      ...getWrPr("POSITION_5"),
      ...getStatus(data.pos5[0]),
    });
    setRoles(result);
  }, [data, positions]);
  return (
    <section>
      <div className="flex -ml-2 -mr-2">
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
            <div className="p-2 w-1/5" key={type}>
              <div className="p-2 bg-layer-dark rounded-md">
                <h6 className="font-bold">{name}</h6>
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
                          Drew lane{" "}
                          <span className="font-bold">{drawLane}%</span> of the
                          time
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
                          Lost lane{" "}
                          <span className="font-bold">{lossLane}%</span> of the
                          time
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
                      const { heroId } = par;
                      return (
                        <div key={heroId} className="w-1/5 ">
                          <HeroIcon id={heroId} />
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
                      const { heroId } = ag;
                      return (
                        <div key={heroId} className="w-1/5 ">
                          <HeroIcon id={heroId} />
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
    </section>
  );
};

export default RolesStatus;
