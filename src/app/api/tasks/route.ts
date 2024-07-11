import { TaskDocument, TaskModel } from "@/models/task";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDB();
    console.log("接続成功");
    const allTasks: TaskDocument[] = await TaskModel.find();
    console.log(allTasks);
    return NextResponse.json({ message: "タスク取得成功", task: allTasks });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "タスク取得失敗" }, { status: 500 });
  }
};

export const dynamic = "force-dynamic";
