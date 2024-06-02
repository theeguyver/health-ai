"use client";
import { Socials } from "@/constants";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  console.log(router);
  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const userEmail = getCookie('userEmail'); // Assuming you're using localStorage to store user email
    setIsLoggedIn(!!userEmail); // Convert userEmail to boolean value
    console.log("userEmail=", userEmail, !!userEmail)
  }, []);

  const handleLogout = () => {
    // Clear the user data from localStorage or cookies
    document.cookie = "userEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log("Cookie cleared");
    setIsLoggedIn(false);
    // Redirect the user to the login page
    router.push('/login');
  };

  function getCookie(name: string) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Check if this cookie is the one we're looking for
        if (cookie.startsWith(name + '=')) {
            // Return the value of the cookie
            return cookie.substring(name.length + 1);
        }
    }
    // If cookie not found, return null
    return null;
}


  function slideInFromLeft(duration: number) {
    return {
      initial: { x: -100 },
      animate: { x: 0 },
      exit: { x: -100 },
      transition: { duration },
    };
  }


  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-10">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
        <a
          href="/"
          className="h-auto w-auto flex flex-row items-center"
        >
          <Image
            src="/final.jpeg"
            alt="logo"
            width={60}
            height={60}
            className="cursor-pointer hover:animate-slowspin rounded-full"
          />

          <span className="font-bold ml-[10px] hidden md:block text-gray-300">
            Health.AI
          </span>
        </a>

        <div className="w-[500px] h-full flex flex-row items-center justify-between ml-60 md:mr-30">
          <div className="flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
            <a href="/" className="cursor-pointer">
             Home {/* About me */}
            </a>
            <Link href="/about">About Us</Link>


            <a href="/library" className="cursor-pointer">
             Library {/* Projects */}
            </a>
          </div>
        </div>

        <div className="flex flex-row gap-5">
          {isLoggedIn ? (
        <div className="py-2 button-primary text-center text-white cursor-pointer rounded-lg w-[150px]" onClick={handleLogout}>
          Sign Out
        </div>
      ) : (
        <div className="py-2 button-primary text-center text-white cursor-pointer rounded-lg w-[150px]">
          <Link href="/login">
            Login
          </Link>
        </div>
      )}

          {/* <div className="py-2 button-primary text-center text-white cursor-pointer rounded-lg w-[150px]">
            <Link href="/register">
              Register
            </Link>
          </div> */}

          <div className="py-2 button-primary text-center text-white cursor-pointer rounded-lg w-[150px]">
            <Link href="/user">
              User
            </Link>
          </div>
          {/* <div className="py-2 button-primary text-center text-white cursor-pointer rounded-lg w-[100px]">
          User</div> */}
          {/* {Socials.map((social) => (
            <motion.a>
         
            </motion.a>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
