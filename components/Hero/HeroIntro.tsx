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
import { useModal } from "../../share/customHooks";
import Modal from "../Modal";

const HeroIntro = ({ hero }: { hero: Hero }) => {
  const { show, toggle } = useModal();
  const { show: showSkills, toggle: toggleSkills } = useModal();

  const { shortName, displayName, abilities, stats, roles, talents } = hero;
  if (!stats) {
    return <></>;
  }
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
    <>
      <section className=" text-textMain-light dark:text-textMain-dark">
        <div className="container m-auto py-5 flex flex-wrap items-center">
          <div className="flex xl:w-5/12 w-full xl:flex-row flex-col xl:justify-start justify-center items-center">
            <MyImage
              src={getImgStratsDota(`/heroes/${shortName}_vert.png`)}
              width="100px"
              height="100px"
              alt={displayName}
              borderRadius={5}
            />
            <div className="ml-2 flex items-center">
              <h6 className="text-3xl  font-bold">{displayName}</h6>
            </div>
          </div>
          <div className="xl:flex hidden justify-end xl:w-7/12 ">
            <div className="flex items-center w-[calc(100%_-_100px)] overflow-x-auto">
              {abilities.map((abi) => {
                const { abilityId, ability } = abi;
                const { name, uri } = ability;
                if (!uri) return;
                return (
                  <div key={abilityId} className="ml-2">
                    <ToolTip
                      target={
                        <div className=" grayscale-[0.5] hover:grayscale-0">
                          <MyImage
                            src={getImgStratsDota(`/abilities/${name}.png`)}
                            alt={name}
                            width="80px"
                            height="80px"
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
            </div>
            <div className=" ml-2 rounded-[5px]">
              <ToolTip
                target={
                  <div className=" grayscale-[0.5] hover:grayscale-0">
                    <MyImage
                      src="/talent_tree.svg"
                      height="80px"
                      width="80px"
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
        <div className="bg-black/5 py-3 border-t border-b border-solid border-borderTender-dark relative text-textSecondPrimary-light dark:text-textSecondPrimary-dark">
          <div className="container m-auto">
            <div className="xl:flex hidden justify-between">
              <div className="flex items-center text-gray-400">
                <div className="flex items-center">
                  <div className="mr-1">
                    <MyImage
                      src="/meleeIcon.svg"
                      height="20px"
                      width="20px"
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
                      height="20px"
                      width="20px"
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
                          {idx < roles.length - 1
                            ? `${role.roleId},`
                            : role.roleId}
                        </span>
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center ml-5 ">
                  <MyImage
                    src="/str.svg"
                    alt="int"
                    width="20px"
                    height="20px"
                  />
                  <span className=" text-sm ml-1">{strengthBase}</span>
                  <span className="text-gray-500 text-sm">
                    +{getFixIndexHero(strengthGain)}
                  </span>
                </div>
                <div className="flex items-center ml-5 ">
                  <MyImage
                    src="/agi.svg"
                    alt="int"
                    width="20px"
                    height="20px"
                  />
                  <span className=" text-sm ml-1">{agilityBase}</span>
                  <span className="text-gray-500 text-sm">
                    +{getFixIndexHero(agilityGain)}
                  </span>
                </div>
                <div className="flex items-center ml-5 ">
                  <MyImage
                    src="/int.svg"
                    alt="int"
                    width="20px"
                    height="20px"
                  />
                  <span className=" text-sm ml-1">{intelligenceBase}</span>
                  <span className="text-gray-500 text-sm">
                    +{getFixIndexHero(intelligenceGain)}
                  </span>
                </div>
              </div>
            </div>
            <div className="xl:hidden flex justify-center items-center">
              <button
                className="px-4 py-2 rounded-md hover:bg-button-light dark:hover:bg-button-dark capitalize"
                onClick={() => toggle()}
              >
                Show details
              </button>
              <button
                className="px-4 py-2 rounded-md hover:bg-button-light dark:hover:bg-button-dark capitalize"
                onClick={() => toggleSkills()}
              >
                Show skills
              </button>
            </div>
          </div>
        </div>
      </section>
      <Modal show={show} toggle={toggle}>
        <div className="flex flex-col">
          <div className="flex items-center my-3">
            <div className="mr-1">
              <MyImage
                src="/meleeIcon.svg"
                height="20px"
                width="20px"
                alt="melee"
              />
            </div>
            <span>{stats.attackType}</span>
          </div>
          <div className="flex items-center my-3 ">
            <div className="mr-1">
              <MyImage
                src={
                  complexity === 1
                    ? "/compleLow.svg"
                    : complexity === 2
                    ? "/compleModerate.svg"
                    : "/compleHigh.svg"
                }
                height="20px"
                width="20px"
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
          <div className="flex items-center my-3 ">
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
          <div className="flex items-center my-3">
            <MyImage src="/str.svg" alt="int" width="20px" height="20px" />
            <span className=" text-sm ml-1">{strengthBase}</span>
            <span className="text-gray-500 text-sm">
              +{getFixIndexHero(strengthGain)}
            </span>
          </div>
          <div className="flex items-center my-3">
            <MyImage src="/agi.svg" alt="int" width="20px" height="20px" />
            <span className=" text-sm ml-1">{agilityBase}</span>
            <span className="text-gray-500 text-sm">
              +{getFixIndexHero(agilityGain)}
            </span>
          </div>
          <div className="flex items-center my-3">
            <MyImage src="/int.svg" alt="int" width="20px" height="20px" />
            <span className=" text-sm ml-1">{intelligenceBase}</span>
            <span className="text-gray-500 text-sm">
              +{getFixIndexHero(intelligenceGain)}
            </span>
          </div>
        </div>
      </Modal>
      <Modal show={showSkills} toggle={toggleSkills}>
        <div className="flex flex-col">
          <div className="">
            <TalentTree talents={talents} />
          </div>
          {abilities.map((abi) => {
            const { abilityId, ability } = abi;
            const { name, uri } = ability;
            if (!uri) return;
            return (
              <div key={abilityId} className="ml-2">
                <DetailAbility key={abilityId} ability={ability} />
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default HeroIntro;
