import Image from "next/image";
import React from "react";

const myLoader = ({ src }: { src: string }) => {
  return src;
};

function MyImage({
  src,
  height = "500px",
  width = "200px",
  alt,
  borderRadius = 0,
}: {
  src: string;
  width?: string;
  height?: string;
  alt: string;
  borderRadius?: number;
}) {
  return (
    <div
      style={{
        width: `${width}`,
        height: `${height}`,
        borderRadius: `${borderRadius}px`,
      }}
      className="text-[0px] relative flex items-center justify-center"
    >
      <Image
        loader={myLoader}
        layout="fill"
        src={src}
        alt={alt}
        objectFit="cover"
        style={{
          borderRadius: `${borderRadius}px`,
        }}
      />
    </div>
  );
}

export default MyImage;
