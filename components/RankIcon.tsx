import React, { memo, useEffect, useState } from "react";
import { getImgStratsDota } from "../share/ultils";
import uniqid from "uniqid";
import dynamic from "next/dynamic";

const ToolTip = dynamic(() => import("./ToolTip"), {
  ssr: false,
});

const RankIcon = ({
  rank,
  size = 32,
  top = false,
}: {
  rank: number | null;
  size?: number;
  top?: boolean;
}) => {
  const [medal, setMedal] = useState<string | null>(null);
  const [star, setStar] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<string>("");

  useEffect(() => {
    if (rank) {
      const nb = Math.floor(rank / 10);
      const surplus = rank % 10;
      switch (nb) {
        case 8:
          setTooltip("Immortal");
          break;
        case 7:
          setTooltip("Divine");
          break;
        case 6:
          setTooltip("Ancient");
          break;
        case 5:
          setTooltip("Legend");
          break;
        case 4:
          setTooltip("Archon");
          break;
        case 3:
          setTooltip("Crusader");
          break;
        case 2:
          setTooltip("Guardian");
          break;
        case 1:
          setTooltip("Guardian");
          break;
        default:
          break;
      }
      setMedal(
        getImgStratsDota(`/seasonal_rank/medal_${nb}${top ? "c" : ""}.png`)
      );
      if (surplus > 0)
        setStar(getImgStratsDota(`/seasonal_rank/star_${surplus}.png`));
    } else {
      setMedal(getImgStratsDota(`/seasonal_rank/medal_0.png`));
    }
  }, [rank, top]);

  return (
    <ToolTip
      target={
        <svg viewBox="0 0 256 256" width={size} height={size}>
          {medal && <image href={medal} height="100%" width="100%"></image>}
          {star && !top && (
            <image href={star} height="100%" width="100%"></image>
          )}
        </svg>
      }
      tooltip={
        <span className="px-2 py-1 rounded-md block">
          {rank ? `${tooltip}-tier Match` : "Uncalibrated"}
        </span>
      }
      id={uniqid()}
    />
  );
};

export default memo(RankIcon);
