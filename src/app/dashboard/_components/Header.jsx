"use client";
import { useContext } from "react";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import headerImg from "../../../../public/logo.jpg";

function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-opacity-90 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center ">
          <Link href="/" className="flex items-center">
            <Image
              className="rounded-full border-2 border-purple-500 shadow-md transition-transform hover:scale-105"
              src={headerImg}
              alt="AI Short Video Logo"
              width={90}
              height={60}
              priority
            />
            <h1 className="ml-12 text-2xl font-extrabold text-white tracking-tight hover:text-purple-300 transition-colors">
              AI Short Video
            </h1>
          </Link>
        </div>

        {/* User Actions Section */}
        <div className="flex items-center space-x-6">
          {/* Credits Display */}
          <div className="flex items-center bg-gray-700 bg-opacity-50 rounded-full px-3 py-1 shadow-inner">
            <Image
              src="/star.png"
              alt="Credits"
              width={20}
              height={20}
              className="mr-2 animate-pulse"
            />
            <span className="text-white font-semibold text-lg">
              {userDetail?.credits ?? "0"}
            </span>
          </div>

          {/* Dashboard Button */}
          <Link href="/dashboard">
            <Button
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-6 py-2 rounded-full hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Dashboard
            </Button>
          </Link>

          {/* User Profile */}
          <div className="relative group">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 border-2 border-purple-400 rounded-full transition-transform group-hover:scale-110",
                },
              }}
            />
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white bg-gray-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Profile
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;