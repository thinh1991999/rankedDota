import React from "react";
import { RingLoader } from "react-spinners";

const PageLoading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <RingLoader color="#fff" size={40} />
    </div>
  );
};

export default PageLoading;
