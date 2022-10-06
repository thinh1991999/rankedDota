import React from "react";

const Header = () => {
  return (
    <section className="">
      <ul className="flex justify-start font-bold py-3 bg-layerStrong-dark rounded-md">
        <li className="mx-2 w-[16px] flex justify-center"></li>
        <li className="mx-2 w-[70px] flex justify-center">Hero</li>
        <li className="mx-2 w-[130px]">Player</li>
        <li className="mx-2 w-[24px] flex justify-center"></li>
        <li className="mx-2 w-[88px] flex justify-center">
          K <span>/</span> D <span>/</span> A
        </li>
        <li className="mx-2 flex-1 flex justify-center">NW</li>
        <li className="mx-2 flex-1 flex justify-center">IMP</li>
        <li className="mx-2 w-[80px] flex justify-center">
          LH <span>/</span> DN
        </li>
        <li className="mx-2 w-[90px] flex justify-center">
          GPM <span>/</span> XPM
        </li>
        <li className="mx-2 w-[45px] flex justify-center">HD</li>
        <li className="mx-2 w-[45px] flex justify-center">TD</li>
        <li className="mx-2 w-[45px] flex justify-center">HH</li>
        <li className="mx-2 w-[140px] flex justify-center">Inventory</li>
      </ul>
    </section>
  );
};

export default Header;
