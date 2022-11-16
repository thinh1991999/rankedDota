import React from "react";
import { playersNavs } from "../../share";
import MyImage from "../MyImage";
import SubNav from "../SubNav";

const SubHeader = () => {
  return (
    <>
      <SubNav navs={playersNavs} />
      <div className="border-b  border-borderTender-dark">
        <div className="container flex items-center justify-start py-5 ">
          <div className="p-5 bg-layer-dark rounded-md">
            <MyImage
              src="/HeaderNav/playersSub.svg"
              height="50px"
              width="50px"
              alt="hero"
            />
          </div>
          <h5 className="text-2xl font-bold ml-2">Players</h5>
        </div>
      </div>
    </>
  );
};

export default SubHeader;
