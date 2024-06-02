"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from 'axios'; // Import AxiosError type

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents the default form submission behavior
  
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      console.log(response.data); // Assuming response is just a success message
      console.log("Login Success");
  
      // Store email value in a cookie
      document.cookie = `userEmail=${email}; expires=${new Date(Date.now() + 86400000).toUTCString()}; path=/`;
      
      // Redirect the user to another page upon successful login
      router.push('/chatbot');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>; // Type assertion with any
        if (axiosError.response && axiosError.response.data && typeof axiosError.response.data === 'object' && 'message' in axiosError.response.data) {
          setErrorMessage(axiosError.response.data.message);
        } else {
          setErrorMessage('Authentication Failed. Incorrect email or password.');
        }
      } else {
        setErrorMessage('An error occurred while processing your request.');
      }
    }
  };

  console.log(document.cookie);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
  <div className="bg-[#17023b] p-12 mt-10 rounded shadow-md w-96">
    <h1 className="text-4xl text-center font-semibold text-white mb-8">Login</h1>
    {/* Error message */}
    {errorMessage && (
      <div className="text-red-500 text-center mb-4">{errorMessage}</div>
    )}
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
        placeholder="Password"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
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
  );
};

export default Login;
