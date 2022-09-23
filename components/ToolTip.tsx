import React, { ReactNode, useState, memo } from "react";
import ReactTooltip from "react-tooltip";
type Place = "top" | "right" | "bottom" | "left";
const ToolTip = ({
  target,
  tooltip,
  id,
  place,
}: {
  target: ReactNode;
  tooltip: ReactNode;
  id: string | number | undefined;
  place?: Place;
}) => {
  const [showToolTip, setShowToolTip] = useState<boolean>(true);

  return (
    <>
      <div
        data-tip
        data-for={String(id)}
        onMouseEnter={() => setShowToolTip(true)}
        onMouseLeave={() => {
          setShowToolTip(false);
          setTimeout(() => {
            setShowToolTip(true);
          }, 500);
        }}
        className="w-full h-full"
      >
        {target}
      </div>
      {showToolTip && (
        <ReactTooltip
          arrowColor="transparent"
          place={place}
          className="ReactTooltip"
          id={String(id)}
        >
          {tooltip}
        </ReactTooltip>
      )}
    </>
  );
};

export default memo(ToolTip);
