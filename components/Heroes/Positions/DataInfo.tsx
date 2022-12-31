import React from "react";
import Content from "./Content";
import Header from "./Header";
import { useAppSelector } from "../../../store/hook";
import { CircleLoader } from "react-spinners";
import ErrorMess from "../../ErrorMess";

const DataInfo = () => {
  const loading = useAppSelector((state) => state.heroesPositions.loading);
  const errMess = useAppSelector((state) => state.heroesPositions.errMess);

  return (
    <div className=" overflow-x-scroll">
      <Header />
      {loading ? (
        <div className="flex justify-center py-10">
          <CircleLoader color="#fff" size={30} className="ml-3" />
        </div>
      ) : errMess ? (
        <ErrorMess errMess={errMess} />
      ) : (
        <Content />
      )}
    </div>
  );
};

export default DataInfo;
