import React from "react";
import { PiClockBold } from "react-icons/pi";

const ComingSoon = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-40 ">
      <div className="font-bold text-8xl border-4 rounded-full border-gray-700 flex">
        <h1 className="pt-10 pl-10 pb-10 font-gothic">Coming Soon...</h1>
        <PiClockBold className="pt-10" />
      </div>
    </div>
  );
};

export default ComingSoon;
