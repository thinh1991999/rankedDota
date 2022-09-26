import React from "react";
import { LeaderBoard } from "../../interfaces/heroes";
import MyImage from "../MyImage";
import { getTypeOfHero } from "../../share/ultils";

const LeaderBoards = ({ leaderBoards }: { leaderBoards: LeaderBoard[] }) => {
  return (
    <section className="p-2 rounded-md bg-layer-dark">
      <h5>Top players</h5>
      <div className="">
        {leaderBoards.map((leaderboard, idx) => {
          const {
            impAverage,
            position,
            steamAccount: { id, avatar, name },
          } = leaderboard;
          const typePosition = getTypeOfHero(position);
          const perform = (impAverage * 50) / 25;
          return (
            <div key={id} className="flex items-center h-[53px]">
              <span>{idx + 1}</span>
              <div className="mx-3">
                <MyImage
                  src={avatar}
                  width={40}
                  height={40}
                  alt={name}
                  borderRadius={6}
                />
              </div>
              <h6 className="w-2/5 one-line-max">{name}</h6>
              <div className="">
                <MyImage
                  src={typePosition.icon}
                  width={15}
                  height={15}
                  alt={position}
                />
              </div>
              <span className="text-end w-[40px] block text-sm">
                +{impAverage}
              </span>
              <div className="ml-4 flex-1 h-[10px] rounded-sm bg-layerStrong-dark relative">
                <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-white -translate-x-1/2"></div>
                <div
                  className="absolute top-0 bottom-0 left-[calc(50%_+_1px)] rounded-tl-sm rounded-bl-sm bg-purple-500"
                  style={{
                    width: `${perform.toFixed()}%`,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LeaderBoards;
