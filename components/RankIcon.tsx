import React, { memo, useEffect, useState } from "react";
import MyImage from "./MyImage";
import { getImgStratsDota } from "../share/ultils";
import ToolTip from "./ToolTip";
import uniqid from "uniqid";

const RankIcon = ({ rank, size = 32 }: { rank: number; size?: number }) => {
  const [medal, setMedal] = useState<string | null>(null);
  const [star, setStar] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<string>("");

  useEffect(() => {
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
    setMedal(getImgStratsDota(`/seasonal_rank/medal_${nb}.png`));
    if (surplus > 0)
      setStar(getImgStratsDota(`/seasonal_rank/star_${surplus}.png`));
  }, [rank]);

  return (
    <ToolTip
      target={
        <svg viewBox="0 0 256 256" width={size} height={size}>
          {medal && <image href={medal} height="100%" width="100%"></image>}
          {star && <image href={star} height="100%" width="100%"></image>}
        </svg>
      }
      tooltip={
        <span className="px-2 py-1 rounded-md block">{tooltip}-tier Match</span>
      }
      id={uniqid()}
    />
  );
};

export default memo(RankIcon);
