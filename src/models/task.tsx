import mongoose, { Document, Schema } from "mongoose";

export interface Task {
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  user: mongoose.Schema.Types.ObjectId;
}

export interface TaskDocument extends Task, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new mongoose.Schema<TaskDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dueDate: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const TaskModel =
  mongoose.models.Task || mongoose.model<TaskDocument>("Task", TaskSchema);
