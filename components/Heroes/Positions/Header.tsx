import React from "react";
import MyImage from "../../MyImage";

const PosHeader = ({
  type = "carry",
  position,
  title,
}: {
  type: string;
  position: string;
  title: string;
}) => {
  return (
    <div className=" h-[80px] relative overflow-hidden  rounded-md border border-solid border-borderTender-dark">
      <div className={`${position} absolute h-[300px] w-[300px]`}>
        <MyImage src="/minimap.png" width="100%" height="100%" alt="" />
      </div>
      <div className="absolute top-0 left-0 bottom-0 right-0 bg-gray-600 blur-xl"></div>
      <div className="h-full w-full flex items-center justify-center relative">
        <div className="p-2 rounded-full bg-layer-dark border border-solid border-borderTender-dark">
          <MyImage
            src={`/HeroType/${type}.svg`}
            width="20px"
            height="20px"
            alt=""
          />
        </div>
        <span className="ml-3 text-xl text-textMain-dark font-bold capitalize">
          {title}
        </span>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div className="flex items-center w-[1240px] -ml-2 -mr-2">
      <div className=" w-1/5 p-2 ">
        <PosHeader type="carry" position="bottom-0 right-0" title="safe lane" />
      </div>
      <div className=" w-1/5 p-2 ">
        <PosHeader
          type="mid"
          position="top-[-100px] right-[-30px]"
          title="mid lane"
        />
      </div>
      <div className=" w-1/5 p-2 ">
        <PosHeader
          type="offlane"
          position="top-[-50px] right-[-80px]"
          title="off lane"
        />
      </div>
      <div className=" w-1/5 p-2 ">
        <PosHeader
          type="sp1"
          position="top-[-30px] right-[-20px]"
          title="soft lane"
        />
      </div>
      <div className=" w-1/5 p-2 ">
        <PosHeader
          type="sp2"
          position="top-[-30px] right-[-100px]"
          title="hard lane"
        />
      </div>
    </div>
  );
};

export default Header;
