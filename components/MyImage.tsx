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
  width?: number | string;
  height?: number | string;
  alt: string;
  borderRadius?: number;
}) {
  return (
    <div className="text-[0px]">
      <Image
        loader={myLoader}
        src={src}
        alt={alt}
        width={width}
        height={height}
        objectFit="cover"
        style={{
          borderRadius: `${borderRadius}px`,
        }}
      />
    </div>
  );
}

export default MyImage;
