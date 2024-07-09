import TaskCard from "@/components/TaskCard/TaskCard";
import { TaskDocument } from "@/models/task";
import { getServerSession } from "next-auth";
import { UserModel } from "@/models/user";

const getCompletedtasks = async (): Promise<TaskDocument[]> => {
  const response = await fetch(`${process.env.API_URL}/tasks/completed`, {
    cache: "no-store",
  });
  if (response.status !== 200) {
    throw new Error();
  }
  const data = await response.json();
  return data.task as TaskDocument[];
};

const CompletedTaskpage = async () => {
  const completedTasks = await getCompletedtasks();
  const session = await getServerSession();
  const userEmail = session?.user?.email; //ログインユーザーのメールアドレス
  const user = await UserModel.findOne({ email: userEmail }); // 上記を利用してユーザーのObjectIdを取得
  const userId = user._id.toString(); //ObjectId を挿入
  console.log(userId);
  console.log(completedTasks);

  const sortedUserCompletedTasks = completedTasks.filter((task) => {
    return task.user === userId;
  });
  console.log(sortedUserCompletedTasks);

  const sortedCompletedTasks = sortedUserCompletedTasks.sort(
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
          Completed Tasks
        </h1>
      </header>
      {completedTasks.length === 0 ? (
        <p className="pt-5 font-semibold">No tasks available</p>
      ) : (
        <div className="mt-8 flex flex-wrap gap-4">
          {sortedCompletedTasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedTaskpage;
