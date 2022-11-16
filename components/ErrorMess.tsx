import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";

function ErrorMess({ errMess }: { errMess: string }) {
  return (
    <div className="p-2 bg-red-800 rounded-md flex items-center">
      <RiErrorWarningLine className="text-2xl text-red-400 mr-2" />
      <div className="">
        <h6 className="text-textSecondPrimary-dark font-bold">
          Something went wrong!
        </h6>
        <p>{errMess}</p>
      </div>
    </div>
  );
}

export default ErrorMess;
