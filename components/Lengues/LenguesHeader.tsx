import React, { useEffect } from "react";
import MyImage from "../MyImage";
import { useAppSelector } from "../../store/hook";
import stratsApiService from "../../services/stratsApi.service";

const LenguesHeader = () => {
  const lengues = useAppSelector((state) => state.lengues.lengues);
  useEffect(() => {
    stratsApiService.getLeaguesOverviewLeagueCard().then((res) => {});
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute top-0 left-0 bottom-0 right-0 blur-[160px] ">
        <MyImage
          src="/Images/leagues_bg.jpg"
          width="100%"
          height="100%"
          alt=""
        />
      </div>
      <div className="container m-auto flex items-center py-5">
        <div className="p-5 rounded-md bg-layer-dark fill-inherit">
          <MyImage
            src="/lengues.svg"
            width="100px"
            height="100px"
            alt="lengues"
          />
        </div>
        <h2 className="ml-2 text-textSecondPrimary-dark">Lengues</h2>
      </div>
    </section>
  );
};

export default LenguesHeader;
