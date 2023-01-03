import React from "react";
import { TeamHeader, TeamOverview } from "../../interfaces/teamsPage";
import MyImage from "../MyImage";
import { getImgStratsDota } from "../../share/ultils";

const SubHeader = ({ team: teamInfo }: { team: TeamHeader }) => {
  const { id, name } = teamInfo;
  const img = getImgStratsDota("/teams/" + id + ".png");
  return (
    <>
      <div className="border-b  border-borderTender-dark">
        <div className="container flex xl:flex-row flex-col items-center xl:justify-start py-5 ">
          <div className="p-5 bg-layer-dark rounded-md">
            <MyImage src={img} height="50px" width="50px" alt="hero" />
          </div>
          <h5 className="text-2xl font-bold ml-2">{name}</h5>
        </div>
      </div>
    </>
  );
};

export default SubHeader;
