import _ from "lodash";
import React, { useState } from "react";
import { AiOutlineUngroup, AiOutlineUnorderedList } from "react-icons/ai";
import MatchupFull from "./MatchupFull";
import MatchupSort from "./MatchupSort";

const Matchup = () => {
  const [curr, setCurr] = useState<number>(0);
  return (
    <section className=" bg-layer-dark rounded-md text-sm">
      <div className="py-4 px-3 flex justify-between items-center">
        <h6 className="text-xl font-bold">Matchup</h6>
        <ul className="flex text-white  bg-layerStrong-dark rounded-full">
          <li
            onClick={() => setCurr(0)}
            className={`${
              curr !== 0 ? "opacity-20" : ""
            } px-3 py-2 border rounded-tl-full rounded-bl-full border-solid  border-borderTender-dark cursor-pointer hover:opacity-100`}
          >
            <AiOutlineUnorderedList />
          </li>
          <li
            onClick={() => setCurr(1)}
            className={`${
              curr !== 1 ? "opacity-20" : ""
            } px-3 py-2 border rounded-tr-full rounded-br-full border-solid border-borderTender-dark cursor-pointer hover:opacity-100`}
          >
            <AiOutlineUngroup />
          </li>
        </ul>
      </div>
      <div className={`${curr === 0 ? "block" : "hidden"}`}>
        <MatchupFull />
      </div>
      <div className={`${curr === 1 ? "block" : "hidden"}`}>
        <MatchupSort />
      </div>
    </section>
  );
};

export default Matchup;
