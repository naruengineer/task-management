import React from "react";
import SideMenu from "../../components/SideMenu/SideMenu";

const Mainlayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-screen">
      <SideMenu />
      <main className="bg-gray-300 flex-1 overflow-auto">{children}</main>
    </div>
  );
};

export default Mainlayout;
