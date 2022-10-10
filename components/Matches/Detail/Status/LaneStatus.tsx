import React, { useEffect } from "react";
import { useAppSelector } from "../../../../store/hook";

const LaneStatus = () => {
  const matchDetail = useAppSelector((state) => state.matchDetail.matchDetail);

  useEffect(() => {
    console.log(matchDetail);
  }, [matchDetail]);

  return <section>LaneStatus</section>;
};

export default LaneStatus;
