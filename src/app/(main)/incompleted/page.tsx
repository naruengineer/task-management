import TaskCard from "@/components/TaskCard/TaskCard";
import { TaskDocument } from "@/models/task";

const getIncompletedtasks = async (): Promise<TaskDocument[]> => {
  const response = await fetch(`${process.env.API_URL}/tasks/incompleted`, {
    cache: "no-store",
  });
  if (response.status !== 200) {
    throw new Error();
  }
  const data = await response.json();
  return data.task as TaskDocument[];
};

const IncompletedTaskpage = async () => {
  const incompletedTasks = await getIncompletedtasks();

  const sortedIncompletedTasks = incompletedTasks.sort((a, b) => {
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <div className="p-8 h-full overflow-y-auto pb-24 bg-gray-400">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center border-b-2 border-gray-800">
          Incompleted Tasks
        </h1>
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
