import React from "react";
import { RingLoader } from "react-spinners";
import { useGetStylesTheme } from "../share/customHooks";

const PageLoading = () => {
  const { styles } = useGetStylesTheme();
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0">
      <div className="w-full h-full relative">
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-black opacity-50"></div>
        <div className="relative w-full h-full flex items-center justify-center">
          <RingLoader color={styles.loading} size={40} />
        </div>
      </div>
    </div>
  );
};

export default PageLoading;
