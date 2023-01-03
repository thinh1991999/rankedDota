import React from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { useAppSelector } from "../store/hook";
import ToolTip from "./ToolTip";

export default function Footer({ handleScrollTop }: { handleScrollTop: any }) {
  const showScrollTop = useAppSelector(
    (state) => state.globalData.showScrollTop
  );
  return (
    <>
      <footer
        className={` bg-component-light text-textMain-light dark:bg-component-dark dark:text-textMain-dark py-2 text-xs`}
      >
        <p className="text-center">
          Dota 2, and the Dota 2 logo are registered trademarks{" "}
          <a href="https://www.valvesoftware.com/en/" className="underline">
            of Valve Corporation.
          </a>
        </p>
        <p className="text-center">
          This site{" "}
          <a
            href="https://www.opendota.com/"
            target={"_blank"}
            rel="noreferrer"
          >
            usesOpenDota&Apos;s API
          </a>
        </p>
        {showScrollTop && (
          <ToolTip
            target={
              <button
                className="fixed bottom-5 right-5 bg-black dark:bg-white dark:text-black text-white p-3 text-xl rounded-md hover:opacity-50"
                onClick={handleScrollTop}
              >
                <AiOutlineArrowUp />
              </button>
            }
            tooltip={<div>Scroll To Top</div>}
            id="scroll-top-1999"
          />
        )}
      </footer>
    </>
  );
}
