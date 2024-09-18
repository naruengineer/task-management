"use client";

import React, { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import { ControlViewport } from "@/components/ViewPoint/controlViewPoint";
import { useSession } from "next-auth/react";
import TopPage from "@/components/TopPage/TopPage";

const Mainlayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  //sessionが確認出来次第、画面をレンダリング
  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status]);

  if (loading) {
    return null;
  }

  if (session) {
    return (
      <div className="flex h-screen">
        <ControlViewport />
        <SideMenu />
        <main className="bg-gray-200 flex-1 overflow-auto">{children}</main>
      </div>
    );
  } else {
    return <TopPage />;
  }
};

export default Mainlayout;
