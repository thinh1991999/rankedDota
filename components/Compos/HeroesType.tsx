import React from "react";
import findIndex from "lodash/findIndex";
import MyImage from "../MyImage";
import { Hero } from "../../interfaces/heroes";
import { getImgStratsDota } from "../../share";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { addDire, addRadiant } from "../../store/Slices/composSlice";

const HeroesType = ({
  data,
  searchValue = "",
  img,
  title,
}: {
  data: Hero[];
  searchValue?: string;
  img: string;
  title: string;
}) => {
  const dispatch = useAppDispatch();
  const radiants = useAppSelector((state) => state.compos.radiants);
  const dires = useAppSelector((state) => state.compos.dires);
  const addRadiantSearch = (hero: Hero) => {
    const checked = findIndex(radiants, (heroo) => heroo.id === hero.id);
    radiants.length < 5 && checked === -1 && dispatch(addRadiant(hero));
  };

  const addDireSearch = (hero: Hero) => {
    const checked = findIndex(radiants, (heroo) => heroo.id === hero.id);
    dires.length < 5 && checked === -1 && dispatch(addDire(hero));
  };

  return (
    <section>
      <div className="flex items-center">
        <MyImage src={img} alt="int" width="15px" height="15px" />
        <h6 className="ml-2 text-textPrimary-light dark:text-textPrimary-dark">
          {title}
        </h6>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,50px)] gap-2 mt-3 mx-auto">
        {data.map((item) => {
          const { displayName, id, shortName, name } = item;
          let checkPicked = false;
          const radiantCheck = findIndex(radiants, (heroo) => heroo.id === id);
          if (radiantCheck !== -1) {
            checkPicked = true;
          } else {
            const direCheck = findIndex(dires, (heroo) => heroo.id === id);
            direCheck === -1 ? (checkPicked = false) : (checkPicked = true);
          }
          let checkSearch = displayName
            .toLowerCase()
            .includes(searchValue.toLowerCase());
          return (
            <div
              key={id}
              className={`
              ${
                checkPicked || !checkSearch
                  ? ""
                  : "md:hover:scale-[1.8] cursor-pointer hover:z-10"
              }
              block group relative transition-all ease-linear duration-[0.2s]`}
            >
              <div className="">
                <MyImage
                  src={getImgStratsDota(`/heroes/${shortName}_vert.png`)}
                  width="50px"
                  height="60px"
                  alt={name}
                  borderRadius={6}
                />
              </div>
              {!checkPicked && checkSearch && (
                <div className="flex md:group-hover:flex md:hidden absolute top-0 left-0 bottom-0 right-0 rounded-md overflow-hidden text-white">
                  <div
                    onClick={() => {
                      addRadiantSearch(item);
                    }}
                    className="relative flex justify-center items-center w-1/2 h-full "
                  >
                    A
                    <div className="absolute top-0 left-0 bottom-0 right-0 hover:bg-blue-500 opacity-25"></div>
                  </div>
                  <div
                    onClick={() => {
                      addDireSearch(item);
                    }}
                    className="relative flex justify-center items-center w-1/2 h-full  "
                  >
                    B
                    <div className="absolute top-0 left-0 bottom-0 right-0 hover:bg-red-500 opacity-25"></div>
                  </div>
                </div>
              )}
              {(!checkSearch || checkPicked) && (
                <div className="absolute top-0 left-0 bottom-0 right-0 z-[5] rounded-[5px] bg-black opacity-80"></div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HeroesType;
