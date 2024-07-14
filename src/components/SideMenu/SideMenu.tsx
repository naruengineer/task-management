"use client";

import React from "react";
import NavList from "../NavList/NavList";
import { useSession } from "next-auth/react";
import Link from "next/link";
import SignOut from "../Button/SignOut";

const SideMenu = () => {
  const { data: session } = useSession();
  return (
    <div className="w-56 pt-8 bg-gray-800 text-white ">
      <div>
        <div className="flex pt-6 pb-6 w-full hover:bg-gray-700">
          <Link href="/" className="px-4 text-l font-bold ">
            {session ? `${session?.user?.name}のタスク` : ""}
          </Link>
          <div>
            {session && session.user?.image && (
              <img
                src={session.user.image}
                alt="User Image"
                width={28}
                height={28}
                className="rounded-full"
              />
            )}
          </div>
        </div>
        {session ? (
          <div>
            <NavList />
            <SignOut />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SideMenu;
