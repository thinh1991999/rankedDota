import React, { useEffect } from "react";

import { useAppSelector } from "../../../../store";
import Map from "../../../Map";
import ChartHead from "./ChartHead";
import ChartMain from "./ChartMain";
import LaneStatus from "./LaneStatus";

const MapStatus = () => {
  return (
    <section className=" rounded-md flex flex-wrap -ml-2 -mr-2">
      <div className="p-2">
        <div className="w-[300px] bg-layer-dark "></div>
      </div>
      <div className="flex-1 p-2">
        <div className="h-[300px]">
          {/* <ChartHead />
          <ChartMain /> */}
        </div>
      </div>
      <div className="p-2">
        <div className="w-[200px] bg-layer-dark">
          <LaneStatus />
        </div>
      </div>
    </section>
  );
};

export default MapStatus;
