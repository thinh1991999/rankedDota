import React from "react";
import { useAppSelector } from "../store";

export default function Footer() {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <footer className={`${theme.footer} ${theme.text.main} py-2 text-xs`}>
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
