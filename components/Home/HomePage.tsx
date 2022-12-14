import Link from "next/link";
import React from "react";
import { homeCards } from "../../share";
import SearchID from "../SearchID";

function HomePage() {
  return (
    <section className="">
      <div className="h-[600px] relative">
        <div
          className={`absolute top-0 left-0 bottom-0 right-0  bg-center bg-cover`}
          style={{
            backgroundImage: `url(/homeBanner.jpg)`,
          }}
        ></div>
        <div className="absolute top-0 left-0 bottom-0 right-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-3xl lg:text-5xl font-bold uppercase">
            RankedDota
          </h1>
          <h6 className="my-3">Search by Match ID</h6>
          <SearchID />
        </div>
      </div>
      <div className="py-10 ">
        <div className="flex justify-between items-center mb-3">
          <div className="h-[1px] bg-neutral flex-1"></div>
          <div className="mx-5 text-xl uppercase font-bold">Category</div>
          <div className="h-[1px] bg-neutral flex-1"></div>
        </div>
        <div className="container m-auto ">
          <div className="flex flex-wrap -ml-2 -mr-2 justify-center ">
            {homeCards.map((card: any, index: number) => {
              const { name, img, link = "/" } = card;
              return (
                <div
                  key={index}
                  className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-2 h-[200px]"
                >
                  <Link href={link}>
                    <a className="relative overflow-hidden hover:-translate-y-[10px] transition-all duration-[0.3s] h-full rounded-md cursor-pointer text-white bg-neutral flex items-center justify-center">
                      <div
                        className="absolute top-0 left-0 bottom-0 right-0 bg-cover bg-center grayscale-[0.5]"
                        style={{
                          backgroundImage: `url(${img})`,
                        }}
                      ></div>
                      <h6 className="text-center uppercase font-bold text-xl relative">
                        {name}
                      </h6>
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
