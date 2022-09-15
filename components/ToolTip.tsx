import React, { ReactNode, useState } from "react";
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
  id: string;
  place?: Place;
}) => {
  const [showToolTip, setShowToolTip] = useState<boolean>(true);

  return (
    <>
      <div
        data-tip
        data-for={id}
        onMouseEnter={() => setShowToolTip(true)}
        onMouseLeave={() => {
          setShowToolTip(false);
          setTimeout(() => {
            setShowToolTip(true);
          }, 100);
        }}
      >
        {target}
      </div>
      {showToolTip && (
        <ReactTooltip place={place} className="ReactTooltip" id={id}>
          {tooltip}
        </ReactTooltip>
      )}
    </>
  );
};

export default ToolTip;
