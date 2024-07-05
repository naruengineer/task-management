import React from "react";
import Link from "next/link";
import { CgHome } from "react-icons/cg";

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-44 bg-slate-300">
      <h1 className="font-bold text-4xl pb-4">404</h1>
      <p className="text-xl pb-20">Page Not Found</p>
      <div className="flex text-blue-500 hover:underline">
        <CgHome className="" />
        <Link href="/" className="pl-1">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
