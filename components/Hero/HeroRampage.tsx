import React from "react";
import { Rampage } from "../../interfaces/heroes";
import MyImage from "../MyImage";
import moment from "moment";
import _ from "lodash";
import { getDetaiHero, getImgStratsDota } from "../../share/ultils";
import { useAppSelector } from "../../store/hook";
import ToolTip from "../ToolTip";

const HeroRampage = ({ rampages }: { rampages: Rampage[] }) => {
  const heroes = useAppSelector((state) => state.globalData.heroes);
  return (
    <section>
      <h5>Recent rampages</h5>
      <div className="flex mt-2 -ml-2 -mr-2">
        {rampages.map((ramgage) => {
          const {
            match: { id, rank, endDateTime, players },
            steamAccount: { name, avatar, id: idAccount },
          } = ramgage;
          const { isRadiant } = _.filter(players, (play) => {
            return play.steamAccountId === idAccount;
          })[0];
          const time = moment.unix(endDateTime).format("h:mm A [-] MM[/]DD");
          return (
            <div key={id} className="lg:w-1/4 px-2 ">
              <div className="bg-neutral-dark rounded-md border">
                <div className="flex p-2 border-b">
                  <MyImage
                    src={avatar}
                    width={50}
                    height={50}
                    alt={name}
                    borderRadius={5}
                  />
                  <div className="ml-2">
                    <h6>{name}</h6>
                    <span className="text-sm">{time}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2">
                  {players.map((play) => {
                    const { isRadiant: isRadi, steamAccountId, heroId } = play;
                    if (isRadi === isRadiant) return null;
                    const detailHero = getDetaiHero(heroes, heroId);
                    if (detailHero) {
                      const heroIcon = getImgStratsDota(
                        "/heroes/" + detailHero.shortName + "_icon.png"
                      );
                      return (
                        <ToolTip
                          key={steamAccountId}
                          target={
                            <div className="grayscale">
                              <MyImage
                                src={heroIcon}
                                width={30}
                                height={30}
                                alt={detailHero.shortName}
                              />
                            </div>
                          }
                          tooltip={
                            <span className="px-3 py-2 rounded-sm">
                              {detailHero.displayName}
                            </span>
                          }
                          id={id + detailHero.id}
                        />
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HeroRampage;
