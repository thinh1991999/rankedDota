import React from "react";
import { TeamTotalInfo } from "../../../../interfaces/matches";
import { DIRE_ICON, nFormatter, RADIANT_ICON } from "../../../../share";
import MyImage from "../../../MyImage";

const Footer = ({
  isRadiant,
  data,
  higherNw,
}: {
  isRadiant: boolean;
  data: TeamTotalInfo;
  higherNw: number;
}) => {
  const lvNw = data.nw / higherNw;
  return (
    <section className="flex py-2">
      <div className="mx-2 w-[16px]"></div>
      <div className="mx-2 w-[70px]"></div>
      <div className="mx-2 w-[130px] flex justify-end">
        <MyImage
          src={isRadiant ? RADIANT_ICON : DIRE_ICON}
          width="20px"
          height="20px"
          alt="team"
          borderRadius={3}
        />
      </div>
      <div className="mx-2 w-[24px] flex justify-center">
        <span>{data.lv}</span>
      </div>
      <div className="mx-2 w-[88px] flex justify-center">
        <span>{`${data.kills} /  ${data.deaths} /  ${data.assists}`}</span>
      </div>
      <div className="mx-2 flex-1 flex items-center justify-center">
        <span>{nFormatter(data.nw, 1)}</span>
        <div className="ml-3 w-[70px] h-[7px] bg-gray-800 rounded-md relative">
          <div
            className="absolute left-0 top-0 bottom-0 bg-yellow-500 rounded-md"
            style={{
              width: `${lvNw * 70}px`,
            }}
          ></div>
        </div>
      </div>
      <div className="mx-2 flex-1 flex justify-center">
        <span>{data.imp}</span>
      </div>
      <div className="mx-2 w-[80px] flex justify-center">
        <span>{data.lh}</span>
        <span className="mx-2">/</span>
        <span>{data.dn}</span>
      </div>
      <div className="mx-2 w-[90px] flex justify-center">
        <span>{nFormatter(data.gpm, 1)}</span>
        <span className="mx-2">/</span>
        <span>{nFormatter(data.xpm, 1)}</span>
      </div>
      <div className="mx-2 w-[45px] flex justify-center">
        <span>{nFormatter(data.hd, 1)}</span>
      </div>
      <div className="mx-2 w-[45px] flex justify-center">
        <span>{nFormatter(data.td, 1)}</span>
      </div>
      <div className="mx-2 w-[45px] flex justify-center">
        <span>{nFormatter(data.hh, 1)}</span>
      </div>
      <div className="mx-2 w-[140px] flex justify-center"></div>
    </section>
  );
};

export default Footer;
