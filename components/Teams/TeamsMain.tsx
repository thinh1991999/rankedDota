import moment from "moment";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { Team } from "../../interfaces/teamsPage";
import MyImage from "../MyImage";

const TeamsMain = ({ teams }: { teams: Team[] }) => {
  const optionsNav = useRef<number[]>([15, 25, 50, 100]).current;
  const [countShow, setCountShow] = useState<number>(15);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  return (
    <section>
      <div className="flex justify-between items-center">
        <div className="">
          <h5 className="lg:text-base text-sm">Top Teams</h5>
          <span className="lg:text-base text-sm">Top 100</span>
        </div>
        <div className="">
          <div
            onClick={() => setShowOptions(!showOptions)}
            className="w-[150px] relative py-3 px-5 rounded-md dark:shadow-cardDark shadow-cardLight bg-layer-light dark:bg-layer-dark flex justify-between items-center cursor-pointer"
          >
            <span> {countShow}</span>
            <AiFillCaretDown />
            {showOptions && (
              <ul className="absolute top-full left-0 right-0 bg-bgSelect-light dark:bg-bgSelect-dark rounded-md overflow-hidden z-50">
                {optionsNav.map((option) => {
                  return (
                    <li
                      onClick={() => {
                        setShowOptions(false);
                        setCountShow(option);
                      }}
                      className="px-5 py-1 hover:bg-layer-light dark:hover:bg-layer-dark"
                      key={option}
                    >
                      {option}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <p className="text-xs mt-2 text-textSecondPrimary-light dark:text-textSecondPrimary-dark">
            Showing {countShow} of 100 results
          </p>
        </div>
      </div>
      <div className="flex flex-wrap -ml-2 -mr-2">
        {teams.map((team, idx) => {
          if (idx > countShow - 1) return;
          const {
            name,
            logo_url,
            team_id,
            rating,
            tag,
            losses,
            wins,
            last_match_time,
          } = team;
          const lastMatchTime = moment
            .unix(last_match_time)
            .format("MMMM D, YYYY");
          return (
            <div
              key={team_id}
              className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-2 "
            >
              <Link href={"/teams/" + team_id} className="">
                <a className="group relative block p-2 h-[360px] rounded-md shadow-cardLight dark:shadow-cardDark bg-layer-light dark:bg-layer-dark border border-solid border-borderTender-dark">
                  <div className="absolute top-0 left-0 bottom-0 right-0 bg-black opacity-20 group-hover:opacity-10 dark:group-hover:opacity-0"></div>
                  <div className="relative">
                    <div className="flex justify-end">
                      <span>{`#${idx + 1}`}</span>
                    </div>
                    <div className="flex justify-center">
                      {logo_url ? (
                        <MyImage
                          src={logo_url}
                          width="100px"
                          height="100px"
                          alt={name}
                        />
                      ) : (
                        <div className="w-[100px] h-[100px]"></div>
                      )}
                    </div>
                    <div className="flex flex-col justify-center items-center text-textSecondPrimary-light dark:text-textSecondPrimary-dark">
                      <span className="text-xl ">{name}</span>
                      <span className="">{tag}</span>
                      <div className="my-5 flex justify-center">
                        <div className="mx-2 flex flex-col items-center justify-center">
                          <span className=" text-xs">Rating</span>
                          <span>{rating}</span>
                        </div>
                        <div className="mx-2 flex flex-col items-center justify-center">
                          <span className=" text-xs">Wins</span>
                          <span>{wins}</span>
                        </div>
                        <div className="mx-2 flex flex-col items-center justify-center">
                          <span className=" text-xs">Losses</span>
                          <span>{losses}</span>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <span className=" text-xs">Last Match</span>
                        <span>{lastMatchTime}</span>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TeamsMain;
