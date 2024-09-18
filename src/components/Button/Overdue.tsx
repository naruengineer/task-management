"use client";

import React from "react";
import Link from "next/link";

const Overdue = () => {
  return (
    <Link href={"/alltask"} className={"text-red-600 animate-heartbeat"}>
      ※未完了のタスクがあります
    </Link>
  );
};

export default Overdue;
