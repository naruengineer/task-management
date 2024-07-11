import { TaskDocument, TaskModel } from "@/models/task";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const maxDuration = 20; //タイムアウトを20秒に設定

export const GET = async () => {
  try {
    await connectDB();
    const allTasks: TaskDocument[] = await TaskModel.find();

    return NextResponse.json({ message: "タスク取得成功", task: allTasks });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "タスク取得失敗" }, { status: 500 });
  }
};

export const dynamic = "force-dynamic";
