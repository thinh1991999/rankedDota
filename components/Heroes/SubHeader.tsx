import React from "react";
import { heroesNavs } from "../../share";
import MyImage from "../MyImage";
import SubNav from "../SubNav";

const SubHeader = () => {
  return (
    <>
      <SubNav navs={heroesNavs} />
      <div className="border-b  border-borderTender-dark">
        <div className="container flex items-center justify-start py-5 ">
          <div className="p-5 bg-layer-dark rounded-md">
            <MyImage src="/hero.svg" height="50px" width="50px" alt="hero" />
          </div>
          <h5 className="text-2xl font-bold ml-2">Heroes</h5>
        </div>
      </div>
    </>
  );
};

export default SubHeader;
