import React from "react";
import { ReactElement } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({
  children,
  show,
  toggle,
}: {
  children?: ReactElement;
  show: boolean;
  toggle: any;
}) => {
  if (!show) return <></>;
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-50 ">
      <div className="w-full h-full relative flex justify-center items-center ">
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-black opacity-30"></div>
        <div className="max-h-full relative px-4 py-2 bg-black rounded-md flex flex-col">
          <div className="flex justify-end py-2">
            <button
              className="text-xl hover:opacity-50 text-textMain-dark"
              onClick={() => toggle()}
            >
              <AiOutlineClose />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto text-textSecondPrimary-dark">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
