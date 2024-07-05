import { TaskModel } from "@/models/task";
import { connectDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) => {
  try {
    await connectDB();
    const task = await TaskModel.findById(params.id);
    if (!task) {
      return NextResponse.json(
        { message: "タスクが存在しません" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "タスク取得に成功",
      task,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "タスク取得に失敗" }, { status: 500 });
  }
};
