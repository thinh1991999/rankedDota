import dynamic from "next/dynamic";
import React from "react";
import Heroes from "./Heroes";
import SearchMatch from "./SearchMatch";

const SearchMatches = dynamic(() => import("./SearchMatches"), {
  ssr: false,
});

const ComposContainer = () => {
  return (
    <div>
      <Heroes />
      <SearchMatch />
      <SearchMatches />
    </div>
  );
};

export default ComposContainer;
