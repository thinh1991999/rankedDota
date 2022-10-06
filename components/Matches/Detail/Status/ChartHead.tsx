import React, { useState, useEffect } from "react";
import _ from "lodash";
import MyImage from "../../../MyImage";
import { RADIANT_ICON, DIRE_ICON } from "../../../../share/constant";
import { useAppSelector } from "../../../../store/hook";
import { formatNetword, nFormatter } from "../../../../share";

const ChartHead = () => {
  const matchDetail = useAppSelector((state) => state.matchDetail.matchDetail);
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
    const {
      players,
      stats: { radiantNetworthLeads, radiantExperienceLeads },
    } = matchDetail;
    let nwRadiant: number = 0;
    let expRadiant: number = 0;
    let nwDire: number = 0;
    let expDire: number = 0;
    _.forEach(players, (player) => {
      const { isRadiant, networth, experiencePerMinute } = player;
      if (isRadiant) {
        nwRadiant += networth;
      } else {
        nwDire += networth;
      }
    });
    const minusNw = nwRadiant - nwDire;
    setNwTotal({
      isRadiant: minusNw > 0 ? true : false,
      nw: nwRadiant > nwDire ? minusNw : -minusNw,
    });
  }, [matchDetail]);

  return (
    <section className="p-2 bg-layer-dark rounded-md">
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
          {nwTotal?.isRadiant && (
            <div className="ml-2 flex items-center px-2  border border-solid border-yellow-500 rounded-md">
              <MyImage src="/gold.png" width="15px" height="10px" alt="gold" />
              <span className="ml-1 text-yellow-500">
                {nFormatter(nwTotal?.nw || 0, 1)}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center">
          {!nwTotal?.isRadiant && (
            <div className="mr-2 flex items-center px-2  border border-solid border-yellow-500 rounded-sm">
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
    </section>
  );
};

export default ChartHead;