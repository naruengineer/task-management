import React from "react";
import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";

const SignOut = () => {
  return (
    <div className="flex p-6 items-center  font-medium">
      <FaSignOutAlt color="blue" />
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="py-2 px-1 font-bold "
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOut;
