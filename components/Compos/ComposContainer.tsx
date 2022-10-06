import React from "react";
import { HeroesStatus } from "../../interfaces/heroes";
import Heroes from "./Heroes";
import { useAppSelector } from "../../store/hook";
import SearchMatch from "./SearchMatch";
import SearchMatches from "./SearchMatches";

const ComposContainer = ({ heroesStatus }: { heroesStatus: HeroesStatus }) => {
  return (
    <div>
      <Heroes />
      <SearchMatch />
      <SearchMatches />
    </div>
  );
};

export default ComposContainer;
