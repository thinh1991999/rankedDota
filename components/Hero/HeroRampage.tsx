import React from "react";
import moment from "moment";
import _ from "lodash";
import { Rampage } from "../../interfaces/heroes";
import MyImage from "../MyImage";
import HeroIcon from "../HeroIcon";

const HeroRampage = ({ rampages }: { rampages: Rampage[] }) => {
  return (
    <section className="p-2 rounded-md bg-layer-dark">
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
              <div className="bg-layerStrong-dark rounded-md border border-borderSecondary-dark">
                <div className="flex p-2 border-b border-borderSecondary-dark">
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
                    return <HeroIcon key={heroId} id={heroId} gray={true} />;
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
