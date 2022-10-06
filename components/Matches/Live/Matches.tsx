import _ from "lodash";
import React, { useState, useEffect } from "react";
import { MatchLive } from "../../../interfaces/matches";
import Match from "./Match";

const Matches = ({ matches }: { matches: MatchLive[] }) => {
  const [matchesSort, setMatchesSort] = useState<MatchLive[]>([]);

  useEffect(() => {
    const newMatches = _.orderBy(matches, (match) => match.averageRank, "desc");
    setMatchesSort(newMatches);
  }, [matches]);

  return (
    <section>
      {matchesSort.map((match, idx) => {
        return (
          <div key={match.matchId} className="my-4">
            <Match match={match} />
          </div>
        );
      })}
    </section>
  );
};

export default Matches;
