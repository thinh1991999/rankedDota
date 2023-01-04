import { useRouter } from "next/router";
import filter from "lodash/filter";
import React, { useState, useEffect } from "react";
import Select, { ActionMeta, SingleValue } from "react-select";
import { ranks, useGetStylesReactSelect } from "../../../share";
import { gameModes, ItemList } from "../../../share/reactSelectData";
import { FormatOptionLabel } from "../../CustomReactSelectContainer";
import { useAppDispatch } from "../../../store/hook";
import { fetchHeroesMetaPositions } from "../../../store/Slices/heroesPositionsSlice";

const SearchHandle = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { styles } = useGetStylesReactSelect();
  const [mounted, setMounted] = useState<boolean>(false);
  const [rank, setRank] = useState<SingleValue<ItemList>>(ranks[0]);
  const [gameMode, setGameMode] = useState<SingleValue<ItemList>>(gameModes[0]);

  const handleChangeRank = (selectedOption: SingleValue<ItemList>) => {
    if (selectedOption?.value === rank?.value) return;
    setRank(selectedOption);
    let query = { ...router.query };
    let value = null;
    if (!selectedOption?.value) {
      delete query.bracketIds;
    } else {
      query["bracketIds"] = selectedOption.value;
      value = selectedOption.value;
    }
    router.push(
      {
        pathname: "/heroes/meta/positions",
        query,
      },
      undefined,
      { shallow: true }
    );
    dispatch(
      fetchHeroesMetaPositions({
        bracketIds: value,
        gameModeIds: gameMode?.value,
      })
    );
  };

  const handleChangeGameMode = (selectedOption: SingleValue<ItemList>) => {
    if (selectedOption?.value === gameMode?.value) return;
    setGameMode(selectedOption);
    let query = { ...router.query };
    let value = null;
    if (!selectedOption?.value) {
      delete query.gameModeIds;
    } else {
      query["gameModeIds"] = selectedOption.value;
      value = selectedOption.value;
    }
    router.push(
      {
        pathname: "/heroes/meta/positions",
        query,
      },
      undefined,
      { shallow: true }
    );
    dispatch(
      fetchHeroesMetaPositions({
        bracketIds: rank?.value,
        gameModeIds: value,
      })
    );
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (mounted) return;
    const {
      query: { bracketIds, regionIds, gameModeIds, positionIds },
    } = router;
    if (bracketIds) {
      const filterBracketIds = filter(ranks, (r) => r.value === bracketIds);
      setRank(filterBracketIds[0]);
    }
    if (gameModeIds) {
      const filterGameModeIds = filter(
        gameModes,
        (g) => g.value === gameModeIds
      );
      setGameMode(filterGameModeIds[0]);
    }
    setMounted(true);
  }, [router, mounted]);

  return (
    <div className="flex flex-wrap -ml-2 -mr-2 ">
      <Select
        styles={styles}
        value={rank}
        onChange={
          handleChangeRank as (
            newValue: any,
            actionMeta: ActionMeta<any>
          ) => void
        }
        formatOptionLabel={FormatOptionLabel}
        options={ranks}
        className="capitalize p-2 md:w-[200px] w-full text-sm"
      />
      <Select
        styles={styles}
        value={gameMode}
        onChange={handleChangeGameMode}
        options={gameModes}
        className="capitalize p-2 md:w-[150px] w-full text-sm"
      />
    </div>
  );
};

export default SearchHandle;
