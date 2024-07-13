import React from "react";
import { FaTasks } from "react-icons/fa";
import { getServerSession } from "next-auth";
import { getAllusers } from "./alltask/page";

const Page = async () => {
  const session = await getServerSession();
  const allusers = await getAllusers();
  const userEmail = session?.user?.email;
  const currentUser = allusers.find((user) => {
    return user.email === userEmail;
  });
  const currentUserTaskCompletedCount = currentUser?.taskCompletedCount;

  return (
    <div className="flex flex-col pt-40 items-center justify-center">
      <div className="text-4xl flex ">
        <h1 className="font-bold mr-3">
          {session ? session?.user?.name : "みんな"}のタスク管理
        </h1>
        <FaTasks />
      </div>
      {session ? (
        <div className="text-2xl flex flex-col mt-80 items-center outline-dashed outline-2 outline-offset-2 rounded-lg p-4">
          <h2 className="font-semibold text-gray-700 ">
            達成した総タスク数: {currentUserTaskCompletedCount}
          </h2>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Page;
