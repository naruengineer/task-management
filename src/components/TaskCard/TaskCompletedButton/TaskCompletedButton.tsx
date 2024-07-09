"use client";

import { completedTask, FormState } from "@/actions/task";
import { useFormState, useFormStatus } from "react-dom";
import { IoFlag } from "react-icons/io5";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal/Modal";

interface TaskCompletedButtonProps {
  id: string;
}
const TaskCompletedButton: React.FC<TaskCompletedButtonProps> = ({ id }) => {
  const [showModal, setShowModal] = useState(false);
  const completedTaskWithId = completedTask.bind(null, id);
  const initialState: FormState = { error: "" };
  const [state, formAction] = useFormState(completedTaskWithId, initialState);

  useEffect(() => {
    if (state && state.error !== "") {
      alert(state.error);
    }
  }, [state]);

  const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
      <button
        type="submit"
        disabled={pending}
        className="hover :text-gray-700 text-lg cursor-pointer disabled:text-gray-400"
        onClick={() => setShowModal(true)}
      >
        <IoFlag />
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
          <div className="p-4 ">
            <h2 className="text-lg font-semibold">完了確認</h2>
            <p>※本当にこのタスクをやり切りましたか？</p>
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                まだやり残しがある。
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleConfirmDelete}
              >
                やり切った！
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default TaskCompletedButton;
