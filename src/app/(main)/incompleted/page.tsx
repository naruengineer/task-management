import TaskCard from "@/components/TaskCard/TaskCard";
import { TaskDocument } from "@/models/task";
import { getServerSession } from "next-auth";
import { UserDocument } from "@/models/user";
import Link from "next/link";
import { MdAddTask } from "react-icons/md";

const getIncompletedtasks = async (): Promise<TaskDocument[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/incompleted`,
    {
      cache: "no-store",
    }
  );
  if (response.status !== 200) {
    throw new Error();
  }
  const data = await response.json();
  return data.task as TaskDocument[];
};

const getAllusers = async (): Promise<UserDocument[]> => {
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

const IncompletedTaskpage = async () => {
  const incompletedTasks = await getIncompletedtasks();
  const allusers = await getAllusers();
  const session = await getServerSession();
  console.log(incompletedTasks);
  console.log(allusers);
  console.log(session);
  const userEmail = session?.user?.email;
  console.log(userEmail); //　←　ログイン中のユーザーのアドレス
  const currentUser = allusers.find((user) => {
    return user.email === userEmail;
  });
  const userId = currentUser?._id;
  console.log(userId);

  const sortedUserIncompletedTasks = incompletedTasks.filter((task) => {
    return task.user === userId;
  });
  console.log(sortedUserIncompletedTasks);

  const sortedIncompletedTasks = sortedUserIncompletedTasks.sort(
    (a: any, b: any) => {
      if (a.isCompleted === b.isCompleted) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return a.isCompleted ? 1 : -1;
    }
  );

  return (
    <div className="p-8 h-full overflow-y-auto pb-24 bg-gray-400">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center border-b-2 border-gray-800">
          Incompleted Tasks
        </h1>
        <Link
          href="/new"
          className="flex items-center gap-1 font-semibold border px-4 py-2 rounded-full shadow-sm text-white bg-gray-800 hover :bg-gray-700"
        >
          <MdAddTask className="size-5" />
          <div>Create Task</div>
        </Link>
      </header>
      {incompletedTasks.length === 0 ? (
        <p className="pt-5 font-semibold">No tasks available</p>
      ) : (
        <div className="mt-8 flex flex-wrap gap-4">
          {sortedIncompletedTasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default IncompletedTaskpage;
