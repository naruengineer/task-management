import React from "react";
import { FaTasks } from "react-icons/fa";
import { getServerSession } from "next-auth";
import { getAllusers } from "@/components/GetDocuments/GetAllusers";
import { getAlltasks } from "@/components/GetDocuments/GetAlltasks";
import Overdue from "@/components/Button/Overdue";

const Page = async () => {
  const session = await getServerSession();
  const allusers = await getAllusers();
  const allTasks = await getAlltasks();
  //ログインユーザのメールアドレス取得
  const userEmail = session?.user?.email;
  //ログインユーザーの情報を取得
  const currentUser = allusers.find((user) => {
    return user.email === userEmail;
  });
  //ログインユーザーのタスク完了数を定義
  const currentUserTaskCompletedCount = currentUser?.taskCompletedCount;
  //ログインユーザーのID取得
  const userId = currentUser?._id;
  //ログインユーザーのタスクを取得
  const sortedUserTasks = allTasks.filter((task) => {
    return task.user === userId;
  });

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayDateString = yesterday.toISOString().split("T")[0];
  //昨日以前のタスクの中で完了していないタスクを抽出
  const OverdueTasks = sortedUserTasks.filter((task) => {
    return task.dueDate <= yesterdayDateString && !task.isCompleted;
  });

  return (
    <div>
      <div className="flex justify-end pr-4 pt-2">
        {OverdueTasks.length > 0 && <Overdue />}
      </div>
      <div className="flex flex-col pt-24 items-center justify-center">
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
    </div>
  );
};

export default Page;
