"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const handleSubmit = () => {
    console.log("")
  }

  return (
   (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-[#17023b] p-12 mt-10 rounded shadow-md w-96">
          <h1 className="text-4xl text-center font-semibold text-white mb-8">Login</h1>
          <form>
            <input
              type="text"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {" "}
              Sign In
            </button>
          </form>
          <button
            className="w-full bg-black text-white py-2 mt-4 rounded hover:bg-gray-800"
            // onClick={() => {
            //   signIn("github");
            // }}
          >
            Sign In with Google
          </button>
          <div className="text-center text-gray-500 mt-4">- OR -</div>
          <Link
            className="block text-center text-blue-500 hover:underline mt-2"
            href="/register"
          >
            Register Here
          </Link>
        </div>
      </div>
    )
  );
};

export default Login;