"use client";

import React from "react";
import { FaTasks } from "react-icons/fa";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-col pt-40 items-center justify-center">
      <div className="text-4xl flex ">
        <h1 className="font-bold mr-3">
          {session ? session?.user?.name : "みんな"}のタスク管理
        </h1>
        <FaTasks />
      </div>

      <div></div>
    </div>
  );
};

export default Page;
