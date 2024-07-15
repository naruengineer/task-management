import TaskCard from "@/components/TaskCard/TaskCard";
import { TaskDocument } from "@/models/task";
import Link from "next/link";
import { MdAddTask } from "react-icons/md";
import { getServerSession } from "next-auth";
import { UserDocument } from "../../../models/user";

const getAlltasks = async (): Promise<TaskDocument[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
    cache: "no-store",
  });
  if (response.status !== 200) {
    throw new Error("問題発生");
  }
  const data = await response.json();
  return data.task as TaskDocument[];
};

export const getAllusers = async (): Promise<UserDocument[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    cache: "no-store",
  });
  if (response.status !== 200) {
    throw new Error("問題発生");
  }
  const data = await response.json();
  console.log(data);
  return data.user as UserDocument[];
};

export default async function MainPage() {
  const allTasks = await getAlltasks();
  const allusers = await getAllusers();
  const session = await getServerSession();
  console.log(allTasks);
  console.log(allusers);
  console.log(session);
  const userEmail = session?.user?.email;
  console.log(userEmail); //　←　ログイン中のユーザーのアドレス
  const currentUser = allusers.find((user) => {
    return user.email === userEmail;
  });
  const userId = currentUser?._id;
  console.log(userId);

  //ログインしているユーザーのタスクのみを取得
  const sortedUserTasks = allTasks.filter((task) => {
    return task.user === userId;
  });
  console.log(sortedUserTasks);

  //完了順に並び替え＋日付順に並び替え
  const sortedTasks = sortedUserTasks.sort((a: any, b: any) => {
    if (a.isCompleted === b.isCompleted) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return a.isCompleted ? 1 : -1;
  });

  //昨日の日付を定義
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayDateString = yesterday.toISOString().split("T")[0];
  //昨日以前のタスクの中で完了していないタスクを抽出
  const yesterdayIncompletedTasks = sortedUserTasks.filter((task) => {
    return task.dueDate <= yesterdayDateString && !task.isCompleted;
  });

  //今日の日付を定義
  const today = new Date();
  const todayDateString = today.toISOString().split("T")[0];
  //今日のタスクを抽出
  const todayTasks = sortedUserTasks.filter((task) => {
    return task.dueDate === todayDateString;
  });

  //明日の日付を定義
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDateString = tomorrow.toISOString().split("T")[0];
  //明日のタスクを抽出
  const tomorrowTasks = sortedUserTasks.filter((task) => {
    return task.dueDate === tomorrowDateString && !task.isCompleted;
  });

  //明後日の日付を定義
  const theDayAfterTomorrow = new Date();
  theDayAfterTomorrow.setDate(theDayAfterTomorrow.getDate() + 2);
  const theDayAfterTomorrowDateString = theDayAfterTomorrow
    .toISOString()
    .split("T")[0];
  //明後日以降のタスクを抽出
  const theDayAfterTomorrowTasks = sortedUserTasks.filter((task) => {
    return task.dueDate >= theDayAfterTomorrowDateString && !task.isCompleted;
  });

  return (
    <div className="p-8 h-full overflow-y-auto pb-24 bg-gray-400">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center border-b-2 border-gray-800">
          All tasks
        </h1>
        <Link
          href="/new"
          className="flex items-center gap-1 font-semibold border px-4 py-2 rounded-full shadow-sm text-white bg-gray-800 hover :bg-gray-700"
        >
          <MdAddTask className="size-5" />
          <div>Add Task</div>
        </Link>
      </header>
      <div className="flex h-200vh">
        <div className="flex-1 border-r-2 border-black pr-1">
          <p className="text-red-500">Not achieved yesterday</p>
          <div className="mt-8 flex flex-wrap gap-4">
            {yesterdayIncompletedTasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        </div>
        <div className="flex-1 border-r-2 border-black pr-1 ml-1">
          <p className="">Today</p>
          <div className="mt-8 flex flex-wrap gap-4">
            {todayTasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        </div>
        <div className="flex-1 border-r-2 border-black pr-1 ml-1">
          <p>Tomorrow</p>
          <div className="mt-8 flex flex-wrap gap-4">
            {tomorrowTasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        </div>
        <div className="flex-1 border-r-2 border-black pr-1 ml-1">
          <p>The day after tomorrow</p>
          <div className="mt-8 flex flex-wrap gap-4">
            {theDayAfterTomorrowTasks.slice(0, 5).map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
