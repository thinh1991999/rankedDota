import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { SyntheticEvent } from "react";
import { useRouter } from "next/router";

function SearchID() {
  const router = useRouter();
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (value.trim().length < 1) return;
    router.push("/matches/" + value);
  };

  return (
    <form
      className="rounded-md border-2 px-2 py-3 flex items-center w-[300px] md:w-[350px] focus-within:border-blue-800"
      onSubmit={handleSubmit}
    >
      <div className="">
        <AiOutlineSearch className="text-xl" />
      </div>
      <input
        className="flex-1 mx-1 bg-transparent border-none w-[100px] text-sm"
        type="text"
        placeholder="Enter Match ID"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      {value.length > 0 && (
        <button
          onClick={() => setValue("")}
          className="px-3 py-1 bg-white/5 hover:bg-white/30 rounded-md text-sm"
        >
          Clear
        </button>
      )}
      <button
        onSubmit={handleSubmit}
        className="px-3 py-1 bg-white/5 hover:bg-white/30 rounded-md text-sm"
      >
        Search
      </button>
    </form>
  );
}

export default SearchID;
