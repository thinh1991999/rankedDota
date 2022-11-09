import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import Content from "./Content";
import Header from "./Header";
import { useAppSelector } from "../../../store/hook";
import MyImage from "../../MyImage";
import { BeatLoader } from "react-spinners";
import { formatFullDayTime } from "../../../share/ultils";

const HeroesData = () => {
  const loading = useAppSelector((state) => state.heroesTrends.loading);
  const errMess = useAppSelector((state) => state.heroesTrends.errMess);
  const dataRange = useAppSelector((state) => state.heroesTrends.dataRange);

  return (
    <div>
      <div className=" rounded-md  my-5 overflow-hidden">
        <div className="p-3 bg-layer-dark  flex items-center">
          <div className="w-[40px]">
            <MyImage
              src="/ExtendIcon/question.svg"
              width="40px"
              height="40px"
              alt=""
            />
          </div>
          <p className="text-base text-textSecondPrimary-dark ml-2">
            Below is a table of all heroes with their win and pick rates charted
            over time. Change the time range, bracket, or positions of heroes
            using the controls above. Click the “+” icon to the right side of
            any row to view stats by patch.
          </p>
        </div>
        <div className=" bg-layerStrong-dark p-3 flex items-center">
          <div className="flex items-center">
            <span className="text-sm text-textSecondPrimary-light">
              Data range :
            </span>
          </div>
          {loading ? (
            <div className="flex items-end">
              <BeatLoader color="#fff" size={5} className="ml-3" />
            </div>
          ) : (
            <span className="text-textMain-dark font-bold ml-3">
              {formatFullDayTime(dataRange.begin)} -{" "}
              {formatFullDayTime(dataRange.end)}
            </span>
          )}
        </div>
      </div>
      {loading ? (
        <></>
      ) : errMess ? (
        <div className="p-2 bg-red-800 rounded-md flex items-center">
          <RiErrorWarningLine className="text-2xl text-red-400 mr-2" />
          <div className="">
            <h6 className="text-textSecondPrimary-dark font-bold">
              Something went wrong!
            </h6>
            <p>{errMess}</p>
          </div>
        </div>
      ) : (
        <div className="lg:overflow-hidden overflow-x-scroll">
          <div className="w-[1240px]">
            <Header />
            <Content />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroesData;
