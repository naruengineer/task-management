import { TaskDocument } from "@/models/task";
import TaskDeleteButton from "./TaskDeleteButton/TaskDeleteButton";
import TaskEditButton from "./TaskEditButton/TaskEditButton";
import { useEffect } from "react";
import TaskCompletedButton from "./TaskCompletedButton/TaskCompletedButton";

interface TaskCardProps {
  task: TaskDocument;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  if (!task) {
    return <div>Loading...</div>; // ローディング中の表示
  }
  return (
    <div
      className={`w-64 h-52 p-4 rounded-md shadow-md flex flex-col justify-between ${
        task.isCompleted ? "bg-gray-500" : "bg-white "
      }`}
    >
      <header>
        <h1 className="text-lg font-semibold">{task.title}</h1>
        <div className="mt-1 text-sm line-clamp-3">{task.description}</div>
      </header>
      <div>
        <div className="text-sm">{task.dueDate}</div>
        <div className="flex justify-between items-center">
          <div
            className={`mt-1 text-sm px-2 py-1 w-24 text-center text-white rounded-full shadow-sm 
               ${task.isCompleted ? "bg-green-500" : "bg-red-500"}`}
          >
            {task.isCompleted ? "Completed" : "InCompleted"}
          </div>
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
