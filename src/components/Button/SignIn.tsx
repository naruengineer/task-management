import React from "react";
import { signIn } from "next-auth/react";
import { FaSignInAlt } from "react-icons/fa";

const SignIn = () => {
  return (
    <div className="flex p-6 items-center font-medium bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded">
      <FaSignInAlt color="white" className="mr-2" />
      <button onClick={() => signIn()}>ログインして始める</button>
    </div>
  );
};

export default SignIn;
