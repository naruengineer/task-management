import { TaskDocument } from "@/models/task";

export const getAlltasks = async (): Promise<TaskDocument[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
    cache: "no-store",
  });
  if (response.status !== 200) {
    throw new Error("問題発生");
  }
  const data = await response.json();
  return data.task as TaskDocument[];
};
