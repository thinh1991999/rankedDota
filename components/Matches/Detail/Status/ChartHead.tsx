import React, { useState, useEffect } from "react";
import _ from "lodash";
import MyImage from "../../../MyImage";
import { RADIANT_ICON, DIRE_ICON } from "../../../../share/constant";
import { useAppSelector } from "../../../../store/hook";
import { nFormatter } from "../../../../share";

const ChartHead = () => {
  const matchDetail = useAppSelector((state) => state.matchDetail.matchDetail);
  const timeSeek = useAppSelector((state) => state.matchDetail.timeSeek);
  const [nwTotal, setNwTotal] = useState<{
    isRadiant: boolean;
    nw: number;
  }>();
  const [expTotal, setExpTotal] = useState<{
    isRadiant: boolean;
    exp: number;
  }>();

  useEffect(() => {
    if (!matchDetail) return;
    const { radiantExperienceLeads, radiantNetworthLeads } = matchDetail;
    const expLead = radiantExperienceLeads[timeSeek];
    const goldLead = radiantNetworthLeads[timeSeek];
    setNwTotal({
      isRadiant: goldLead >= 0,
      nw: goldLead < 0 ? goldLead * -1 : goldLead || 0,
    });
    setExpTotal({
      isRadiant: expLead >= 0,
      exp: expLead < 0 ? expLead * -1 : expLead || 0,
    });
  }, [matchDetail, timeSeek]);
  return (
    <div className="p-2">
      <div className="flex justify-between">
        <div className="flex items-center">
          <MyImage
            src={RADIANT_ICON}
            width="25px"
            height="25px"
            alt="radiant"
            borderRadius={6}
          />
          <span className="text-green-500 text-xl ml-2">Radiant</span>
          {nwTotal?.isRadiant && nwTotal?.nw !== 0 && (
            <div className="ml-2 flex items-center px-2  border border-solid border-yellow-500 rounded-md">
              <MyImage src="/gold.png" width="15px" height="10px" alt="gold" />
              <span className="ml-1 text-yellow-500">
                +{nFormatter(nwTotal?.nw || 0, 1)}
              </span>
            </div>
          )}
          {expTotal?.isRadiant && expTotal?.exp !== 0 && (
            <div className="ml-2 flex items-center px-2 border border-solid dark:border-white border-black rounded-md">
              <span>+{nFormatter(expTotal?.exp || 0, 1)}</span>
              <span className="text-textSecondPrimary-light dark:text-textSecondPrimary-dark text-sm ml-2">
                XP
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center">
          {!expTotal?.isRadiant && expTotal?.exp !== 0 && (
            <div className="mr-2 flex items-center px-2 border border-solid dark:border-white border-black rounded-md">
              <span>+{nFormatter(expTotal?.exp || 0, 1)}</span>
              <span className="text-textSecondPrimary-light dark:text-textSecondPrimary-dark text-sm ml-2">
                XP
              </span>
            </div>
          )}
          {!nwTotal?.isRadiant && nwTotal?.nw !== 0 && (
            <div className="mr-2 flex items-center px-2  border border-solid border-yellow-500 rounded-md">
              <MyImage src="/gold.png" width="15px" height="10px" alt="gold" />
              <span className="ml-1 text-yellow-500">
                {nFormatter(nwTotal?.nw || 0, 1)}
              </span>
            </div>
          )}
          <span className="text-red-500 text-xl mr-2">Dire</span>
          <MyImage
            src={DIRE_ICON}
            width="25px"
            height="25px"
            alt="dire"
            borderRadius={6}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartHead;
