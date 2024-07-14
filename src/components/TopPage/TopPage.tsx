import React from "react";
import SignIn from "@/components/Button/SignIn";
import styles from "./TopPage.module.css";
import { FaTasks } from "react-icons/fa";

//アプリのトップページを設定
const TopPage = () => {
  return (
    <div className={styles.topPage}>
      <div>
        <div className="animate-scale-out-ver-bottom-1 mb-4">
          積み重なる大量のタスクにもううんざり、、、
        </div>
        <div className="animate-scale-out-ver-bottom-2">
          そんな毎日から抜け出して効率的で充実した日々を送りましょう
        </div>
      </div>

      <div className="mt-28 m-32">
        <div className="text-6xl font-bold flex animate-fade-in-fwd-1">
          <div className="pr-5">Taskhelp</div>
          <FaTasks />
        </div>
      </div>
      <div className="animate-fade-in-fwd-2">
        <p>Taskhelp（タスケル）はあなたのタスク管理を支援するアプリです。</p>
      </div>
      <div className="pt-10 animate-fade-in-fwd-3">
        <SignIn />
      </div>
      <div></div>
    </div>
  );
};

export default TopPage;
