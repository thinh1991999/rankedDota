import React from "react";

export default function Footer() {
  return (
    <footer
      className={`bg-component-light text-textMain-light dark:bg-component-dark dark:text-textMain-dark py-2 text-xs`}
    >
      <p className="text-center">
        Dota 2, and the Dota 2 logo are registered trademarks{" "}
        <a href="https://www.valvesoftware.com/en/" className="underline">
          of Valve Corporation.
        </a>
      </p>
      <p className="text-center">
        This site{" "}
        <a href="https://www.opendota.com/">usesOpenDota&Apos;s API</a>
      </p>
    </footer>
  );
}
