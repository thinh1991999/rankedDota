import React from "react";
import { useAppSelector } from "../../../../store/hook";

const Map = ({ detroys }: { detroys?: number[] }) => {
  const matchDetail = useAppSelector((state) => state.matchDetail.matchDetail);

  return (
    <svg
      viewBox="0 0 255 255"
      width={300}
      height={300}
      className="sc-eosfuE hnInXZ"
    >
      <g opacity="0.4">
        <rect width={255} height={255} fill="hsla(0,0%,100%,0.16)" />
        <image
          href="https://stratz.com/images/minimap_geometry.png"
          width={255}
          height={255}
        />
      </g>
      <svg
        fill="blue"
        x={10}
        y={184}
        width="10.04"
        height="10.04"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ xgmNz"
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
      <svg
        fill="red"
        x={187}
        y={23}
        width="10.04"
        height="10.04"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ diJJCs"
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
      <svg
        fill="green"
        x="19.0354"
        y={184}
        width="10.04"
        height="10.04"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ xgmNz"
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
      <svg
        fill="red"
        x={187}
        y="33.0394"
        width="10.04"
        height="10.04"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ diJJCs"
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
      <svg
        fill="green"
        x="52.189"
        y="227.925"
        width="10.04"
        height="10.04"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ xgmNz"
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
      <svg
        fill="red"
        x={222}
        y={67}
        width="10.04"
        height="10.04"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ diJJCs"
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
      <svg
        fill="green"
        x="52.189"
        y="217.886"
        width="10.04"
        height="10.04"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ xgmNz"
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
      <svg
        fill="red"
        x="232.04"
        y={67}
        width="10.04"
        height="10.04"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ diJJCs"
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
      <svg
        fill="green"
        x={39}
        y={191}
        width="10.04"
        height="10.04"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ xgmNz"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.1054 6.33923V6.22583C5.1054 5.58503 5.3982 4.97903 5.9004 4.58063L10.6866 0.785028C11.451 0.178428 12.5322 0.178428 13.2966 0.785028L18.0828 4.58063C18.585 4.97903 18.8778 5.58503 18.8778 6.22583V6.33923L21.6882 8.56823C22.1904 8.96663 22.4832 9.57263 22.4832 10.2134V14.966C22.4832 15.6098 22.188 16.2176 21.6822 16.616L13.2906 23.2226C12.5286 23.8226 11.4546 23.8226 10.6926 23.2226L2.301 16.616C1.7952 16.2176 1.5 15.6098 1.5 14.966V10.2134C1.5 9.57263 1.7928 8.96663 2.295 8.56823L5.1054 6.33923Z"
          fill="#0A0A0A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.3865 10.2136V14.9662L11.9949 21.5728L3.60327 14.9662V10.2136L11.9949 3.55835L20.3865 10.2136Z"
          fill="inherit"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.9939 17.3636L20.3859 10.2139V14.9663L11.9939 21.5729V17.3636Z"
          fill="black"
          fillOpacity="0.33"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.60327 10.2139L11.9953 17.3636V21.5729L3.60327 14.9663V10.2139Z"
          fill="black"
          fillOpacity="0.18"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.60327 10.2136L11.9953 7.08887V17.3638L3.60327 10.2136Z"
          fill="black"
          fillOpacity="0.05"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.60327 10.2137L11.9953 7.08898V3.55835L3.60327 10.2137Z"
          fill="black"
          fillOpacity="0.32"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.3859 10.2137L11.9939 7.08898V3.55835L20.3859 10.2137Z"
          fill="black"
          fillOpacity="0.39"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.3859 10.2136L11.9939 7.08887V17.3638L20.3859 10.2136Z"
          fill="black"
          fillOpacity="0.32"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.99 2.00854L17.6007 6.12763V9.17575L11.99 13.9808L6.39233 9.17575V6.12763L11.99 2.00854Z"
          fill="#0A0A0A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.9965 2.68408L17.0558 6.27592V8.97269L11.9965 13.1239L6.93726 8.97269V6.27592L11.9965 2.68408Z"
          fill="inherit"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.9941 10.5865L17.0534 6.27612V8.97289L11.9941 13.1241V10.5865Z"
          fill="black"
          fillOpacity="0.33"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.93726 6.27612L11.9965 10.5865V13.1241L6.93726 8.97289V6.27612Z"
          fill="black"
          fillOpacity="0.18"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.93726 6.27591L11.9965 4.35718V10.5865L6.93726 6.27591Z"
          fill="black"
          fillOpacity="0.05"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.93726 6.27587L11.9965 4.35714V2.68433L6.93726 6.27587Z"
          fill="black"
          fillOpacity="0.32"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.0534 6.27587L11.9941 4.35714V2.68433L17.0534 6.27587Z"
          fill="black"
          fillOpacity="0.39"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.0534 6.27591L11.9941 4.35718V10.5865L17.0534 6.27591Z"
          fill="black"
          fillOpacity="0.32"
        />
      </svg>
      <svg
        fill="background.clearGlass.4"
        x={193}
        y={53}
        width="10.04"
        height="10.04"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ lfIEcn"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.1054 6.33923V6.22583C5.1054 5.58503 5.3982 4.97903 5.9004 4.58063L10.6866 0.785028C11.451 0.178428 12.5322 0.178428 13.2966 0.785028L18.0828 4.58063C18.585 4.97903 18.8778 5.58503 18.8778 6.22583V6.33923L21.6882 8.56823C22.1904 8.96663 22.4832 9.57263 22.4832 10.2134V14.966C22.4832 15.6098 22.188 16.2176 21.6822 16.616L13.2906 23.2226C12.5286 23.8226 11.4546 23.8226 10.6926 23.2226L2.301 16.616C1.7952 16.2176 1.5 15.6098 1.5 14.966V10.2134C1.5 9.57263 1.7928 8.96663 2.295 8.56823L5.1054 6.33923Z"
          fill="#0A0A0A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.3865 10.2136V14.9662L11.9949 21.5728L3.60327 14.9662V10.2136L11.9949 3.55835L20.3865 10.2136Z"
          fill="inherit"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.9939 17.3636L20.3859 10.2139V14.9663L11.9939 21.5729V17.3636Z"
          fill="black"
          fillOpacity="0.33"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.60327 10.2139L11.9953 17.3636V21.5729L3.60327 14.9663V10.2139Z"
          fill="black"
          fillOpacity="0.18"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.60327 10.2136L11.9953 7.08887V17.3638L3.60327 10.2136Z"
          fill="black"
          fillOpacity="0.05"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.60327 10.2137L11.9953 7.08898V3.55835L3.60327 10.2137Z"
          fill="black"
          fillOpacity="0.32"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.3859 10.2137L11.9939 7.08898V3.55835L20.3859 10.2137Z"
          fill="black"
          fillOpacity="0.39"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.3859 10.2136L11.9939 7.08887V17.3638L20.3859 10.2136Z"
          fill="black"
          fillOpacity="0.32"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.99 2.00854L17.6007 6.12763V9.17575L11.99 13.9808L6.39233 9.17575V6.12763L11.99 2.00854Z"
          fill="#0A0A0A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.9965 2.68408L17.0558 6.27592V8.97269L11.9965 13.1239L6.93726 8.97269V6.27592L11.9965 2.68408Z"
          fill="inherit"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.9941 10.5865L17.0534 6.27612V8.97289L11.9941 13.1241V10.5865Z"
          fill="black"
          fillOpacity="0.33"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.93726 6.27612L11.9965 10.5865V13.1241L6.93726 8.97289V6.27612Z"
          fill="black"
          fillOpacity="0.18"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.93726 6.27591L11.9965 4.35718V10.5865L6.93726 6.27591Z"
          fill="black"
          fillOpacity="0.05"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.93726 6.27587L11.9965 4.35714V2.68433L6.93726 6.27587Z"
          fill="black"
          fillOpacity="0.32"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.0534 6.27587L11.9941 4.35714V2.68433L17.0534 6.27587Z"
          fill="black"
          fillOpacity="0.39"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.0534 6.27591L11.9941 4.35718V10.5865L17.0534 6.27591Z"
          fill="black"
          fillOpacity="0.32"
        />
      </svg>
      <svg
        fill="green"
        x="46.0276"
        y="197.024"
        width="10.04"
        height="10.04"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ xgmNz"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.1054 6.33923V6.22583C5.1054 5.58503 5.3982 4.97903 5.9004 4.58063L10.6866 0.785028C11.451 0.178428 12.5322 0.178428 13.2966 0.785028L18.0828 4.58063C18.585 4.97903 18.8778 5.58503 18.8778 6.22583V6.33923L21.6882 8.56823C22.1904 8.96663 22.4832 9.57263 22.4832 10.2134V14.966C22.4832 15.6098 22.188 16.2176 21.6822 16.616L13.2906 23.2226C12.5286 23.8226 11.4546 23.8226 10.6926 23.2226L2.301 16.616C1.7952 16.2176 1.5 15.6098 1.5 14.966V10.2134C1.5 9.57263 1.7928 8.96663 2.295 8.56823L5.1054 6.33923Z"
          fill="#0A0A0A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.3865 10.2136V14.9662L11.9949 21.5728L3.60327 14.9662V10.2136L11.9949 3.55835L20.3865 10.2136Z"
          fill="inherit"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.9939 17.3636L20.3859 10.2139V14.9663L11.9939 21.5729V17.3636Z"
          fill="black"
          fillOpacity="0.33"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.60327 10.2139L11.9953 17.3636V21.5729L3.60327 14.9663V10.2139Z"
          fill="black"
          fillOpacity="0.18"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.60327 10.2136L11.9953 7.08887V17.3638L3.60327 10.2136Z"
          fill="black"
          fillOpacity="0.05"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.60327 10.2137L11.9953 7.08898V3.55835L3.60327 10.2137Z"
          fill="black"
          fillOpacity="0.32"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.3859 10.2137L11.9939 7.08898V3.55835L20.3859 10.2137Z"
          fill="black"
          fillOpacity="0.39"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.3859 10.2136L11.9939 7.08887V17.3638L20.3859 10.2136Z"
          fill="black"
          fillOpacity="0.32"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.99 2.00854L17.6007 6.12763V9.17575L11.99 13.9808L6.39233 9.17575V6.12763L11.99 2.00854Z"
          fill="#0A0A0A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.9965 2.68408L17.0558 6.27592V8.97269L11.9965 13.1239L6.93726 8.97269V6.27592L11.9965 2.68408Z"
          fill="inherit"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.9941 10.5865L17.0534 6.27612V8.97289L11.9941 13.1241V10.5865Z"
          fill="black"
          fillOpacity="0.33"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.93726 6.27612L11.9965 10.5865V13.1241L6.93726 8.97289V6.27612Z"
          fill="black"
          fillOpacity="0.18"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.93726 6.27591L11.9965 4.35718V10.5865L6.93726 6.27591Z"
          fill="black"
          fillOpacity="0.05"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.93726 6.27587L11.9965 4.35714V2.68433L6.93726 6.27587Z"
          fill="black"
          fillOpacity="0.32"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.0534 6.27587L11.9941 4.35714V2.68433L17.0534 6.27587Z"
          fill="black"
          fillOpacity="0.39"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.0534 6.27591L11.9941 4.35718V10.5865L17.0534 6.27591Z"
          fill="black"
          fillOpacity="0.32"
        />
      </svg>
      <svg
        fill="background.clearGlass.4"
        x="200.027"
        y="59.0236"
        width="10.04"
        height="10.04"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ lfIEcn"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.1054 6.33923V6.22583C5.1054 5.58503 5.3982 4.97903 5.9004 4.58063L10.6866 0.785028C11.451 0.178428 12.5322 0.178428 13.2966 0.785028L18.0828 4.58063C18.585 4.97903 18.8778 5.58503 18.8778 6.22583V6.33923L21.6882 8.56823C22.1904 8.96663 22.4832 9.57263 22.4832 10.2134V14.966C22.4832 15.6098 22.188 16.2176 21.6822 16.616L13.2906 23.2226C12.5286 23.8226 11.4546 23.8226 10.6926 23.2226L2.301 16.616C1.7952 16.2176 1.5 15.6098 1.5 14.966V10.2134C1.5 9.57263 1.7928 8.96663 2.295 8.56823L5.1054 6.33923Z"
          fill="#0A0A0A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.3865 10.2136V14.9662L11.9949 21.5728L3.60327 14.9662V10.2136L11.9949 3.55835L20.3865 10.2136Z"
          fill="inherit"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.9939 17.3636L20.3859 10.2139V14.9663L11.9939 21.5729V17.3636Z"
          fill="black"
          fillOpacity="0.33"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.60327 10.2139L11.9953 17.3636V21.5729L3.60327 14.9663V10.2139Z"
          fill="black"
          fillOpacity="0.18"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.60327 10.2136L11.9953 7.08887V17.3638L3.60327 10.2136Z"
          fill="black"
          fillOpacity="0.05"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.60327 10.2137L11.9953 7.08898V3.55835L3.60327 10.2137Z"
          fill="black"
          fillOpacity="0.32"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.3859 10.2137L11.9939 7.08898V3.55835L20.3859 10.2137Z"
          fill="black"
          fillOpacity="0.39"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.3859 10.2136L11.9939 7.08887V17.3638L20.3859 10.2136Z"
          fill="black"
          fillOpacity="0.32"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.99 2.00854L17.6007 6.12763V9.17575L11.99 13.9808L6.39233 9.17575V6.12763L11.99 2.00854Z"
          fill="#0A0A0A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.9965 2.68408L17.0558 6.27592V8.97269L11.9965 13.1239L6.93726 8.97269V6.27592L11.9965 2.68408Z"
          fill="inherit"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.9941 10.5865L17.0534 6.27612V8.97289L11.9941 13.1241V10.5865Z"
          fill="black"
          fillOpacity="0.33"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.93726 6.27612L11.9965 10.5865V13.1241L6.93726 8.97289V6.27612Z"
          fill="black"
          fillOpacity="0.18"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.93726 6.27591L11.9965 4.35718V10.5865L6.93726 6.27591Z"
          fill="black"
          fillOpacity="0.05"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.93726 6.27587L11.9965 4.35714V2.68433L6.93726 6.27587Z"
          fill="black"
          fillOpacity="0.32"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.0534 6.27587L11.9941 4.35714V2.68433L17.0534 6.27587Z"
          fill="black"
          fillOpacity="0.39"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.0534 6.27591L11.9941 4.35718V10.5865L17.0534 6.27591Z"
          fill="black"
          fillOpacity="0.32"
        />
      </svg>
      <svg
        fill="background.clearGlass.4"
        x={45}
        y={23}
        width="12.05"
        height="12.05"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ lfIEcn"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.6369 4.45327C21.6369 3.29347 20.6967 2.35327 19.5369 2.35327H4.46255C3.30275 2.35327 2.36255 3.29347 2.36255 4.45327V19.5277C2.36255 20.6875 3.30275 21.6277 4.46255 21.6277H19.5369C20.6967 21.6277 21.6369 20.6875 21.6369 19.5277V4.45327Z"
          fill="#0A0A0A"
        />
        <path
          d="M19.5378 4.45654H4.46338V19.531H19.5378V4.45654Z"
          fill="inherit"
        />
        <path
          d="M19.5378 13.5085H4.46338V19.527H19.5378V13.5085Z"
          fill="black"
          fillOpacity="0.17"
        />
      </svg>
      <svg
        fill="red"
        x={119}
        y={21}
        width="12.05"
        height="12.05"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ diJJCs"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.6369 4.45327C21.6369 3.29347 20.6967 2.35327 19.5369 2.35327H4.46255C3.30275 2.35327 2.36255 3.29347 2.36255 4.45327V19.5277C2.36255 20.6875 3.30275 21.6277 4.46255 21.6277H19.5369C20.6967 21.6277 21.6369 20.6875 21.6369 19.5277V4.45327Z"
          fill="#0A0A0A"
        />
        <path
          d="M19.5378 4.45654H4.46338V19.531H19.5378V4.45654Z"
          fill="inherit"
        />
        <path
          d="M19.5378 13.5085H4.46338V19.527H19.5378V13.5085Z"
          fill="black"
          fillOpacity="0.17"
        />
      </svg>
      <svg
        fill="red"
        x={180}
        y={25}
        width="12.05"
        height="12.05"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ diJJCs"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.6369 4.45327C21.6369 3.29347 20.6967 2.35327 19.5369 2.35327H4.46255C3.30275 2.35327 2.36255 3.29347 2.36255 4.45327V19.5277C2.36255 20.6875 3.30275 21.6277 4.46255 21.6277H19.5369C20.6967 21.6277 21.6369 20.6875 21.6369 19.5277V4.45327Z"
          fill="#0A0A0A"
        />
        <path
          d="M19.5378 4.45654H4.46338V19.531H19.5378V4.45654Z"
          fill="inherit"
        />
        <path
          d="M19.5378 13.5085H4.46338V19.527H19.5378V13.5085Z"
          fill="black"
          fillOpacity="0.17"
        />
      </svg>
      <svg
        fill="background.clearGlass.4"
        x={225}
        y={149}
        width="12.05"
        height="12.05"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ lfIEcn"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.6369 4.45327C21.6369 3.29347 20.6967 2.35327 19.5369 2.35327H4.46255C3.30275 2.35327 2.36255 3.29347 2.36255 4.45327V19.5277C2.36255 20.6875 3.30275 21.6277 4.46255 21.6277H19.5369C20.6967 21.6277 21.6369 20.6875 21.6369 19.5277V4.45327Z"
          fill="#0A0A0A"
        />
        <path
          d="M19.5378 4.45654H4.46338V19.531H19.5378V4.45654Z"
          fill="inherit"
        />
        <path
          d="M19.5378 13.5085H4.46338V19.527H19.5378V13.5085Z"
          fill="black"
          fillOpacity="0.17"
        />
      </svg>
      <svg
        fill="green"
        x={204}
        y={222}
        width="12.05"
        height="12.05"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ xgmNz"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.6369 4.45327C21.6369 3.29347 20.6967 2.35327 19.5369 2.35327H4.46255C3.30275 2.35327 2.36255 3.29347 2.36255 4.45327V19.5277C2.36255 20.6875 3.30275 21.6277 4.46255 21.6277H19.5369C20.6967 21.6277 21.6369 20.6875 21.6369 19.5277V4.45327Z"
          fill="#0A0A0A"
        />
        <path
          d="M19.5378 4.45654H4.46338V19.531H19.5378V4.45654Z"
          fill="inherit"
        />
        <path
          d="M19.5378 13.5085H4.46338V19.527H19.5378V13.5085Z"
          fill="black"
          fillOpacity="0.17"
        />
      </svg>
      <svg
        fill="background.clearGlass.4"
        x={18}
        y={91}
        width="12.05"
        height="12.05"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ lfIEcn"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.6369 4.45327C21.6369 3.29347 20.6967 2.35327 19.5369 2.35327H4.46255C3.30275 2.35327 2.36255 3.29347 2.36255 4.45327V19.5277C2.36255 20.6875 3.30275 21.6277 4.46255 21.6277H19.5369C20.6967 21.6277 21.6369 20.6875 21.6369 19.5277V4.45327Z"
          fill="#0A0A0A"
        />
        <path
          d="M19.5378 4.45654H4.46338V19.531H19.5378V4.45654Z"
          fill="inherit"
        />
        <path
          d="M19.5378 13.5085H4.46338V19.527H19.5378V13.5085Z"
          fill="black"
          fillOpacity="0.17"
        />
      </svg>
      <svg
        fill="green"
        x={18}
        y={136}
        width="12.05"
        height="12.05"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ xgmNz"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.6369 4.45327C21.6369 3.29347 20.6967 2.35327 19.5369 2.35327H4.46255C3.30275 2.35327 2.36255 3.29347 2.36255 4.45327V19.5277C2.36255 20.6875 3.30275 21.6277 4.46255 21.6277H19.5369C20.6967 21.6277 21.6369 20.6875 21.6369 19.5277V4.45327Z"
          fill="#0A0A0A"
        />
        <path
          d="M19.5378 4.45654H4.46338V19.531H19.5378V4.45654Z"
          fill="inherit"
        />
        <path
          d="M19.5378 13.5085H4.46338V19.527H19.5378V13.5085Z"
          fill="black"
          fillOpacity="0.17"
        />
      </svg>
      <svg
        fill="green"
        x={13}
        y={177}
        width="12.05"
        height="12.05"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ xgmNz"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.6369 4.45327C21.6369 3.29347 20.6967 2.35327 19.5369 2.35327H4.46255C3.30275 2.35327 2.36255 3.29347 2.36255 4.45327V19.5277C2.36255 20.6875 3.30275 21.6277 4.46255 21.6277H19.5369C20.6967 21.6277 21.6369 20.6875 21.6369 19.5277V4.45327Z"
          fill="#0A0A0A"
        />
        <path
          d="M19.5378 4.45654H4.46338V19.531H19.5378V4.45654Z"
          fill="inherit"
        />
        <path
          d="M19.5378 13.5085H4.46338V19.527H19.5378V13.5085Z"
          fill="black"
          fillOpacity="0.17"
        />
      </svg>
      <svg
        fill="green"
        x={117}
        y={224}
        width="12.05"
        height="12.05"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ xgmNz"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.6369 4.45327C21.6369 3.29347 20.6967 2.35327 19.5369 2.35327H4.46255C3.30275 2.35327 2.36255 3.29347 2.36255 4.45327V19.5277C2.36255 20.6875 3.30275 21.6277 4.46255 21.6277H19.5369C20.6967 21.6277 21.6369 20.6875 21.6369 19.5277V4.45327Z"
          fill="#0A0A0A"
        />
        <path
          d="M19.5378 4.45654H4.46338V19.531H19.5378V4.45654Z"
          fill="inherit"
        />
        <path
          d="M19.5378 13.5085H4.46338V19.527H19.5378V13.5085Z"
          fill="black"
          fillOpacity="0.17"
        />
      </svg>
      <svg
        fill="green"
        x="57.2046"
        y="221.902"
        width="12.05"
        height="12.05"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ xgmNz"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.6369 4.45327C21.6369 3.29347 20.6967 2.35327 19.5369 2.35327H4.46255C3.30275 2.35327 2.36255 3.29347 2.36255 4.45327V19.5277C2.36255 20.6875 3.30275 21.6277 4.46255 21.6277H19.5369C20.6967 21.6277 21.6369 20.6875 21.6369 19.5277V4.45327Z"
          fill="#0A0A0A"
        />
        <path
          d="M19.5378 4.45654H4.46338V19.531H19.5378V4.45654Z"
          fill="inherit"
        />
        <path
          d="M19.5378 13.5085H4.46338V19.527H19.5378V13.5085Z"
          fill="black"
          fillOpacity="0.17"
        />
      </svg>
      <svg
        fill="red"
        x={225}
        y={115}
        width="12.05"
        height="12.05"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ diJJCs"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.6369 4.45327C21.6369 3.29347 20.6967 2.35327 19.5369 2.35327H4.46255C3.30275 2.35327 2.36255 3.29347 2.36255 4.45327V19.5277C2.36255 20.6875 3.30275 21.6277 4.46255 21.6277H19.5369C20.6967 21.6277 21.6369 20.6875 21.6369 19.5277V4.45327Z"
          fill="#0A0A0A"
        />
        <path
          d="M19.5378 4.45654H4.46338V19.531H19.5378V4.45654Z"
          fill="inherit"
        />
        <path
          d="M19.5378 13.5085H4.46338V19.527H19.5378V13.5085Z"
          fill="black"
          fillOpacity="0.17"
        />
      </svg>
      <svg
        fill="red"
        x={225}
        y={72}
        width="12.05"
        height="12.05"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ diJJCs"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.6369 4.45327C21.6369 3.29347 20.6967 2.35327 19.5369 2.35327H4.46255C3.30275 2.35327 2.36255 3.29347 2.36255 4.45327V19.5277C2.36255 20.6875 3.30275 21.6277 4.46255 21.6277H19.5369C20.6967 21.6277 21.6369 20.6875 21.6369 19.5277V4.45327Z"
          fill="#0A0A0A"
        />
        <path
          d="M19.5378 4.45654H4.46338V19.531H19.5378V4.45654Z"
          fill="inherit"
        />
        <path
          d="M19.5378 13.5085H4.46338V19.527H19.5378V13.5085Z"
          fill="black"
          fillOpacity="0.17"
        />
      </svg>
      <svg
        fill="background.clearGlass.4"
        x={191}
        y={59}
        width="12.05"
        height="12.05"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ lfIEcn"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.2984 0.764942C12.5364 0.164941 11.4624 0.164941 10.7004 0.764942L2.52902 7.19814C2.02322 7.59654 1.72803 8.20494 1.72803 8.84814V15.1242C1.72803 15.768 2.02322 16.3758 2.52902 16.7742L10.7004 23.2074C11.4624 23.8074 12.5364 23.8074 13.2984 23.2074L21.4704 16.7742C21.9762 16.3758 22.2714 15.768 22.2714 15.1242V8.84814C22.2714 8.20494 21.9762 7.59654 21.4704 7.19814L13.2984 0.764942ZM11.9994 2.41494L3.82803 8.84814L11.9994 2.41494Z"
          fill="#0A0A0A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0008 2.41821L20.1728 8.85165V15.1276L12.0008 21.5611L3.82886 15.1276V8.85165L12.0008 2.41821Z"
          fill="inherit"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0007 15.8109L20.1727 8.84814V15.1241L12.0007 21.5576V15.8109Z"
          fill="black"
          fillOpacity="0.68"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.82886 8.84814L12.0008 15.8109V21.5576L3.82886 15.1241V8.84814Z"
          fill="black"
          fillOpacity="0.47"
        />
      </svg>
      <svg
        fill="background.clearGlass.4"
        x={203}
        y={42}
        width="12.05"
        height="12.05"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ lfIEcn"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.2984 0.764942C12.5364 0.164941 11.4624 0.164941 10.7004 0.764942L2.52902 7.19814C2.02322 7.59654 1.72803 8.20494 1.72803 8.84814V15.1242C1.72803 15.768 2.02322 16.3758 2.52902 16.7742L10.7004 23.2074C11.4624 23.8074 12.5364 23.8074 13.2984 23.2074L21.4704 16.7742C21.9762 16.3758 22.2714 15.768 22.2714 15.1242V8.84814C22.2714 8.20494 21.9762 7.59654 21.4704 7.19814L13.2984 0.764942ZM11.9994 2.41494L3.82803 8.84814L11.9994 2.41494Z"
          fill="#0A0A0A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0008 2.41821L20.1728 8.85165V15.1276L12.0008 21.5611L3.82886 15.1276V8.85165L12.0008 2.41821Z"
          fill="inherit"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0007 15.8109L20.1727 8.84814V15.1241L12.0007 21.5576V15.8109Z"
          fill="black"
          fillOpacity="0.68"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.82886 8.84814L12.0008 15.8109V21.5576L3.82886 15.1241V8.84814Z"
          fill="black"
          fillOpacity="0.47"
        />
      </svg>
      <svg
        fill="background.clearGlass.4"
        x="209.024"
        y="48.0236"
        width="12.05"
        height="12.05"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ lfIEcn"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.2984 0.764942C12.5364 0.164941 11.4624 0.164941 10.7004 0.764942L2.52902 7.19814C2.02322 7.59654 1.72803 8.20494 1.72803 8.84814V15.1242C1.72803 15.768 2.02322 16.3758 2.52902 16.7742L10.7004 23.2074C11.4624 23.8074 12.5364 23.8074 13.2984 23.2074L21.4704 16.7742C21.9762 16.3758 22.2714 15.768 22.2714 15.1242V8.84814C22.2714 8.20494 21.9762 7.59654 21.4704 7.19814L13.2984 0.764942ZM11.9994 2.41494L3.82803 8.84814L11.9994 2.41494Z"
          fill="#0A0A0A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0008 2.41821L20.1728 8.85165V15.1276L12.0008 21.5611L3.82886 15.1276V8.85165L12.0008 2.41821Z"
          fill="inherit"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0007 15.8109L20.1727 8.84814V15.1241L12.0007 21.5576V15.8109Z"
          fill="black"
          fillOpacity="0.68"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.82886 8.84814L12.0008 15.8109V21.5576L3.82886 15.1241V8.84814Z"
          fill="black"
          fillOpacity="0.47"
        />
      </svg>
      <svg
        fill="background.clearGlass.4"
        x={162}
        y={86}
        width="12.05"
        height="12.05"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ lfIEcn"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.2984 0.764942C12.5364 0.164941 11.4624 0.164941 10.7004 0.764942L2.52902 7.19814C2.02322 7.59654 1.72803 8.20494 1.72803 8.84814V15.1242C1.72803 15.768 2.02322 16.3758 2.52902 16.7742L10.7004 23.2074C11.4624 23.8074 12.5364 23.8074 13.2984 23.2074L21.4704 16.7742C21.9762 16.3758 22.2714 15.768 22.2714 15.1242V8.84814C22.2714 8.20494 21.9762 7.59654 21.4704 7.19814L13.2984 0.764942ZM11.9994 2.41494L3.82803 8.84814L11.9994 2.41494Z"
          fill="#0A0A0A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0008 2.41821L20.1728 8.85165V15.1276L12.0008 21.5611L3.82886 15.1276V8.85165L12.0008 2.41821Z"
          fill="inherit"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0007 15.8109L20.1727 8.84814V15.1241L12.0007 21.5576V15.8109Z"
          fill="black"
          fillOpacity="0.68"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.82886 8.84814L12.0008 15.8109V21.5576L3.82886 15.1241V8.84814Z"
          fill="black"
          fillOpacity="0.47"
        />
      </svg>
      <svg
        fill="background.clearGlass.4"
        x="131.516"
        y="110.433"
        width="12.05"
        height="12.05"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ lfIEcn"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.2984 0.764942C12.5364 0.164941 11.4624 0.164941 10.7004 0.764942L2.52902 7.19814C2.02322 7.59654 1.72803 8.20494 1.72803 8.84814V15.1242C1.72803 15.768 2.02322 16.3758 2.52902 16.7742L10.7004 23.2074C11.4624 23.8074 12.5364 23.8074 13.2984 23.2074L21.4704 16.7742C21.9762 16.3758 22.2714 15.768 22.2714 15.1242V8.84814C22.2714 8.20494 21.9762 7.59654 21.4704 7.19814L13.2984 0.764942ZM11.9994 2.41494L3.82803 8.84814L11.9994 2.41494Z"
          fill="#0A0A0A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0008 2.41821L20.1728 8.85165V15.1276L12.0008 21.5611L3.82886 15.1276V8.85165L12.0008 2.41821Z"
          fill="inherit"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0007 15.8109L20.1727 8.84814V15.1241L12.0007 21.5576V15.8109Z"
          fill="black"
          fillOpacity="0.68"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.82886 8.84814L12.0008 15.8109V21.5576L3.82886 15.1241V8.84814Z"
          fill="black"
          fillOpacity="0.47"
        />
      </svg>
      <svg
        fill="background.clearGlass.4"
        x={96}
        y={144}
        width="12.05"
        height="12.05"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ lfIEcn"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.2984 0.764942C12.5364 0.164941 11.4624 0.164941 10.7004 0.764942L2.52902 7.19814C2.02322 7.59654 1.72803 8.20494 1.72803 8.84814V15.1242C1.72803 15.768 2.02322 16.3758 2.52902 16.7742L10.7004 23.2074C11.4624 23.8074 12.5364 23.8074 13.2984 23.2074L21.4704 16.7742C21.9762 16.3758 22.2714 15.768 22.2714 15.1242V8.84814C22.2714 8.20494 21.9762 7.59654 21.4704 7.19814L13.2984 0.764942ZM11.9994 2.41494L3.82803 8.84814L11.9994 2.41494Z"
          fill="#0A0A0A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0008 2.41821L20.1728 8.85165V15.1276L12.0008 21.5611L3.82886 15.1276V8.85165L12.0008 2.41821Z"
          fill="inherit"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0007 15.8109L20.1727 8.84814V15.1241L12.0007 21.5576V15.8109Z"
          fill="black"
          fillOpacity="0.68"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.82886 8.84814L12.0008 15.8109V21.5576L3.82886 15.1241V8.84814Z"
          fill="black"
          fillOpacity="0.47"
        />
      </svg>
      <svg
        fill="background.clearGlass.4"
        x={67}
        y={166}
        width="12.05"
        height="12.05"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ lfIEcn"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.2984 0.764942C12.5364 0.164941 11.4624 0.164941 10.7004 0.764942L2.52902 7.19814C2.02322 7.59654 1.72803 8.20494 1.72803 8.84814V15.1242C1.72803 15.768 2.02322 16.3758 2.52902 16.7742L10.7004 23.2074C11.4624 23.8074 12.5364 23.8074 13.2984 23.2074L21.4704 16.7742C21.9762 16.3758 22.2714 15.768 22.2714 15.1242V8.84814C22.2714 8.20494 21.9762 7.59654 21.4704 7.19814L13.2984 0.764942ZM11.9994 2.41494L3.82803 8.84814L11.9994 2.41494Z"
          fill="#0A0A0A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0008 2.41821L20.1728 8.85165V15.1276L12.0008 21.5611L3.82886 15.1276V8.85165L12.0008 2.41821Z"
          fill="inherit"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0007 15.8109L20.1727 8.84814V15.1241L12.0007 21.5576V15.8109Z"
          fill="black"
          fillOpacity="0.68"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.82886 8.84814L12.0008 15.8109V21.5576L3.82886 15.1241V8.84814Z"
          fill="black"
          fillOpacity="0.47"
        />
      </svg>
      <svg
        fill="green"
        x={45}
        y={188}
        width="12.05"
        height="12.05"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ xgmNz"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.2984 0.764942C12.5364 0.164941 11.4624 0.164941 10.7004 0.764942L2.52902 7.19814C2.02322 7.59654 1.72803 8.20494 1.72803 8.84814V15.1242C1.72803 15.768 2.02322 16.3758 2.52902 16.7742L10.7004 23.2074C11.4624 23.8074 12.5364 23.8074 13.2984 23.2074L21.4704 16.7742C21.9762 16.3758 22.2714 15.768 22.2714 15.1242V8.84814C22.2714 8.20494 21.9762 7.59654 21.4704 7.19814L13.2984 0.764942ZM11.9994 2.41494L3.82803 8.84814L11.9994 2.41494Z"
          fill="#0A0A0A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0008 2.41821L20.1728 8.85165V15.1276L12.0008 21.5611L3.82886 15.1276V8.85165L12.0008 2.41821Z"
          fill="inherit"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0007 15.8109L20.1727 8.84814V15.1241L12.0007 21.5576V15.8109Z"
          fill="black"
          fillOpacity="0.68"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.82886 8.84814L12.0008 15.8109V21.5576L3.82886 15.1241V8.84814Z"
          fill="black"
          fillOpacity="0.47"
        />
      </svg>
      <svg
        fill="green"
        x={27}
        y={201}
        width="12.05"
        height="12.05"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ xgmNz"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.2984 0.764942C12.5364 0.164941 11.4624 0.164941 10.7004 0.764942L2.52902 7.19814C2.02322 7.59654 1.72803 8.20494 1.72803 8.84814V15.1242C1.72803 15.768 2.02322 16.3758 2.52902 16.7742L10.7004 23.2074C11.4624 23.8074 12.5364 23.8074 13.2984 23.2074L21.4704 16.7742C21.9762 16.3758 22.2714 15.768 22.2714 15.1242V8.84814C22.2714 8.20494 21.9762 7.59654 21.4704 7.19814L13.2984 0.764942ZM11.9994 2.41494L3.82803 8.84814L11.9994 2.41494Z"
          fill="#0A0A0A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0008 2.41821L20.1728 8.85165V15.1276L12.0008 21.5611L3.82886 15.1276V8.85165L12.0008 2.41821Z"
          fill="inherit"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0007 15.8109L20.1727 8.84814V15.1241L12.0007 21.5576V15.8109Z"
          fill="black"
          fillOpacity="0.68"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.82886 8.84814L12.0008 15.8109V21.5576L3.82886 15.1241V8.84814Z"
          fill="black"
          fillOpacity="0.47"
        />
      </svg>
      <svg
        fill="green"
        x="33.0234"
        y="207.024"
        width="12.05"
        height="12.05"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ xgmNz"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.2984 0.764942C12.5364 0.164941 11.4624 0.164941 10.7004 0.764942L2.52902 7.19814C2.02322 7.59654 1.72803 8.20494 1.72803 8.84814V15.1242C1.72803 15.768 2.02322 16.3758 2.52902 16.7742L10.7004 23.2074C11.4624 23.8074 12.5364 23.8074 13.2984 23.2074L21.4704 16.7742C21.9762 16.3758 22.2714 15.768 22.2714 15.1242V8.84814C22.2714 8.20494 21.9762 7.59654 21.4704 7.19814L13.2984 0.764942ZM11.9994 2.41494L3.82803 8.84814L11.9994 2.41494Z"
          fill="#0A0A0A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0008 2.41821L20.1728 8.85165V15.1276L12.0008 21.5611L3.82886 15.1276V8.85165L12.0008 2.41821Z"
          fill="inherit"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0007 15.8109L20.1727 8.84814V15.1241L12.0007 21.5576V15.8109Z"
          fill="black"
          fillOpacity="0.68"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.82886 8.84814L12.0008 15.8109V21.5576L3.82886 15.1241V8.84814Z"
          fill="black"
          fillOpacity="0.47"
        />
      </svg>
      <svg
        fill="green"
        x={23}
        y={207}
        width="16.06"
        height="16.06"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ xgmNz"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.90865 5.41854L11.1278 1.19874C11.522 0.805137 12.056 0.58374 12.6128 0.58374H13.6556C14.8154 0.58374 15.7556 1.52394 15.7556 2.68374V4.56654H16.5092C17.066 4.56654 17.6 4.78794 17.9942 5.18154L19.3958 6.58374C19.79 6.97734 20.0108 7.51194 20.0108 8.06874V8.98134C20.7044 9.32394 21.1814 10.0379 21.1814 10.8641V15.8868C21.1814 16.4436 20.96 16.9776 20.5664 17.3718L15.1406 22.797C14.7362 23.2014 14.1848 23.4234 13.6136 23.412L11.2118 23.364C10.6694 23.3532 10.1522 23.1324 9.76885 22.749L3.58885 16.5689C3.19465 16.1747 2.97325 15.6408 2.97325 15.084V13.5593C2.97325 13.0025 3.19465 12.4685 3.58885 12.0749L3.92545 11.7378L3.43165 11.2445C3.03805 10.8509 2.81665 10.3163 2.81665 9.75954V8.82295C2.81665 8.26555 3.03805 7.73154 3.43165 7.33794L4.73665 6.03354C5.13025 5.63934 5.66425 5.41854 6.22105 5.41854H6.90865Z"
          fill="#0A0A0A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.2547 21.2678L13.6565 21.3158L19.0823 15.89V10.8674H18.6575L17.9117 11.6132L17.1665 10.8674L17.9117 10.1216V8.07202L16.5101 6.66981H15.5855L14.1839 8.07202L13.6565 8.04922V2.68701H12.6137L7.77948 7.52181H6.22188L4.91748 8.82622V9.76282L6.32928 11.1746V12.308L5.07408 13.5632V15.0872L11.2547 21.2678Z"
          fill="inherit"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.49348 13.1438L6.32928 12.308V11.1746L4.91748 9.76281V8.82621L6.32928 9.43341L7.28508 10.1216L7.98708 11.1746L8.65548 10.4642L8.99508 8.43261L13.6565 2.68701V8.04921L14.1839 8.07201L15.5855 6.66981H16.5101L17.9117 8.07201V10.1216L17.1659 10.8674L17.9117 11.6132L18.6575 10.8674H19.0817V15.89L13.6565 21.3158L11.2547 21.2678L5.07408 15.0872V13.979L6.32928 14.1686L7.98708 14.7836L7.77408 12.7832L6.65268 12.9812L5.49348 13.1438ZM13.6013 14.7836L10.5827 12.9812L9.53208 14.3672V15.5534L10.5827 17.0252L13.6013 14.7836Z"
          fill="black"
          fillOpacity="0.27"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.6267 16.2352L14.9783 13.867L17.6567 12.3736L18.6569 11.998H19.0811V15.8866L13.6559 21.3124L11.5661 21.2704L9.53149 18.5056L10.2041 16.492L10.5821 17.0218L12.7859 19.975H13.0775L14.6267 16.2352ZM11.9993 13.4062L10.5821 11.998V9.75943L13.6559 6.36523V8.04583L13.0775 10.1182L15.1973 9.75943L17.3645 7.52203L17.9111 8.06863V10.1182L17.1653 10.864L14.9783 12.3736L14.6363 11.6098H13.6559L11.9993 13.4062Z"
          fill="black"
          fillOpacity="0.28"
        />
      </svg>
      <svg
        fill="background.clearGlass.4"
        x={211}
        y={36}
        width="16.06"
        height="16.06"
        viewBox="0 0 24 24"
        className="sc-bdfBwQ lfIEcn"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.90865 5.41854L11.1278 1.19874C11.522 0.805137 12.056 0.58374 12.6128 0.58374H13.6556C14.8154 0.58374 15.7556 1.52394 15.7556 2.68374V4.56654H16.5092C17.066 4.56654 17.6 4.78794 17.9942 5.18154L19.3958 6.58374C19.79 6.97734 20.0108 7.51194 20.0108 8.06874V8.98134C20.7044 9.32394 21.1814 10.0379 21.1814 10.8641V15.8868C21.1814 16.4436 20.96 16.9776 20.5664 17.3718L15.1406 22.797C14.7362 23.2014 14.1848 23.4234 13.6136 23.412L11.2118 23.364C10.6694 23.3532 10.1522 23.1324 9.76885 22.749L3.58885 16.5689C3.19465 16.1747 2.97325 15.6408 2.97325 15.084V13.5593C2.97325 13.0025 3.19465 12.4685 3.58885 12.0749L3.92545 11.7378L3.43165 11.2445C3.03805 10.8509 2.81665 10.3163 2.81665 9.75954V8.82295C2.81665 8.26555 3.03805 7.73154 3.43165 7.33794L4.73665 6.03354C5.13025 5.63934 5.66425 5.41854 6.22105 5.41854H6.90865Z"
          fill="#0A0A0A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.2547 21.2678L13.6565 21.3158L19.0823 15.89V10.8674H18.6575L17.9117 11.6132L17.1665 10.8674L17.9117 10.1216V8.07202L16.5101 6.66981H15.5855L14.1839 8.07202L13.6565 8.04922V2.68701H12.6137L7.77948 7.52181H6.22188L4.91748 8.82622V9.76282L6.32928 11.1746V12.308L5.07408 13.5632V15.0872L11.2547 21.2678Z"
          fill="inherit"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.49348 13.1438L6.32928 12.308V11.1746L4.91748 9.76281V8.82621L6.32928 9.43341L7.28508 10.1216L7.98708 11.1746L8.65548 10.4642L8.99508 8.43261L13.6565 2.68701V8.04921L14.1839 8.07201L15.5855 6.66981H16.5101L17.9117 8.07201V10.1216L17.1659 10.8674L17.9117 11.6132L18.6575 10.8674H19.0817V15.89L13.6565 21.3158L11.2547 21.2678L5.07408 15.0872V13.979L6.32928 14.1686L7.98708 14.7836L7.77408 12.7832L6.65268 12.9812L5.49348 13.1438ZM13.6013 14.7836L10.5827 12.9812L9.53208 14.3672V15.5534L10.5827 17.0252L13.6013 14.7836Z"
          fill="black"
          fillOpacity="0.27"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.6267 16.2352L14.9783 13.867L17.6567 12.3736L18.6569 11.998H19.0811V15.8866L13.6559 21.3124L11.5661 21.2704L9.53149 18.5056L10.2041 16.492L10.5821 17.0218L12.7859 19.975H13.0775L14.6267 16.2352ZM11.9993 13.4062L10.5821 11.998V9.75943L13.6559 6.36523V8.04583L13.0775 10.1182L15.1973 9.75943L17.3645 7.52203L17.9111 8.06863V10.1182L17.1653 10.864L14.9783 12.3736L14.6363 11.6098H13.6559L11.9993 13.4062Z"
          fill="black"
          fillOpacity="0.28"
        />
      </svg>
    </svg>
  );
};

export default Map;
