import { TaskDocument } from "@/models/task";
import TaskDeleteButton from "./TaskDeleteButton/TaskDeleteButton";
import TaskEditButton from "./TaskEditButton/TaskEditButton";

import TaskCompletedButton from "./TaskCompletedButton/TaskCompletedButton";
import TaskCopyButton from "./TaskCopyButton/TaskCopyButton";

interface TaskCardProps {
  task: TaskDocument;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayDateString = yesterday.toISOString().split("T")[0];
  if (!task) {
    return <div>Loading...</div>; // ローディング中の表示
  }
  return (
    <div
      className={`w-64 h-40 p-4 rounded-md shadow-md flex flex-col justify-between ${
        task.isCompleted
          ? "bg-gray-500"
          : task.dueDate === yesterdayDateString
          ? "bg-red-400"
          : "bg-white"
      }`}
    >
      <header>
        <div className="flex justify-between">
          <h1 className="text-lg font-semibold ">{task.title}</h1>
          <span className="text-lg font-semibold ">
            <TaskCopyButton task={task} />
          </span>
        </div>

        <div className="mt-1 text-sm line-clamp-3">{task.description}</div>
      </header>
      <div>
        <div className="text-sm">{task.dueDate}</div>
        <div className="flex justify-end">
          {/* <div
            className={`mt-1 text-sm px-2 py-1 w-18 text-center text-white rounded-full shadow-sm 
               ${task.isCompleted ? "bg-green-500" : "bg-red-500"}`}
          >
            {task.isCompleted ? "Completed" : "InCompleted"}
          </div> */}
          <div className="flex gap-4">
            <TaskEditButton id={task._id} />
            {!task.isCompleted && <TaskCompletedButton id={task._id} />}
            <TaskDeleteButton id={task._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
