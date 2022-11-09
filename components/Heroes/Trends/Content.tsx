import _ from "lodash";
import React, { useState } from "react";
import { useAppSelector } from "../../../store/hook";
import {
  getDetaiHero,
  getImgOpenDota,
  nFormatter,
} from "../../../share/ultils";
import MyImage from "../../MyImage";
import WrChart from "./WrChart";
import PrChart from "./PrChart";
import ToolTip from "../../ToolTip";
import uniqid from "uniqid";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  COLOR_CHART_PINK,
  COLOR_CHART_PINK_BORDER,
} from "../../../share/constant";
import {
  COLOR_CHART_BLUE,
  COLOR_CHART_BLUE_BORDER,
  COLOR_CHART_DIRE_BG,
  COLOR_CHART_DIRE_BORDER,
} from "../../../share";

const Content = () => {
  const searchName = useAppSelector((state) => state.heroesTrends.searchName);
  const dataHandled = useAppSelector((state) => state.heroesTrends.dataHandled);
  const heroes = useAppSelector((state) => state.globalData.heroes);

  const [activeHero, setActiveHero] = useState<number | null>(null);

  const handleActiveHero = (id: number) => {
    if (id === activeHero) {
      setActiveHero(null);
    } else {
      setActiveHero(id);
    }
  };

  return (
    <div>
      {dataHandled.map((data, idx) => {
        const {
          id,
          winRate: { data: wrData },
          pickRate: { data: prData },
          winGameVersion,
          matches,
        } = data;
        const heroDetail = getDetaiHero(heroes, id);
        if (!heroDetail) return;

        const checkShow = !heroDetail.displayName
          .toLocaleLowerCase()
          .includes(searchName.toLocaleLowerCase());
        const img = getImgOpenDota(
          `/apps/dota2/images/dota_react/heroes/${heroDetail.shortName}.png`
        );
        const startWr = wrData[0].wr;
        const currentWr = wrData[wrData.length - 1].wr;
        const diffWr = currentWr - startWr;
        const startPr = prData[0].pr;
        const currentPr = prData[prData.length - 1].pr;
        const diffPr = currentPr - startPr;
        const checkActiveHero = id === activeHero;
        return (
          <div
            key={id}
            className={`${
              !checkShow ? "block" : "hidden"
            } border-b border-solid border-borderTenderStrong-dark bg-layer-dark text-textSecondPrimary-dark text-sm`}
          >
            <div
              className={`${
                checkActiveHero
                  ? "bg-layerStrong-dark"
                  : "hover:bg-layerStrong-dark"
              } flex items-center py-2  `}
            >
              <div className="w-[30px] flex justify-center">
                <span className="text-end">{idx + 1}</span>
              </div>
              <div className="w-[85px] flex items-center justify-center">
                <div className="w-[60px] h-[40px]">
                  <ToolTip
                    target={
                      <MyImage
                        src={img}
                        width="60px"
                        height="40px"
                        alt=""
                        borderRadius={6}
                      />
                    }
                    tooltip={
                      <div className="px-2 py-1 rounded-md">
                        <span>{heroDetail.displayName}</span>
                      </div>
                    }
                    id={uniqid()}
                  />
                </div>
              </div>
              <div className="w-[85px] flex justify-center border-l border-solid border-borderTender-dark">
                <span>{startWr.toFixed(1)}%</span>
              </div>
              <div className="w-[150px] flex justify-center">
                <WrChart data={wrData} />
              </div>
              <div className="w-[85px] flex justify-center">
                <span>{currentWr.toFixed(1)}%</span>
              </div>
              <div className="w-[85px] flex justify-center">
                <span
                  className={`${
                    diffWr >= 0 ? "text-blue-500" : "text-red-500"
                  }`}
                >
                  {diffWr.toFixed(1)}%
                </span>
              </div>
              <div className="w-[85px] flex justify-center border-l border-solid border-borderTender-dark">
                <span>{startPr.toFixed(1)}%</span>
              </div>
              <div className="w-[150px] flex justify-center items-center">
                <PrChart data={prData} />
              </div>
              <div className="w-[85px] flex justify-center">
                <span>{currentPr.toFixed(1)}%</span>
              </div>
              <div className="w-[85px] flex justify-center">
                <span
                  className={`${
                    diffPr >= 0 ? "text-blue-500" : "text-red-500"
                  }`}
                >
                  {diffPr.toFixed(1)}%
                </span>
              </div>
              <div className="w-[85px] flex justify-center px-2">
                <span className="text-center border-r border-l border-solid border-borderTender-dark w-full">
                  123
                </span>
              </div>
              <div className="w-[80px] flex justify-center">
                <span>{nFormatter(matches, 1)}</span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <button
                  className="px-3 py-2 rounded-md hover:bg-layer-dark text-lg text-textMain-dark"
                  onClick={() => handleActiveHero(id)}
                >
                  {checkActiveHero ? <AiOutlineMinus /> : <AiOutlinePlus />}
                </button>
              </div>
            </div>
            {checkActiveHero && (
              <div className="">
                <div className="py-4 w-[970px] flex items-center">
                  <div className="w-[130px] flex justify-center"></div>
                  <div className="flex-1">
                    <h6 className="text-center font-bold text-base">
                      Overall Win and Pick Rates by Patch
                    </h6>
                  </div>
                </div>
                {winGameVersion?.map((version) => {
                  const { id, matches, wr, pr } = version;
                  return (
                    <div
                      key={id}
                      className="flex items-center py-4 border-t border-solid border-borderTenderStrong-dark"
                    >
                      <div className="w-[130px] flex justify-center">
                        <span>{id}</span>
                      </div>
                      <div className="w-[420px] flex items-center px-4 border-l border-solid border-borderTender-dark">
                        <span>{wr.toFixed(1)}%</span>
                        <div className="flex-1 h-[10px] pl-4">
                          <div className="h-full bg-layerStrong-dark rounded-sm relative">
                            <div
                              className={` absolute top-0 left-0 bottom-0 rounded-sm`}
                              style={{
                                width: `${wr}%`,
                                backgroundColor: `${
                                  wr >= 0
                                    ? COLOR_CHART_BLUE_BORDER
                                    : COLOR_CHART_DIRE_BORDER
                                }`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="w-[420px] flex items-center px-4 border-l border-r border-solid border-borderTender-dark">
                        <span>{pr.toFixed(1)}%</span>
                        <div className="flex-1 h-[10px] pl-4">
                          <div className="h-full bg-layerStrong-dark rounded-sm relative">
                            <div
                              className={` absolute top-0 left-0 bottom-0 rounded-sm`}
                              style={{
                                width: `${pr}%`,
                                backgroundColor: COLOR_CHART_PINK_BORDER,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 flex justify-center">
                        <span>{nFormatter(matches, 1)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Content;
