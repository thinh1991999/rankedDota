import React from "react";
import { useAppSelector } from "../../../store/hook";
import { getImgStratsDota, formatNetword } from "../../../share/ultils";
import MyImage from "../../MyImage";
import moment from "moment";

const Overview = () => {
  const data = useAppSelector((state) => state.lengues.data);
  const lengues = useAppSelector((state) => state.lengues.lengues);
  const live = useAppSelector((state) => state.lengues.live);
  return (
    <div className="container m-auto">
      <div>
        {data?.map((item, idx) => {
          const { data: itemData } = item;
          const { league } = itemData;
          if (league) {
            const { displayName, endDateTime, id, prizePool, startDateTime } =
              league;
            const img = getImgStratsDota("/leagues/" + id + ".png");
            return (
              <div
                key={idx}
                className="my-10 flex items-center justify-between bg-layer-dark text-textSecondPrimary-dark px-2 py-3 rounded-md"
              >
                <div className="flex items-center">
                  <MyImage src={img} width="100px" height="50px" alt="" />
                  <h6 className="ml-4 text-xl font-bold ">{displayName}</h6>
                </div>
                <div className="flex items-center">
                  <span>
                    {moment.unix(startDateTime).format("MMM D")} -{" "}
                    {moment.unix(endDateTime).format("MMM D")}
                  </span>
                  <div className="h-[16px] border-l border-solid border-borderTender-dark mx-2"></div>
                  <span>20 teams</span>
                  <div className="h-[16px] border-l border-solid border-borderTender-dark mx-2"></div>
                  <span className="text-yellow-500">
                    $ {formatNetword(prizePool)}
                  </span>
                </div>
              </div>
            );
          }
          return (
            <div key={idx} className="">
              123
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Overview;
