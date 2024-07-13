"use client";

import { useState, useEffect } from "react";
import { FormState } from "@/actions/task";
import { useFormState, useFormStatus } from "react-dom";
import { FaTrashAlt } from "react-icons/fa";
import { deleteTask } from "@/actions/task";
import Modal from "@/components/Modal/Modal";

interface TaskDeleteButtonProps {
  id: string;
}

const TaskDeleteButton: React.FC<TaskDeleteButtonProps> = ({ id }) => {
  const [showModal, setShowModal] = useState(false);
  const deleteTaskWithId = deleteTask.bind(null, id);
  const initialState: FormState = { error: "" };
  const [state, formAction] = useFormState(deleteTaskWithId, initialState);

  useEffect(() => {
    if (state && state.error !== "") {
      alert(state.error);
    }
  }, [state]);

  const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
      <button
        type="button"
        disabled={pending}
        className="hover:text-gray-700 text-lg cursor-pointer disabled:text-gray-400"
        onClick={() => setShowModal(true)}
      >
        <FaTrashAlt />
      </button>
    );
  };

  const handleConfirmDelete = () => {
    formAction();
    setShowModal(false);
  };

  return (
    <>
      <SubmitButton />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="p-4">
            <h2 className="text-lg font-semibold">削除確認</h2>
            <p>※本当にこのタスクを削除しますか？</p>
            <div className="flex justify-between items-center gap-4 mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                キャンセル
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleConfirmDelete}
              >
                削除する
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default TaskDeleteButton;
