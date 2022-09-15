import React from "react";
import { AbilityDetail, Hero, Talent } from "../../interfaces/heroes";
import { getImgStratsDota } from "../../share";
import MyImage from "../MyImage";
import ToolTip from "../ToolTip";
import { getFixIndexHero } from "../../share/ultils";
import { BsFillTagFill } from "react-icons/bs";
import { useAppSelector } from "../../store";
import TalentTree from "./TalentTree";
import DetailAbility from "./DetailAbility";

const HeroIntro = ({ hero }: { hero: Hero }) => {
  const { shortName, displayName, abilities, stats, roles, talents } = hero;
  const {
    agilityBase,
    agilityGain,
    intelligenceBase,
    intelligenceGain,
    strengthBase,
    strengthGain,
    complexity,
  } = stats;
  return (
    <section className="bg-neutral-light dark:bg-neutral-dark text-textMain-light dark:text-textMain-dark">
      <div className="container m-auto">
        <div className="py-5 flex items-center">
          <div className="flex lg:w-5/12">
            <MyImage
              src={getImgStratsDota(`/heroes/${shortName}_vert.png`)}
              width={100}
              height={100}
              alt={displayName}
              borderRadius={5}
            />
            <div className="ml-2 flex items-center">
              <h6 className="text-3xl  font-bold">{displayName}</h6>
            </div>
          </div>
          <div className="flex justify-end lg:w-7/12">
            {abilities.map((abi) => {
              const { abilityId, ability } = abi;
              const { drawMatchPage, name } = ability;
              if (!drawMatchPage) return;
              return (
                <div key={abilityId} className="ml-2">
                  <ToolTip
                    target={
                      <div className=" grayscale-[0.5] hover:grayscale-0">
                        <MyImage
                          src={getImgStratsDota(`/abilities/${name}.png`)}
                          alt={name}
                          width={80}
                          height={80}
                          borderRadius={5}
                        />
                      </div>
                    }
                    tooltip={
                      <DetailAbility key={abilityId} ability={ability} />
                    }
                    id={String(abilityId)}
                  />
                </div>
              );
            })}
            <div className="bg-gray-50 ml-2 rounded-[5px]">
              <ToolTip
                target={
                  <div className=" grayscale-[0.5] hover:grayscale-0">
                    <MyImage
                      src="/talent_tree.svg"
                      height={80}
                      width={80}
                      alt="talent_tree"
                    />
                  </div>
                }
                tooltip={<TalentTree talents={talents} />}
                id={"talent_tree"}
                place="left"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between py-5">
          <div className="flex items-center text-gray-400">
            <div className="flex items-center">
              <div className="mr-1">
                <MyImage
                  src="/meleeIcon.svg"
                  height={20}
                  width={20}
                  alt="melee"
                />
              </div>
              <span>{stats.attackType}</span>
            </div>
            <div className="flex items-center mx-10">
              <div className="mr-1">
                <MyImage
                  src={
                    complexity === 1
                      ? "/compleLow.svg"
                      : complexity === 2
                      ? "/compleModerate.svg"
                      : "/compleHigh.svg"
                  }
                  height={20}
                  width={20}
                  alt="melee"
                />
              </div>
              <span>
                {complexity === 1
                  ? "Low"
                  : complexity === 2
                  ? "Moderate"
                  : "High"}{" "}
                complexity
              </span>
            </div>
            <div className="flex items-center ">
              <BsFillTagFill className="mr-1" />
              {roles.map((role, idx) => {
                return (
                  <>
                    <span></span>
                    <span
                      key={role.roleId}
                      className="lowercase first-letter:capitalize "
                    >
                      {idx < roles.length - 1 ? `${role.roleId},` : role.roleId}
                    </span>
                  </>
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ml-5 ">
              <MyImage src="/str.svg" alt="int" width={20} height={20} />
              <span className=" text-sm ml-1">{strengthBase}</span>
              <span className="text-gray-500 text-sm">
                +{getFixIndexHero(strengthGain)}
              </span>
            </div>
            <div className="flex items-center ml-5 ">
              <MyImage src="/agi.svg" alt="int" width={20} height={20} />
              <span className=" text-sm ml-1">{agilityBase}</span>
              <span className="text-gray-500 text-sm">
                +{getFixIndexHero(agilityGain)}
              </span>
            </div>
            <div className="flex items-center ml-5 ">
              <MyImage src="/int.svg" alt="int" width={20} height={20} />
              <span className=" text-sm ml-1">{intelligenceBase}</span>
              <span className="text-gray-500 text-sm">
                +{getFixIndexHero(intelligenceGain)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroIntro;
