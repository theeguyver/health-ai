
"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import fetch from "node-fetch";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(e.target.value);
  };

  interface ApiResponse {
    message: string; // Define the structure of the API response data
    // Add any other properties if needed
}

const handleSubmitWrapper = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
  e.preventDefault();
  await handleSubmit(email, password);
};

  const handleSubmit = async (email: string, password: string): Promise<void> => {
    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }), // Assuming your API expects JSON data
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error((responseData as ApiResponse).message || 'Failed to register');
      }

        console.log('Registration successful:', responseData);
    } catch (error) {
        console.error('Error occurred during registration:', error);
        // Handle the error appropriately, e.g., display an error message to the user
    }
}


  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-[#17023b] p-12 mt-10 rounded shadow-md w-96">
        <h1 className="text-4xl text-center text-white font-semibold mb-8">Register</h1>
        <form onSubmit={handleSubmitWrapper}>
          <input
            type="text"
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <input
            type="password"
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        <div className="text-center text-gray-500 mt-4">- OR -</div>
        <Link className="block text-center text-blue-500 hover:underline mt-2" href="/login">
          Login with an existing account
        </Link>
      </div>
    </div>
  );
};

export default Register;