import React from "react";
import { towerPos } from "../../../../share/data";
import { useAppSelector } from "../../../../store/hook";
import { useGetTimeCurrentMatchDetail } from "../../../../share/customHooks";

const Map = ({ size = 300 }: { size?: number }) => {
  const matchDetail = useAppSelector((state) => state.matchDetail.matchDetail);
  const currentTime = useGetTimeCurrentMatchDetail();
  if (!matchDetail) return <></>;
  const { towerDeaths } = matchDetail;
  return (
    <svg
      viewBox="0 0 255 255"
      width={"100%"}
      height={"100%"}
      className="sc-aqkJz leEoYl block"
    >
      <g opacity="0.4">
        <rect width={255} height={255} fill="hsla(0,0%,100%,0.16)" />
        <image
          href="https://stratz.com/images/minimap_geometry.png"
          width={255}
          height={255}
        />
      </g>
      {towerPos.map((e, idx) => {
        const { x, y, npcId, type, isRadiant } = e;
        const npc = towerDeaths?.filter((build) => build.npcId === npcId);
        let color = isRadiant ? "rgba(6, 195, 88, 1)" : "rgba(195, 6, 6, 1)";
        if (npc && npc.length > 0) {
          const { time } = npc[0];
          if (time <= currentTime) color = "rgba(255, 255, 255, 0.16)";
        }
        switch (type) {
          case "TOWER":
            return (
              <svg
                key={idx}
                fill={color}
                x={x}
                y={y}
                width="10.04"
                height="10.04"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21.2176 5.19449C21.2176 4.03469 20.2774 3.09448 19.1176 3.09448H4.88199C3.72219 3.09448 2.78198 4.03469 2.78198 5.19449V18.8109C2.78198 19.9707 3.72219 20.9109 4.88199 20.9109H19.1176C20.2774 20.9109 21.2176 19.9707 21.2176 18.8109V5.19449ZM4.88199 5.19449V18.8109V5.19449Z"
                  fill="#0A0A0A"
                />
                <path
                  d="M19.1183 5.198H4.88281V18.8145H19.1183V5.198Z"
                  fill="inherit"
                />
                <path
                  d="M19.1183 14.5554H4.88281V18.8138H19.1183V14.5554Z"
                  fill="black"
                  fillOpacity="0.26"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.0005 9.87743L4.88281 5.198V14.5565L12.0005 9.87743Z"
                  fill="black"
                  fillOpacity="0.04"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.0009 9.87718L19.1187 5.19775V14.5562L12.0009 9.87718Z"
                  fill="black"
                  fillOpacity="0.26"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.0009 9.87646L19.1187 14.5555H4.88321L12.0009 9.87646Z"
                  fill="black"
                  fillOpacity="0.14"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.0009 9.87646L19.1187 5.1974H4.88321L12.0009 9.87646Z"
                  fill="black"
                  fillOpacity="0.44"
                />
                <path
                  d="M17.6399 3.09448H6.3584V13.5816H17.6399V3.09448Z"
                  fill="#0A0A0A"
                />
                <path
                  d="M16.6973 3.09448H7.29883V12.9666H16.6973V3.09448Z"
                  fill="inherit"
                />
                <path
                  d="M16.6973 10.6086H7.29883V12.9643H16.6973V10.6086Z"
                  fill="black"
                  fillOpacity="0.26"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.9981 5.45363L7.29883 3.09448V10.611L11.9981 5.45363Z"
                  fill="black"
                  fillOpacity="0.04"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.999 5.45363L16.6982 3.09448V10.611L11.999 5.45363Z"
                  fill="black"
                  fillOpacity="0.26"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.999 5.45703L16.6982 10.6144H7.29979L11.999 5.45703Z"
                  fill="black"
                  fillOpacity="0.14"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.999 5.45703L16.6982 3.09788H7.29979L11.999 5.45703Z"
                  fill="black"
                  fillOpacity="0.44"
                />
              </svg>
            );
          case "FORT": {
            return (
              <svg
                fill={color}
                x={x}
                y={y}
                width="16.06"
                height="16.06"
                viewBox="0 0 24 24"
                key={idx}
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.90865 5.41854L11.1278 1.19874C11.522 0.805137 12.056 0.58374 12.6128 0.58374H13.6556C14.8154 0.58374 15.7556 1.52394 15.7556 2.68374V4.56654H16.5092C17.066 4.56654 17.6 4.78794 17.9942 5.18154L19.3958 6.58374C19.79 6.97734 20.0108 7.51194 20.0108 8.06874V8.98134C20.7044 9.32394 21.1814 10.0379 21.1814 10.8641V15.8868C21.1814 16.4436 20.96 16.9776 20.5664 17.3718L15.1406 22.797C14.7362 23.2014 14.1848 23.4234 13.6136 23.412L11.2118 23.364C10.6694 23.3532 10.1522 23.1324 9.76885 22.749L3.58885 16.5689C3.19465 16.1747 2.97325 15.6408 2.97325 15.084V13.5593C2.97325 13.0025 3.19465 12.4685 3.58885 12.0749L3.92545 11.7378L3.43165 11.2445C3.03805 10.8509 2.81665 10.3163 2.81665 9.75954V8.82295C2.81665 8.26555 3.03805 7.73154 3.43165 7.33794L4.73665 6.03354C5.13025 5.63934 5.66425 5.41854 6.22105 5.41854H6.90865Z"
                  fill="#0A0A0A"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.2547 21.2678L13.6565 21.3158L19.0823 15.89V10.8674H18.6575L17.9117 11.6132L17.1665 10.8674L17.9117 10.1216V8.07202L16.5101 6.66981H15.5855L14.1839 8.07202L13.6565 8.04922V2.68701H12.6137L7.77948 7.52181H6.22188L4.91748 8.82622V9.76282L6.32928 11.1746V12.308L5.07408 13.5632V15.0872L11.2547 21.2678Z"
                  fill="inherit"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.49348 13.1438L6.32928 12.308V11.1746L4.91748 9.76281V8.82621L6.32928 9.43341L7.28508 10.1216L7.98708 11.1746L8.65548 10.4642L8.99508 8.43261L13.6565 2.68701V8.04921L14.1839 8.07201L15.5855 6.66981H16.5101L17.9117 8.07201V10.1216L17.1659 10.8674L17.9117 11.6132L18.6575 10.8674H19.0817V15.89L13.6565 21.3158L11.2547 21.2678L5.07408 15.0872V13.979L6.32928 14.1686L7.98708 14.7836L7.77408 12.7832L6.65268 12.9812L5.49348 13.1438ZM13.6013 14.7836L10.5827 12.9812L9.53208 14.3672V15.5534L10.5827 17.0252L13.6013 14.7836Z"
                  fill="black"
                  fill-opacity="0.27"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.6267 16.2352L14.9783 13.867L17.6567 12.3736L18.6569 11.998H19.0811V15.8866L13.6559 21.3124L11.5661 21.2704L9.53149 18.5056L10.2041 16.492L10.5821 17.0218L12.7859 19.975H13.0775L14.6267 16.2352ZM11.9993 13.4062L10.5821 11.998V9.75943L13.6559 6.36523V8.04583L13.0775 10.1182L15.1973 9.75943L17.3645 7.52203L17.9111 8.06863V10.1182L17.1653 10.864L14.9783 12.3736L14.6363 11.6098H13.6559L11.9993 13.4062Z"
                  fill="black"
                  fill-opacity="0.28"
                ></path>
              </svg>
            );
          }
          default:
            break;
        }
      })}
    </svg>
  );
};

export default Map;
