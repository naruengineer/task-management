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
      <div className="text-4xl flex animate-bounce-in-top">
        <h1 className="font-bold mr-3 ">{session?.user?.name}のタスク管理</h1>
        <FaTasks />
      </div>
      <div className="pt-20">
        {session && session.user?.image && (
          <img
            src={session.user.image}
            alt="User Image"
            width={200}
            height={200}
            className="rounded-full animate-roll-in-left"
          />
        )}
      </div>
      {session ? (
        <div className="text-2xl flex flex-col mt-40 items-center outline-dashed outline-2 outline-offset-2 rounded-lg p-4">
          <h2 className="font-semibold text-gray-700 animate-fade-in-fwd-0">
            達成したタスク数: {currentUserTaskCompletedCount}
          </h2>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Page;
