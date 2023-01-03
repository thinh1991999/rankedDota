import _ from "lodash";
import { useRouter } from "next/router";
import React, { useState, useMemo } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { heroRankOptions } from "../../share";

const OptionsRank = () => {
  const [show, setShow] = useState<boolean>(false);
  const {
    query: { id, rankBracketHeroTimeDetail },
  } = useRouter();
  const router = useRouter();

  const title = useMemo(() => {
    if (
      rankBracketHeroTimeDetail &&
      typeof rankBracketHeroTimeDetail === "string"
    ) {
      const result = _.filter(heroRankOptions, (option) =>
        option.query.includes(rankBracketHeroTimeDetail)
      );
      return result[0]?.title || "Error";
    } else {
      return "All rank tiers";
    }
  }, [rankBracketHeroTimeDetail]);

  const handleForward = (option: { title: string; query: string }) => {
    const { query } = option;
    let link: object = {
      pathname: "/heroes/" + id,
      query: { rankBracketHeroTimeDetail: query },
    };
    let url = `/heroes/${id}?rankBracketHeroTimeDetail=${query}`;
    if (!query) {
      link = _.omit(link, ["query"]);
      url = `/heroes/${id}`;
    }
    router.push(link, url, {
      shallow: true,
    });
    setShow(false);
  };

  return (
    <section className="relative inline-block">
      <div
        className="cursor-pointer flex items-center border border-borderSecondary-dark rounded-md bg-navBg-light dark:bg-navBg-dark"
        onClick={() => setShow(!show)}
      >
        <span className="px-2">{title}</span>
        <div className="p-2 border-l border-borderSecondary-dark">
          {show ? <AiOutlineUp /> : <AiOutlineDown />}
        </div>
      </div>
      {show && (
        <ul className="absolute min-w-[250px] z-50 top-[calc(100%_+_10px)] left-0 whitespace-nowrap p-2 rounded-md border border-borderSecondary-dark bg-navBg-light dark:bg-navBg-dark">
          {heroRankOptions.map((option) => {
            const { title, query } = option;
            return (
              <li
                key={query}
                className="cursor-pointer px-3 py-2 rounded-md hover:bg-layer-light dark:hover:bg-layer-dark"
                onClick={() => handleForward(option)}
              >
                {title}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default OptionsRank;
