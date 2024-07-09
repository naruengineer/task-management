import TaskCard from "@/components/TaskCard/TaskCard";
import { TaskDocument } from "@/models/task";
import Link from "next/link";
import { MdAddTask } from "react-icons/md";
import { UserModel } from "@/models/user";
import { getServerSession } from "next-auth";

const getAlltasks = async (): Promise<TaskDocument[]> => {
  const response = await fetch(`${process.env.API_URL}/tasks`, {
    cache: "no-store",
  });
  if (response.status !== 200) {
    throw new Error();
  }
  const data = await response.json();
  return data.task as TaskDocument[];
};

export default async function MainPage() {
  const allTasks = await getAlltasks();
  const session = await getServerSession();
  const userEmail = session?.user?.email; //ログインユーザーのメールアドレス
  const user = await UserModel.findOne({ email: userEmail }); // 上記を利用してユーザーのObjectIdを取得
  const userId = user._id.toString(); //ObjectId を挿入
  console.log(userId);
  console.log(allTasks);

  const sortedUserTasks = allTasks.filter((task) => {
    return task.user === userId;
  });
  console.log(sortedUserTasks);

  const sortedTasks = sortedUserTasks.sort((a: any, b: any) => {
    if (a.isCompleted === b.isCompleted) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return a.isCompleted ? 1 : -1;
  });

  return (
    <div className="p-8 h-full overflow-y-auto pb-24 bg-gray-400">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">All tasks</h1>
        <Link
          href="/new"
          className="flex items-center gap-1 font-semibold border px-4 py-2 rounded-full shadow-sm text-white bg-gray-800 hover :bg-gray-700"
        >
          <MdAddTask className="size-5" />
          <div>Add Task</div>
        </Link>
      </header>
      <div className="mt-8 flex flex-wrap gap-4">
        {sortedTasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}