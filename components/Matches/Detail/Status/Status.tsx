import React, { useEffect } from "react";

import { useAppSelector } from "../../../../store";
import Map from "./Map";
import ChartHead from "./ChartHead";
import ChartMain from "./ChartMain";
import LaneStatus from "./LaneStatus";

const MapStatus = () => {
  return (
    <section className=" rounded-md flex flex-wrap -ml-2 -mr-2">
      <div className="p-2 w-full xl:w-1/5">
        <div className=" bg-layer-light dark:bg-layer-dark ">
          {/* <Map /> */}
        </div>
      </div>
      <div className="w-full xl:w-3/5 p-2">
        <div className="h-[300px] bg-layer-light dark:bg-layer-dark rounded-md">
          <ChartHead />
          <ChartMain />
        </div>
      </div>
      <div className="p-2 w-full xl:w-1/5">
        <LaneStatus />
      </div>
    </section>
  );
};

export default MapStatus;
