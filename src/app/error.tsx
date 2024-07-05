"use client";
import Link from "next/link";
import React from "react";
import { CgHome } from "react-icons/cg";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-44 bg-slate-300">
      <h1 className="font-bold text-8xl pb-4">Error</h1>
      <p className="text-2xl pb-20">Unexpexted Error Occured</p>
      <div className="flex text-blue-500 hover:underline">
        <CgHome className="" />
        <Link href="/" className="pl-1">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
