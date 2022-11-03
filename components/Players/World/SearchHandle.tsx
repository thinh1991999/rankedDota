import _ from "lodash";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Select, { SingleValue } from "react-select";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { fetchPlayersLeaderboard } from "../../../store/Slices/playersLeaderboardSlice";

type ItemList = {
  value: string;
  label: string;
};

const divisionIdsValue: ItemList[] = [
  { value: "0", label: "Americas" },
  { value: "1", label: "SE Asia" },
  { value: "2", label: "Europe" },
  { value: "3", label: "China" },
];
const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    borderBottom: "1px dotted pink",
    color: state.isSelected ? "red" : "blue",
    padding: 20,
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: 200,
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};
const SearchHandle = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [division, setDivision] = useState<{
    value: string;
    label: string;
  } | null>({ value: "0", label: "Americas" });

  const handleChooseDivition = (selectedOption: SingleValue<ItemList>) => {
    let finalDivision = 0;
    try {
      finalDivision = Number(selectedOption?.value);
    } catch (error) {
      finalDivision = 0;
    }
    router.push(
      {
        pathname: "/players/leaderboards/world",
        query: {
          divisionIds: selectedOption?.value || 0,
        },
      },
      undefined,
      { shallow: true }
    );
    dispatch(fetchPlayersLeaderboard(finalDivision));
    setDivision(selectedOption);
  };

  useEffect(() => {
    const divisionIds = router.query.divisionIds || 0;
    let final = 0;
    try {
      final = Number(divisionIds);
    } catch (error) {
      final = 0;
    }
    setDivision(divisionIdsValue[final]);
  }, [router]);

  return (
    <div>
      <div className="w-[150px] text-sm mr-2">
        <Select
          value={division}
          onChange={handleChooseDivition}
          options={divisionIdsValue}
        />
      </div>
    </div>
  );
};

export default SearchHandle;
