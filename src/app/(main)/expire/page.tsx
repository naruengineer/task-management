import TaskCard from "@/components/TaskCard/TaskCard";
import { TaskDocument } from "@/models/task";

const getExpiredtasks = async (): Promise<TaskDocument[]> => {
  const response = await fetch(`${process.env.API_URL}/tasks/expired`, {
    cache: "no-store",
  });
  if (response.status !== 200) {
    throw new Error();
  }
  const data = await response.json();
  console.log("API response data:", data); // 追加
  return data.task as TaskDocument[];
};

const ExpiredTaskpage = async () => {
  const expiredTasks = await getExpiredtasks();
  return (
    <div className="p-8 h-full overflow-y-auto pb-24 bg-gray-400">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">Expired tasks</h1>
      </header>
      <div className="mt-8 flex flex-wrap gap-4">
        {expiredTasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default ExpiredTaskpage;
