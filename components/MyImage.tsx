import Image from "next/image";
import React from "react";

const myLoader = ({ src }: { src: string }) => {
  return src;
};

function MyImage({
  src,
  height = 500,
  width = 200,
  alt,
  borderRadius = 0,
}: {
  src: string;
  width?: number;
  height?: number;
  alt: string;
  borderRadius?: number;
}) {
  return (
    <Image
      loader={myLoader}
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{
        borderRadius: `${borderRadius}px`,
      }}
    />
  );
}

export default MyImage;
