import _ from "lodash";
import React, { useMemo, useState } from "react";
import { CircleLoader } from "react-spinners";
import { Match } from "../../interfaces/compos";
import openDotaApiService from "../../services/openDotaApi.service";
import { useAppDispatch, useAppSelector } from "../../store";
import { clear } from "../../store/Slices/composSlice";
import { getDetaiHero } from "../../share/ultils";
import MyImage from "../MyImage";
import HeroIcon from "../HeroIcon";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import moment from "moment";

const SearchMatches = () => {
  const dispatch = useAppDispatch();
  const radiants = useAppSelector((state) => state.compos.radiants);
  const dires = useAppSelector((state) => state.compos.dires);

  const [loading, setLoading] = useState<boolean>(false);
  const [matchesSearch, setMatchesSearch] = useState<Match[]>([]);

  const checkValidSearch = useMemo(() => {
    if (radiants.length === 0 && dires.length === 0) return false;
    return true;
  }, [radiants, dires]);

  const handleSearch = (): void => {
    if (!checkValidSearch || loading) return;
    let params = new URLSearchParams();
    _.forEach(radiants, (hero) => {
      params.append("teamA", String(hero.id));
    });
    _.forEach(dires, (hero) => {
      params.append("teamB", String(hero.id));
    });
    setLoading(true);
    openDotaApiService
      .getComposMatch(params)
      .then((res) => {
        setMatchesSearch(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setMatchesSearch([]);
        setLoading(false);
      });
  };

  const handleClear = (): void => {
    dispatch(clear());
  };
  return (
    <section>
      <button
        onClick={() => handleSearch()}
        className={`${
          checkValidSearch && !loading ? "" : "cursor-not-allowed opacity-60"
        } px-3 py-2 rounded-md text-white bg-button-light dark:bg-button-dark hover:opacity-60 border border-solid border-borderSecondary-light dark:border-borderSecondary-dark mt-2`}
      >
        Search
      </button>
      {checkValidSearch && (
        <button
          onClick={handleClear}
          className="ml-5 px-3 py-2 rounded-md border border-solid border-borderSecondary-light dark:border-borderSecondary-dark text-white bg-button-light dark:bg-button-dark hover:opacity-50 mt-2"
        >
          Clear
        </button>
      )}
      {loading ? (
        <div className="py-10 flex justify-center items-center">
          <CircleLoader color="#fff" size={40} />
        </div>
      ) : (
        <div className="mt-5">
          <div className="flex items-center">
            <h6 className="mr-2 text-xl">Results: {matchesSearch.length}</h6>
          </div>
          <div className="mt-4 flex flex-wrap -ml-2 -mr-2">
            {matchesSearch.map((match) => {
              const { match_id, start_time, teama, teamb, teamawin } = match;
              const time = moment.unix(start_time).format("MMMM D, YYYY");
              return (
                <div key={match_id} className="w-full md:w-1/2 lg:w-1/3 p-2">
                  <div className="p-2 rounded-md border border-borderSecondary-light dark:border-borderSecondary-dark bg-layer-light dark:bg-layer-dark">
                    <div className="flex items-center justify-between text-textPrimary-light dark:text-textPrimary-dark">
                      <div className="flex flex-col justify-center text-sm">
                        <span>All Draft</span>
                        <span>{time}</span>
                      </div>
                      <div className="flex flex-col justify-center text-sm">
                        <span>{match_id}</span>
                        <button className="font-bold hover:opacity-50">
                          View Detail
                        </button>
                      </div>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <div className="w-1/6 flex justify-center items-center">
                        {teamawin ? (
                          <AiOutlineCheckCircle className="text-xl text-green-500" />
                        ) : (
                          <AiOutlineCloseCircle className="text-xl text-red-500" />
                        )}
                      </div>
                      {teama.map((id) => {
                        return (
                          <div
                            key={id}
                            className="w-1/6 flex justify-center items-center"
                          >
                            <HeroIcon id={id} filterClass="filter-green" />
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <div className="w-1/6 flex justify-center items-center">
                        {!teamawin ? (
                          <AiOutlineCheckCircle className="text-xl text-green-500" />
                        ) : (
                          <AiOutlineCloseCircle className="text-xl text-red-500" />
                        )}
                      </div>
                      {teamb.map((id) => {
                        return (
                          <div
                            key={id}
                            className="w-1/6 flex justify-center items-center"
                          >
                            <HeroIcon id={id} filterClass="filter-red" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchMatches;
