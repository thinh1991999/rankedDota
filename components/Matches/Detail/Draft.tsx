import _ from "lodash";
import React, { useEffect, useState } from "react";
import uniqid from "uniqid";
import { PickBan } from "../../../interfaces/matches";
import { useAppSelector } from "../../../store";
import HeroIcon from "../../HeroIcon";
import { getDetaiHero, getImgStratsDota } from "../../../share/ultils";
import ToolTip from "../../ToolTip";
import MyImage from "../../MyImage";
type PickPhase = {
  radiant: (PickBan & { name: string })[];
  dire: (PickBan & { name: string })[];
};

const BanRow = ({
  isRadiant,
  bans,
}: {
  isRadiant: boolean;
  bans: ((PickBan & { name: string }) | null)[];
}) => {
  const heroes = useAppSelector((state) => state.globalData.heroes);
  return (
    <div className="flex flex-wrap -ml-2 -mr-2">
      {bans?.map((ban, idx) => {
        if (!ban) {
          return (
            <div key={idx} className="p-2">
              <div className="w-[60px] h-[25px] rounded-md bg-layerStrong-light dark:bg-layerStrong-dark"></div>
            </div>
          );
        }
        const { name, bannedHeroId, wasBannedSuccessfully } = ban;
        const detailHero = bannedHeroId
          ? getDetaiHero(heroes, bannedHeroId)
          : null;
        if (!detailHero) return;
        const { shortName, displayName } = detailHero;
        const heroIcon = getImgStratsDota("/heroes/" + shortName + "_icon.png");
        return (
          <div key={idx} className="p-2">
            <div className="w-[60px] h-[25px] flex justify-center items-center rounded-md bg-layerStrong-light dark:bg-layerStrong-dark">
              {detailHero && (
                <div className="">
                  <ToolTip
                    target={
                      <div className="relative">
                        <div
                          className={` flex justify-center items-center grayscale`}
                        >
                          <MyImage
                            src={heroIcon}
                            width={30 + "px"}
                            height={30 + "px"}
                            alt={shortName}
                          />
                        </div>
                        <div className="absolute w-full h-full baned top-0"></div>
                      </div>
                    }
                    tooltip={
                      <div className="p-2 flex items-center">
                        <p className="text-textSecondPrimary-dark">
                          <span className="text-textMain-dark">
                            {displayName}
                          </span>{" "}
                          ban nominated by{" "}
                          <span
                            className={`${
                              isRadiant ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {name}
                          </span>
                        </p>
                        <p className="ml-1 font-bold">
                          {wasBannedSuccessfully
                            ? "Successful"
                            : "Unsuccessful"}
                        </p>
                      </div>
                    }
                    id={uniqid()}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const PickPhase = ({
  index,
  pickRadiant = [],
  pickDire = [],
}: {
  index: number;
  pickRadiant: (PickBan & {
    name: string;
  })[];
  pickDire: (PickBan & {
    name: string;
  })[];
}) => {
  const heroes = useAppSelector((state) => state.globalData.heroes);
  return (
    <>
      <h6 className="text-sm">Pick phase {index}</h6>
      <div className="flex flex-wrap -ml-2 -mr-2">
        {pickRadiant.map((pick, idx) => {
          const { heroId, name } = pick;
          const detailHero = heroId ? getDetaiHero(heroes, heroId) : null;
          if (!detailHero) return;
          const { shortName, displayName } = detailHero;
          const heroIcon = getImgStratsDota(
            "/heroes/" + shortName + "_icon.png"
          );
          return (
            <div key={idx} className="p-2 ">
              <div className="w-[60px] h-[25px] rounded-md bg-layerStrong-light dark:bg-layerStrong-dark">
                <ToolTip
                  target={
                    <div className={`flex justify-center items-center`}>
                      <MyImage
                        src={heroIcon}
                        width={30 + "px"}
                        height={30 + "px"}
                        alt={shortName}
                      />
                    </div>
                  }
                  tooltip={
                    <div className="p-2">
                      <p className="text-textSecondPrimary-dark">
                        <span className="text-textMain-dark">
                          {displayName}
                        </span>{" "}
                        was picked by{" "}
                        <span className={`text-green-500`}>{name}</span>
                      </p>
                    </div>
                  }
                  id={uniqid()}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap -ml-2 -mr-2">
        {pickDire.map((pick, idx) => {
          const { heroId, name } = pick;
          const detailHero = heroId ? getDetaiHero(heroes, heroId) : null;
          if (!detailHero) return;
          const { shortName, displayName } = detailHero;
          const heroIcon = getImgStratsDota(
            "/heroes/" + shortName + "_icon.png"
          );
          return (
            <div key={idx} className="p-2 ">
              <div className="w-[60px] h-[25px] rounded-md bg-layerStrong-light dark:bg-layerStrong-dark flex items-center justify-center">
                <ToolTip
                  target={
                    <div
                      className={`relative flex justify-center items-center`}
                    >
                      <MyImage
                        src={heroIcon}
                        width={30 + "px"}
                        height={30 + "px"}
                        alt={shortName}
                      />
                    </div>
                  }
                  tooltip={
                    <div className="p-2">
                      <p className="text-textSecondPrimary-dark">
                        <span className="text-textMain-dark">
                          {displayName}
                        </span>{" "}
                        was picked by{" "}
                        <span className={`text-red-500`}>{name}</span>
                      </p>
                    </div>
                  }
                  id={uniqid()}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const Draft = () => {
  const matchDetail = useAppSelector((state) => state.matchDetail.matchDetail);
  const [bans, setBans] = useState<{
    radiant: ((PickBan & { name: string }) | null)[];
    dire: ((PickBan & { name: string }) | null)[];
  }>();
  const [pickPhase, setPickPhase] = useState<PickPhase>();

  useEffect(() => {
    if (!matchDetail) return;
    const { pickBans, players } = matchDetail;
    const radiantBan: ((PickBan & { name: string }) | null)[] = _.times(
      5,
      _.constant(null)
    );
    const direBan: ((PickBan & { name: string }) | null)[] = _.times(
      5,
      _.constant(null)
    );
    const resultPickPhase: PickPhase = {
      radiant: [],
      dire: [],
    };
    _.forEach(pickBans, (pickBan) => {
      const { isRadiant, playerIndex, isPick } = pickBan;
      if (!isPick) {
        isRadiant
          ? (radiantBan[playerIndex] = {
              ...pickBan,
              name: players[playerIndex].steamAccount.name,
            })
          : (direBan[playerIndex - 5] = {
              ...pickBan,
              name: players[playerIndex]?.steamAccount.name || "",
            });
      }
      if (isPick) {
        isRadiant
          ? resultPickPhase.radiant.push({
              ...pickBan,
              name: players[playerIndex].steamAccount.name,
            })
          : resultPickPhase.dire.push({
              ...pickBan,
              name: players[playerIndex].steamAccount.name,
            });
      }
    });
    setBans({
      radiant: radiantBan,
      dire: direBan,
    });
    setPickPhase(resultPickPhase);
  }, [matchDetail]);
  return (
    <section className="p-2 rounded-md bg-layer-light dark:bg-layer-dark">
      <div className="p-2">
        <h5>Draft</h5>
        <div className="flex flex-wrap -ml-2 -mr-2">
          <div className="p-2 lg:w-auto w-full">
            <div className="bg-layerSecondary-light dark:bg-layerSecondary-dark rounded-md p-2">
              <h6 className="text-sm">Player bans</h6>
              {bans?.radiant && <BanRow isRadiant={true} bans={bans.radiant} />}
              {bans?.dire && <BanRow isRadiant={false} bans={bans.dire} />}
            </div>
          </div>
          <div className="p-2 lg:w-auto w-full">
            <div className="bg-layerSecondary-light dark:bg-layerSecondary-dark rounded-md p-2">
              <PickPhase
                index={1}
                pickRadiant={pickPhase ? pickPhase.radiant.slice(0, 2) : []}
                pickDire={pickPhase ? pickPhase.dire.slice(0, 2) : []}
              />
            </div>
          </div>
          <div className="p-2 lg:w-auto w-full">
            <div className="bg-layerSecondary-light dark:bg-layerSecondary-dark rounded-md p-2">
              <PickPhase
                index={2}
                pickRadiant={pickPhase ? pickPhase.radiant.slice(2, 4) : []}
                pickDire={pickPhase ? pickPhase.dire.slice(2, 4) : []}
              />
            </div>
          </div>
          <div className="p-2 lg:w-auto w-full">
            <div className="bg-layerSecondary-light dark:bg-layerSecondary-dark rounded-md p-2">
              <PickPhase
                index={3}
                pickRadiant={pickPhase ? pickPhase.radiant.slice(4, 5) : []}
                pickDire={pickPhase ? pickPhase.dire.slice(4, 5) : []}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Draft;
