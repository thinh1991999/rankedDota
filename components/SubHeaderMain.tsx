import React from "react";
import { useAppSelector } from "../store/hook";
import MyImage from "./MyImage";

const SubHeaderMain = () => {
  const img = useAppSelector((state) => state.globalData.headerImg);
  const subHeaderMain = useAppSelector(
    (state) => state.globalData.subHeaderMain
  );
  return (
    <div className="relative pt-[80px] overflow-hidden">
      {img && (
        <div className="absolute top-0 left-0 bottom-0 right-0 blur-[100px]">
          <MyImage src={img} width="100%" height="100%" alt="" />
        </div>
      )}
      <div className="relative">{subHeaderMain ? subHeaderMain : <></>}</div>
    </div>
  );
};

export default SubHeaderMain;
