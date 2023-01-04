import dynamic from "next/dynamic";
import React from "react";
import ChartHead from "./ChartHead";
import LaneStatus from "./LaneStatus";
import Map from "./Map";

const ChartMain = dynamic(() => import("./ChartMain"), {
  ssr: false,
});

const MapStatus = () => {
  return (
    <section className=" rounded-md flex xl:flex-nowrap flex-wrap -ml-2 -mr-2">
      <div className="w-full p-2 xl:w-[300px] flex justify-center items-center">
        <div className="w-[300px] bg-layer-light dark:bg-layer-dark flex justify-center items-center h-full">
          <Map />
        </div>
      </div>
      <div className="w-full xl:flex-1 p-2">
        <div className="h-[300px] bg-layer-light dark:bg-layer-dark rounded-md">
          <ChartHead />
          <ChartMain />
        </div>
      </div>
      <div className="p-2 w-full xl:w-[200px]">
        <LaneStatus />
      </div>
    </section>
  );
};

export default MapStatus;
