import React, { ChangeEvent, useCallback, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hook";
import { setTimeSeek } from "../../../store/Slices/matchDetailSlice";
import { getTimeBySeconds } from "../../../share/ultils";

const TimeSeek = () => {
  const dispatch = useAppDispatch();
  const timesLabel = useAppSelector((state) => state.matchDetail.timesLabel);
  const timeSeek = useAppSelector((state) => state.matchDetail.timeSeek);

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTimeSeek(Number(e.target.value)));
  };
  return (
    <section className="fixed bottom-0 left-0 right-0 ">
      <div className="container m-auto h-[50px] bg-black flex items-center justify-center px-5">
        <span>{getTimeBySeconds(timesLabel[timeSeek] * 60)}</span>
        <input
          type="range"
          min={0}
          max={timesLabel.length - 1}
          step={1}
          value={timeSeek}
          className="w-full input-ranger-custom mx-3 "
          onChange={handleSeek}
        />
        <span>{getTimeBySeconds(timesLabel[timesLabel.length - 1] * 60)}</span>
      </div>
    </section>
  );
};

export default TimeSeek;
