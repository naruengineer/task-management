import { TaskDocument, TaskModel } from "@/models/task";
import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDB();
    const incompletedTasks: TaskDocument[] = await TaskModel.find({
      isCompleted: false,
    });

    return NextResponse.json({
      message: "タスク取得成功",
      task: incompletedTasks,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "タスク取得失敗" }, { status: 500 });
  }
};

export const dynamic = "force-dynamic";
