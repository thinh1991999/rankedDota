import React, { useEffect, useState } from "react";
import Select, {
  ActionMeta,
  MultiValue,
  SingleValue,
  StylesConfig,
  components as components,
  ValueContainerProps,
} from "react-select";
import { AiOutlineSearch } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import {
  setSearchName,
  fetchHeroesMetaTrends,
} from "../../../store/Slices/heroesTrendsSlice";
import MyImage from "../../MyImage";
import { getImgOpenDota, useGetStylesReactSelect } from "../../../share";
import { getImgStratsDota } from "../../../share/ultils";
import { useRouter } from "next/router";
import _ from "lodash";
import { URLSearchParams } from "url";
import { ParsedUrlQuery } from "querystring";
import { ReactElement } from "react";
import {
  durations,
  gameModes,
  ItemList,
  positions,
  ranks,
  regions,
} from "../../../share/reactSelectData";
import {
  CustomValueContainer,
  FormatOptionLabel,
} from "../../CustomReactSelectContainer";

const SearchHandle = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchName = useAppSelector((state) => state.heroesTrends.searchName);
  const { styles } = useGetStylesReactSelect();
  const [mounted, setMounted] = useState<boolean>(false);
  const [region, setRegion] = useState<SingleValue<ItemList>>(regions[0]);
  const [gameMode, setGameMode] = useState<SingleValue<ItemList>>(gameModes[0]);
  const [rank, setRank] = useState<SingleValue<ItemList>>(ranks[0]);
  const [positionsValue, setPositionsValue] = useState<MultiValue<ItemList>>([
    positions[0],
  ]);

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
        pathname: "/heroes/meta/trends",
        query,
      },
      undefined,
      { shallow: true }
    );
    dispatch(
      fetchHeroesMetaTrends({
        bracketIds: value,
        positions: positionsValue.map((item) => item.value),
        regionIds: region?.value,
        gameModeIds: gameMode?.value,
      })
    );
  };

  const handleChangePosiion = (selectedOption: MultiValue<ItemList>) => {
    if (selectedOption === positionsValue) return;
    const idx = _.findIndex(selectedOption, (select) => select.value === "");
    let positionsChoose = selectedOption.map((select) => select.value);
    let query = { ...router.query };
    if (idx == selectedOption.length - 1) {
      positionsChoose = [];
      setPositionsValue([positions[0]]);
      delete query.positionIds;
    } else {
      query.positionIds = positionsChoose;
      setPositionsValue(selectedOption);
      setPositionsValue(selectedOption.filter((option) => option.value !== ""));
    }
    router.push(
      {
        pathname: "/heroes/meta/trends",
        query,
      },
      undefined,
      { shallow: true }
    );
    dispatch(
      fetchHeroesMetaTrends({
        bracketIds: rank?.value,
        positions: positionsChoose,
        regionIds: region?.value,
      })
    );
  };

  const handleChangeRegion = (selectedOption: SingleValue<ItemList>) => {
    if (selectedOption?.value === region?.value) return;
    setRegion(selectedOption);
    let query = { ...router.query };
    let value = null;
    if (!selectedOption?.value) {
      delete query.regionIds;
    } else {
      query["regionIds"] = selectedOption.value;
      value = selectedOption.value;
    }
    router.push(
      {
        pathname: "/heroes/meta/trends",
        query,
      },
      undefined,
      { shallow: true }
    );
    dispatch(
      fetchHeroesMetaTrends({
        bracketIds: rank?.value,
        positions: positionsValue.map((item) => item.value),
        regionIds: value,
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
        pathname: "/heroes/meta/trends",
        query,
      },
      undefined,
      { shallow: true }
    );
    dispatch(
      fetchHeroesMetaTrends({
        bracketIds: rank?.value,
        positions: positionsValue.map((item) => item.value),
        regionIds: region?.value,
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
      const filterBracketIds = _.filter(ranks, (r) => r.value === bracketIds);
      setRank(filterBracketIds[0]);
    }
    if (regionIds) {
      console.log("1");
      const filterRegionIds = _.filter(regions, (r) => r.value === regionIds);
      setRegion(filterRegionIds[0]);
    }
    if (gameModeIds) {
      const filterGameModeIds = _.filter(
        gameModes,
        (g) => g.value === gameModeIds
      );
      setGameMode(filterGameModeIds[0]);
    }
    if (positionIds) {
      if (typeof positionIds === "object") {
        const arrPos: ItemList[] = [];
        _.forEach(positions, (p) => {
          if (p.value && positionIds.includes(p.value)) {
            arrPos.push(p);
          }
        });
        setPositionsValue(arrPos);
      } else {
        const filterPositionIds = _.filter(
          positions,
          (p) => p.value === positionIds
        );
        setPositionsValue(filterPositionIds);
      }
    }
    setMounted(true);
  }, [router, mounted]);

  return (
    <div className="flex items-center flex-wrap -ml-2 -mr-2">
      <div className="p-2">
        <form
          className=" flex items-center px-3 py-2 bg-layerStrong-dark border-[1px] border-solid border-gray-500 focus-within:border-blue-500 rounded-md"
          onSubmit={(e) => e.preventDefault()}
        >
          <AiOutlineSearch className="text-xl" />
          <input
            type="text"
            value={searchName}
            onChange={(e) => {
              dispatch(setSearchName(e.target.value));
            }}
            placeholder="Search heroes"
            className="ml-2 text-sm"
          />
        </form>
      </div>
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
        isMulti={true}
        value={positionsValue}
        onChange={handleChangePosiion}
        formatOptionLabel={FormatOptionLabel}
        components={{
          ValueContainer: CustomValueContainer,
        }}
        isClearable={true}
        options={positions}
        styles={styles}
        hideSelectedOptions={false}
        closeMenuOnSelect={false}
        className="capitalize p-2 md:w-[200px] w-full text-sm"
      />

      <Select
        value={region}
        onChange={handleChangeRegion}
        styles={styles}
        options={regions}
        className="capitalize p-2 md:w-[150px] w-full text-sm"
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
