import { kill } from "process";
import React, { useRef } from "react";
import { MatchDetail } from "../../../interfaces/matches";
import {
  getDetaiHero,
  getImgStratsDota,
  nFormatter,
} from "../../../share/ultils";
import { useAppSelector } from "../../../store/hook";
import MyImage from "../../MyImage";

const Matchup = ({ match }: { match: MatchDetail }) => {
  const heroes = useAppSelector((state) => state.globalData.heroes);
  const titles = useRef<
    {
      name: string;
      size: number;
    }[]
  >([
    {
      name: "Hero",
      size: 0,
    },
    {
      name: "Player",
      size: 0,
    },
    {
      name: "K/ D/ A",
      size: 0,
    },
    {
      name: "NW",
      size: 0,
    },
    {
      name: "LH/DN",
      size: 0,
    },
    {
      name: "GPM/XPM",
      size: 0,
    },
    {
      name: "HD",
      size: 0,
    },
    {
      name: "TD",
      size: 0,
    },
    {
      name: "HH",
      size: 0,
    },
    {
      name: "Inventory",
      size: 0,
    },
  ]).current;
  const { players } = match;

  return (
    <section className="py-2 bg-layer-dark rounded-md">
      {/* <ul className="flex justify-between">
        {titles.map((title, idx) => {
          return (
            <li key={idx}>
              <span>{title.name}</span>
            </li>
          );
        })}
      </ul> */}
      <div className="">
        {players.map((player) => {
          const {
            heroId,
            level,
            kills,
            deaths,
            assists,
            networth,
            numLastHits,
            numDenies,
            goldPerMinute,
            experiencePerMinute,
            heroDamage,
            towerDamage,
            heroHealing,
            steamAccount: { name },
          } = player;
          const heroDetail = getDetaiHero(heroes, heroId);
          const imgHero = getImgStratsDota(
            `/heroes/${heroDetail?.shortName}_horz.png`
          );
          return (
            <div
              key={heroId}
              className="py-3 px-2 flex justify-between items-center"
            >
              <div className="px-2">
                <MyImage
                  src={imgHero}
                  height="40px"
                  width="68px"
                  alt={heroDetail?.shortName || ""}
                  borderRadius={6}
                />
              </div>
              <div className="px-2 w-[150px] one-line-max">
                <span>{name}</span>
              </div>
              <div className="px-2">
                <span>{level}</span>
              </div>
              <div className="px-2 w-[100px]">
                <span>{`${kills} /  ${deaths} /  ${assists}`}</span>
              </div>
              <div className="px-2">
                <span>{nFormatter(networth, 1)}</span>
              </div>
              <div className="px-2">
                <span>{numLastHits}</span>
                <span className="mx-2">/</span>
                <span>{numDenies}</span>
              </div>
              <div className="px-2">
                <span>{nFormatter(goldPerMinute, 1)}</span>
                <span className="mx-2">/</span>
                <span>{nFormatter(experiencePerMinute, 1)}</span>
              </div>
              <div className="px-2">
                <span>{nFormatter(heroDamage, 1)}</span>
              </div>
              <div className="px-2">
                <span>{nFormatter(towerDamage, 1)}</span>
              </div>
              <div className="px-2">
                <span>{nFormatter(heroHealing, 1)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Matchup;
