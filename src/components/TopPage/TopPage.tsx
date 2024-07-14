import React from "react";
import SignIn from "@/components/Button/SignIn";
import styles from "./TopPage.module.css";
import { FaTasks } from "react-icons/fa";

//アプリのトップページを設定
const TopPage = () => {
  return (
    <div className={styles.topPage}>
      <div className="mt-28 m-32">
        <div className="text-6xl font-bold flex ">
          <div className="pr-5">Taskhelp</div>
          <FaTasks />
        </div>
      </div>

      <div className="">
        <p>Taskhelp（タスケル）はあなたのタスク管理を支援するアプリです。</p>
      </div>
      <div className="pt-10">
        <SignIn />
      </div>
      <div></div>
    </div>
  );
};

export default TopPage;
