import React from "react";
import { FaTasks } from "react-icons/fa";

const page = () => {
  return (
    <div className="flex flex-col pt-40 items-center justify-center">
      <div className="text-4xl flex ">
        <h1 className="font-bold mr-3">みんなのタスク管理</h1>
        <FaTasks />
      </div>

      <div></div>
    </div>
  );
};

export default page;
