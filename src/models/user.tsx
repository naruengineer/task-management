import mongoose, { Document } from "mongoose";

export interface User {
  name: string;
  email: string;
  image: string;
  taskCompletedCount: number;
}

export interface UserDocument extends Document {
  name: string;
  email: string;
  image: string;
  taskCompletedCount: number;
}

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    taskCompletedCount: { type: Number, default: 0, required: true },
  },
  { timestamps: true }
);

export const UserModel =
  mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);
