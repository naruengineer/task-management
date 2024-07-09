"use server";

import { Task, TaskModel } from "@/models/task";
import { UserModel } from "@/models/user";
import { connectDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export interface FormState {
  error: string;
}

export const createTask = async (state: FormState, formData: FormData) => {
  const session = await getServerSession();

  if (!session) {
    state.error = "認証されていません";
    console.error("Not authenticated");
    return state;
  }

  const userEmail = session.user?.email;

  if (!userEmail) {
    state.error = "ユーザー情報が見つかりません";
    console.error("User information not found");
    return state;
  }

  await connectDB();

  // Emailを使ってユーザーのObjectIdを取得
  const user = await UserModel.findOne({ email: userEmail });

  if (!user) {
    state.error = "ユーザーが見つかりません";
    console.error("User not found");
    return state;
  }

  const userId = user._id;

  const newTask: Task = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    dueDate: formData.get("dueDate") as string,
    isCompleted: false,
    user: userId, // ObjectIdをセット
  };

  try {
    await TaskModel.create(newTask);
    console.log("タスク作成成功");
    redirect("/alltask");
  } catch (error) {
    state.error = "タスクの作成に失敗しました";
    console.error(error);
  }
  redirect("/alltask");
};

//タスク編集フォームのロジック
export const updateTask = async (
  id: string,
  state: FormState,
  formData: FormData
) => {
  const session = await getServerSession();

  if (!session) {
    state.error = "認証されていません";
    console.error("Not authenticated");
    return;
  }

  const userEmail = session.user?.email;

  if (!userEmail) {
    state.error = "ユーザー情報が見つかりません";
    console.error("ユーザー情報が見つかりません");
    return;
  }

  await connectDB();

  // Emailを使ってユーザーのObjectIdを取得
  const user = await UserModel.findOne({ email: userEmail });

  if (!user) {
    state.error = "ユーザーが見つかりません";
    console.error("User not found");
    return;
  }

  const userId = user._id;

  const updateTask: Task = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    dueDate: formData.get("dueDate") as string,
    isCompleted: false,
    user: userId, // ObjectIdをセット
  };

  try {
    await TaskModel.updateOne({ _id: id }, updateTask);
    console.log("タスク更新成功");
    redirect("/alltask");
  } catch (error) {
    state.error = "タスクの更新に失敗しました";
    console.error(error);
  }
};

//タスク削除ボタンのロジック
export const deleteTask = async (id: string, state: FormState) => {
  try {
    await connectDB();
    await TaskModel.deleteOne({ _id: id });
  } catch (error) {
    state.error = "タスクの削除に失敗しました";
    return state;
  }
  redirect("/alltask");
};

//タスク完了ボタンのロジック
export const completedTask = async (id: string, state: FormState) => {
  try {
    await connectDB();
    await TaskModel.updateOne({ _id: id }, { isCompleted: true });
  } catch (error) {
    state.error = "タスクの完了に失敗しました";
    return state;
  }
  redirect("/alltask");
};
