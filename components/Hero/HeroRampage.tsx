import React from "react";
import moment from "moment";
import _ from "lodash";
import { Rampage } from "../../interfaces/heroes";
import MyImage from "../MyImage";
import HeroIcon from "../HeroIcon";
import RankIcon from "../RankIcon";
import Link from "next/link";

const HeroRampage = ({ rampages }: { rampages: Rampage[] }) => {
  return (
    <section className="p-2 rounded-md bg-layer-dark">
      <h5>Recent rampages</h5>
      <div className="flex flex-wrap mt-2 -ml-2 -mr-2">
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
            <div key={id} className="w-full xl:w-1/5 p-2 ">
              <Link href="/">
                <a className="block bg-layerStrong-dark opacity-80 hover:opacity-100 rounded-md border border-borderSecondary-dark">
                  <div className="flex items-center justify-between p-2 border-b border-borderSecondary-dark">
                    <div className="flex-1 flex items-center">
                      <MyImage
                        src={avatar}
                        width="50px"
                        height="50px"
                        alt={name}
                        borderRadius={5}
                      />
                      <div className="ml-2">
                        <h6 className="one-line-max">{name}</h6>
                        <span className="text-sm">{time}</span>
                      </div>
                    </div>
                    <div>
                      <RankIcon rank={rank} size={40} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2">
                    {players.map((play) => {
                      const {
                        isRadiant: isRadi,
                        steamAccountId,
                        heroId,
                      } = play;
                      if (isRadi === isRadiant) return null;
                      return <HeroIcon key={heroId} id={heroId} gray={true} />;
                    })}
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HeroRampage;
