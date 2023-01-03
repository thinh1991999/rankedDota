import React from "react";
import { MoonLoader, RingLoader } from "react-spinners";
import { useGetStylesTheme } from "../share/customHooks";

const OptionLoading = () => {
  const { styles } = useGetStylesTheme();
  return (
    <div className="py-10 flex justify-center items-center">
      <MoonLoader color={styles.loading} size={40} />
    </div>
  );
};

export default OptionLoading;
