import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Select, { SingleValue } from "react-select";
import { useGetStylesReactSelect } from "../../../share";
import { useAppDispatch } from "../../../store/hook";
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

const SearchHandle = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { styles } = useGetStylesReactSelect();
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
          styles={styles}
          onChange={handleChooseDivition}
          options={divisionIdsValue}
        />
      </div>
    </div>
  );
};

export default SearchHandle;
