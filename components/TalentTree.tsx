import _ from "lodash";
import React, { useState, useEffect, memo } from "react";
import { TreeBranchInfo } from "../interfaces/heroes";
import { useAppSelector } from "../store";

const TreeBranch = memo(function TreeBranch({
  info,
}: {
  info: TreeBranchInfo;
}) {
  const { id, x1, y1, x2, y2, gradientTransform, stop, dPath, actived } = info;
  return (
    <>
      <linearGradient
        id={id}
        gradientUnits="userSpaceOnUse"
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        gradientTransform={gradientTransform}
      >
        {stop.map((s, idx) => {
          return (
            <stop key={idx} offset={s.offset} style={{ stopColor: s.color }} />
          );
        })}
      </linearGradient>
      <path
        fill={actived ? `url(#${id})` : "hsl(0,0%,28.000000000000004%)"}
        d={dPath}
      />
    </>
  );
});

const TalentTree = ({
  treeActive,
  size = 36,
}: {
  treeActive: {
    slotActives: number[];
    stats: number;
  };
  size?: number;
}) => {
  const talents = useAppSelector((state) => state.globalData.talents);
  const [treeBranchs, setTreeBranchs] = useState<TreeBranchInfo[]>([]);
  const getColorDot = (idx: number) => {
    return idx <= treeActive.stats
      ? "rgb(231, 189, 118)"
      : "hsl(0,0%,28.000000000000004%)";
  };

  useEffect(() => {
    const { slotActives } = treeActive;
    const noActives: TreeBranchInfo[] = [];
    const actives: TreeBranchInfo[] = [];
    _.forEach(talents, (tl) => {
      const checkActived = slotActives.includes(tl.slot);
      const sdTl = { ...tl };
      if (checkActived) {
        sdTl.actived = true;
        actives.push(sdTl);
      } else {
        noActives.push(sdTl);
      }
    });
    setTreeBranchs([...noActives, ...actives]);
  }, [treeActive, talents]);

  return (
    <svg viewBox="0 0 32 32" height={size}>
      <svg
        viewBox="0 0 51 63"
        height={23}
        y="4.45"
        style={{ width: "100%", height: "100%" }}
      >
        {treeBranchs.map((branch, idx) => {
          return <TreeBranch info={branch} key={idx} />;
        })}
      </svg>
      <path
        d="M3.258 23.38c.295-.22.624-.303.992-.238.362.057.651.235.868.536.217.3.298.634.243 1.002-.05.376-.225.67-.52.891a1.24 1.24 0 01-1.002.244 1.275 1.275 0 01-.868-.535 1.315 1.315 0 01-.242-1.002c.05-.377.225-.671.529-.898z"
        fill={getColorDot(1)}
      />
      <path
        d="M6.244 26.987c.215-.301.503-.482.873-.534.361-.06.69.02.988.24.297.218.474.51.532.878.067.374-.012.708-.227 1.01-.221.31-.51.491-.88.544a1.263 1.263 0 01-.987-.24 1.302 1.302 0 01-.533-.879 1.291 1.291 0 01.234-1.019z"
        fill={getColorDot(2)}
      />
      <path
        d="M10.17 29.492c.114-.355.333-.617.669-.783a1.26 1.26 0 011.012-.082c.349.115.607.338.773.669.177.335.204.677.091 1.032a1.27 1.27 0 01-.671.793 1.26 1.26 0 01-1.012.082 1.284 1.284 0 01-.774-.669 1.294 1.294 0 01-.087-1.042z"
        fill={getColorDot(3)}
      />
      <path
        d="M14.684 30.638c0-.373.129-.69.398-.954.258-.264.57-.396.938-.396.366 0 .68.13.938.393.27.262.4.58.4.953.002.383-.127.701-.397.965a1.268 1.268 0 01-.937.396c-.367 0-.68-.13-.939-.393-.27-.263-.4-.58-.4-.964z"
        fill={getColorDot(4)}
      />
      <path
        d="M19.302 30.322a1.287 1.287 0 01.09-1.032c.165-.331.423-.555.771-.67a1.26 1.26 0 011.013.08c.336.166.556.428.67.782.116.365.09.708-.087 1.043a1.284 1.284 0 01-.772.67 1.26 1.26 0 01-1.013-.08 1.27 1.27 0 01-.672-.793z"
        fill={getColorDot(5)}
      />
      <path
        d="M23.614 28.564a1.284 1.284 0 01-.23-1.01c.058-.367.234-.66.53-.88.297-.219.626-.3.988-.241.37.051.659.231.874.532.223.31.302.645.236 1.019-.057.367-.234.66-.53.88-.297.219-.626.3-.988.241a1.252 1.252 0 01-.88-.541z"
        fill={getColorDot(6)}
      />
      <path
        d="M27.184 25.537a1.272 1.272 0 01-.523-.89 1.316 1.316 0 01.24-1.002c.215-.302.504-.48.866-.538.368-.067.697.015.993.234.305.226.481.52.531.896.057.368-.023.702-.239 1.003-.216.301-.505.48-.866.538a1.24 1.24 0 01-1.002-.241z"
        fill={getColorDot(7)}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.974 21.886a15.733 15.733 0 01-1.307-6.302C.667 6.983 7.537 0 16 0c8.463 0 15.333 6.983 15.333 15.584 0 2.226-.46 4.343-1.288 6.259a3.35 3.35 0 00-.942-.549 14.626 14.626 0 001.152-5.71c0-7.996-6.387-14.488-14.255-14.488-7.867 0-14.255 6.492-14.255 14.488 0 2.042.417 3.986 1.169 5.75a3.36 3.36 0 00-.94.552z"
        fill="hsla(0,0%,100%,0.12)"
      />
    </svg>
  );
};

export default memo(TalentTree);
