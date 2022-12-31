import React from "react";
import { RingLoader } from "react-spinners";
import { useGetStylesTheme } from "../share/customHooks";

const PageLoading = () => {
  const { styles } = useGetStylesTheme();
  return (
    <div className="flex justify-center items-center h-screen">
      <RingLoader color={styles.loading} size={40} />
    </div>
  );
};

export default PageLoading;
