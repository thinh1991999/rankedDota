import React, { ReactNode, useState } from "react";
import ReactTooltip from "react-tooltip";

const ToolTip = ({
  target,
  tooltip,
  id,
}: {
  target: ReactNode;
  tooltip: ReactNode;
  id: string;
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
        <ReactTooltip className="ReactTooltip" id={id}>
          {tooltip}
        </ReactTooltip>
      )}
    </>
  );
};

export default ToolTip;
