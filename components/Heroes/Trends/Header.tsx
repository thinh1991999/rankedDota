import React, { useMemo, useCallback } from "react";
import { BsArrowDown, BsArrowDownUp, BsArrowUp } from "react-icons/bs";
import { SortedType } from "../../../interfaces/heroes";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { setSorted } from "../../../store/Slices/heroesTrendsSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const { type, status } = useAppSelector((state) => state.heroesTrends.sorted);

  const checkActive = useCallback(
    (typeCheck: SortedType) => {
      return typeCheck === type ? (
        status ? (
          <BsArrowUp className="text-yellow-500 font-bold" />
        ) : (
          <BsArrowDown className="text-yellow-500 font-bold" />
        )
      ) : (
        <BsArrowDownUp className="opacity-50" />
      );
    },
    [type, status]
  );

  const handleSort = (type: SortedType) => {
    dispatch(setSorted(type));
  };

  return (
    <div className="flex items-center py-3 bg-layerStrong-dark rounded-md text-textSecondPrimary-dark ">
      <div className="w-[30px] flex justify-center"></div>
      <div className="w-[85px] flex justify-center">
        <span>Hero</span>
      </div>
      <div className="w-[85px] flex justify-center">
        <button
          className="flex items-center hover:text-textMain-dark"
          onClick={() => handleSort("START_WR")}
        >
          <span>Start</span>
          <span className="text-xs ml-2">{checkActive("START_WR")}</span>
        </button>
      </div>
      <div className="w-[150px] flex justify-center">
        <span>Win Rate</span>
      </div>
      <div className="w-[85px] flex justify-center">
        <button
          className="flex items-center hover:text-textMain-dark"
          onClick={() => handleSort("CURRENT_WR")}
        >
          <span>Current</span>
          <span className="text-xs ml-2">{checkActive("CURRENT_WR")}</span>
        </button>
      </div>
      <div className="w-[85px] flex justify-center">
        <button
          className="flex items-center hover:text-textMain-dark"
          onClick={() => handleSort("DIFFER_WR")}
        >
          <span>+/-</span>
          <span className="text-xs ml-2">{checkActive("DIFFER_WR")}</span>
        </button>
      </div>
      <div className="w-[85px] flex justify-center">
        <button
          className="flex items-center hover:text-textMain-dark"
          onClick={() => handleSort("START_PR")}
        >
          <span>Start</span>
          <span className="text-xs ml-2">{checkActive("START_PR")}</span>
        </button>
      </div>
      <div className="w-[150px] flex justify-center">
        <span>Pick Rate</span>
      </div>
      <div className="w-[85px] flex justify-center">
        <button
          className="flex items-center hover:text-textMain-dark"
          onClick={() => handleSort("CURRENT_PR")}
        >
          <span>Current</span>
          <span className="text-xs ml-2">{checkActive("CURRENT_PR")}</span>
        </button>
      </div>
      <div className="w-[85px] flex justify-center">
        <button
          className="flex items-center hover:text-textMain-dark"
          onClick={() => handleSort("DIFFER_PR")}
        >
          <span>+/-</span>
          <span className="text-xs ml-2">{checkActive("DIFFER_PR")}</span>
        </button>
      </div>
      <div className="w-[85px] flex justify-center ">
        <span>Rating</span>
      </div>
      <div className="w-[80px]">
        <button
          className="flex items-center hover:text-textMain-dark"
          onClick={() => handleSort("MATCHES")}
        >
          <span>Matches</span>
          <span className="text-xs ml-2">{checkActive("MATCHES")}</span>
        </button>
      </div>
      <div className="flex-1"></div>
    </div>
  );
};

export default Header;
