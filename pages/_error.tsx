import Head from "next/head";
import Link from "next/link";
import React from "react";
import type { NextPageWithLayout } from "./_app";

const Error: NextPageWithLayout<{ statusCode?: number }> = ({ statusCode }) => {
  return (
    <div className="">
      <Head>
        <title>Error</title>
      </Head>
      <div className="flex justify-center items-center flex-col h-screen w-screen">
        <span className="text-2xl font-bold text-red-500">Error</span>
        <h6 className="text-xl font-bold">
          {statusCode
            ? `Could not load your data: Status Code ${statusCode}`
            : "This page could not be found."}
        </h6>
        <Link href={"/"}>
          <a className="p-3 rounded-md bg-button-light text-lg mt-3 hover:opacity-75 text-textSecondPrimary-dark">
            Home Page
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Error;
