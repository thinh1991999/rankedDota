import _ from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useMemo } from "react";
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
      return result[0].title;
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
        className="cursor-pointer flex items-center border rounded-md"
        onClick={() => setShow(!show)}
      >
        <span className="px-2">{title}</span>
        <div className="p-2 border-l">
          {show ? <AiOutlineUp /> : <AiOutlineDown />}
        </div>
      </div>
      {show && (
        <ul className="absolute min-w-[250px] z-10 top-[calc(100%_+_10px)] left-0 whitespace-nowrap p-2 rounded-md border bg-neutral-dark">
          {heroRankOptions.map((option) => {
            const { title, query } = option;
            // let link: object = {
            //   pathname: "/heroes/" + id,
            //   query: { rankBracketHeroTimeDetail: query },
            // };
            // if (!query) {
            //   link = _.omit(link, ["query"]);
            // }
            return (
              <li
                key={query}
                className="cursor-pointer px-3 py-2 rounded-md hover:bg-gray-700"
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
