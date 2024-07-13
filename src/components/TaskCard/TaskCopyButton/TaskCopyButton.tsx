"use client";

import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import Modal from "@/components/Modal/Modal";
import { TaskDocument } from "@/models/task";
import { FormState, copyTask } from "@/actions/task";

interface TaskCopyButtonProps {
  task: TaskDocument; // taskの型をTaskDocumentまたは適切な型に置き換える
}

const TaskCopyButton: React.FC<TaskCopyButtonProps> = ({ task }) => {
  const [showModal, setShowModal] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const handleCopyTask = async () => {
    try {
      //formDataへ現在のタスクの内容と新しい日付を挿入
      const state: FormState = { error: "" };
      const formData = new FormData();
      formData.append("title", task.title);
      formData.append("description", task.description);
      formData.append("dueDate", dueDate);

      await copyTask(state, formData);

      if (state.error) {
        throw new Error(state.error);
      }

      console.log("タスクがコピーされました。");
      setShowModal(false);
    } catch (error) {
      console.error("タスクのコピーに失敗しました。", error);
      setError("タスクのコピーに失敗しました。");
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="hover:text-gray-700 text-lg cursor-pointer disabled:text-gray-400"
      >
        <FaCopy />
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="p-4">
            <h2 className="text-lg font-semibold">タスクコピー</h2>
            {error && <p className="text-red-500">{error}</p>}
            <p>※日付を選択してください</p>
            <label className="mt-4">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="border-gray-300 border rounded-md p-1"
              />
            </label>
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                キャンセル
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleCopyTask}
              >
                コピーする
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TaskCopyButton;
