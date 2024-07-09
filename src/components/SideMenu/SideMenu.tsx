"use client";

import React from "react";
import NavList from "../NavList/NavList";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const SideMenu = () => {
  const { data: session, status } = useSession();
  return (
    <div className="w-56 pt-8 bg-gray-800 text-white">
      <div>
        <div className="flex">
          <Link href="/" className="px-4 text-2xl font-bold">
            Next.js tasks
          </Link>
        </div>

        {session ? (
          <div className="">
            <NavList />
            <div className="flex p-6 items-center w-full hover:bg-gray-700 font-medium">
              <FaSignOutAlt color="blue" />
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="py-2 px-1 font-bold "
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex p-6 items-center w-full hover:bg-gray-700 font-medium">
            <FaSignInAlt color="green" />
            <button onClick={() => signIn()} className="py-2 px-1 font-bold ">
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideMenu;
