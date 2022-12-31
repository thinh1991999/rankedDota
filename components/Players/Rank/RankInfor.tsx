import _ from "lodash";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Stratz } from "../../../interfaces/players";
import RankIcon from "../../RankIcon";
import { formatNumber } from "../../../share/ultils";

const RankInfor = ({ stratz }: { stratz: Stratz | null }) => {
  const [totalAcc, setTotalAcc] = useState<number>(0);
  const [totalUR, setTotalUR] = useState<number>(0);
  const [totalR, setTotalR] = useState<number>(0);

  useEffect(() => {
    if (!stratz) return;
    const {
      page: {
        players: { steamAccountByRank },
      },
    } = stratz;
    let countTotalUR = 0;
    let countTotalR = 0;
    _.forEach(steamAccountByRank, (s) => {
      if (s.rank) {
        countTotalR += s.playerCount;
      } else {
        countTotalUR += s.playerCount;
      }
    });
    setTotalAcc(countTotalUR + countTotalR);
    setTotalUR(countTotalUR);
    setTotalR(countTotalR);
  }, [stratz]);
  return (
    <div className="flex flex-wrap -ml-2 -mr-2">
      <div className="lg:w-1/3 md:w-1/2 w-full p-2 ">
        <div className="border border-solid border-borderTender-light dark:border-borderTender-dark bg-layer-light dark:bg-layer-dark rounded-md flex items-center justify-center text-textSecondPrimary-light dark:text-textSecondPrimary-dark py-5">
          <FaUser className="text-4xl" />
          <div className="ml-5 flex flex-col">
            <span className="font-thin text-sm">Total Accounts</span>
            <span className=" font-bold">{formatNumber(totalAcc)}</span>
          </div>
        </div>
      </div>
      <div className="lg:w-1/3 md:w-1/2 w-full p-2 ">
        <div className="border border-solid border-borderTender-light dark:border-borderTender-dark bg-layer-light dark:bg-layer-dark rounded-md flex items-center justify-center text-textSecondPrimary-light dark:text-textSecondPrimary-dark py-5">
          <div className="w-[40px] h-[40px]">
            <RankIcon rank={null} size={40} />
          </div>
          <div className="ml-5 flex flex-col">
            <span className="font-thin text-sm">Uncalibrated</span>
            <span className=" font-bold">{formatNumber(totalUR)}</span>
          </div>
        </div>
      </div>
      <div className="lg:w-1/3 md:w-1/2 w-full p-2 ">
        <div className="border border-solid border-borderTender-light dark:border-borderTender-dark bg-layer-light dark:bg-layer-dark rounded-md flex items-center justify-center text-textSecondPrimary-light dark:text-textSecondPrimary-dark py-5">
          <div className="flex items-center">
            <div className="w-[40px] h-[40px]">
              <RankIcon rank={10} size={40} />
            </div>
            <span className="mx-2">-</span>
            <div className="w-[40px] h-[40px]">
              <RankIcon rank={80} size={40} top={true} />
            </div>
          </div>
          <div className="ml-5 flex flex-col">
            <span className="font-thin text-sm">Calibrated</span>
            <span className=" font-bold">{formatNumber(totalR)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankInfor;
