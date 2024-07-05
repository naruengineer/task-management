import React from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import { ControlViewport } from "@/components/ViewPoint/controlViewPoint";

const Mainlayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-screen">
      <ControlViewport />
      <SideMenu />
      <main className="bg-gray-300 flex-1 overflow-auto">{children}</main>
    </div>
  );
};

export default Mainlayout;
