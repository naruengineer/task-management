import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { UserModel, UserDocument } from "@/models/user";

export const GET = async () => {
  try {
    await connectDB();
    console.log("接続成功");
    const allusers: UserDocument[] = await UserModel.find();
    return NextResponse.json({
      message: "ユーザー情報取得成功",
      user: allusers,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "ユーザー情報取得失敗" },
      { status: 500 }
    );
  }
};

export const dynamic = "force-dynamic";
