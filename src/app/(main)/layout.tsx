"use client";

import React from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import { ControlViewport } from "@/components/ViewPoint/controlViewPoint";
import { useSession } from "next-auth/react";
import TopPage from "@/components/TopPage/TopPage";

const Mainlayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { data: session } = useSession();
  if (!session) {
    return <TopPage />;
  }
  return (
    <div className="flex h-screen">
      <ControlViewport />
      <SideMenu />
      <main className="bg-gray-300 flex-1 overflow-auto">{children}</main>
    </div>
  );
};

export default Mainlayout;
