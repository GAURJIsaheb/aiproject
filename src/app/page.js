"use client";

import React from "react";
import { Video, Mic, Sparkles, Play, Lock, UserPlus, LogIn,LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

function App() {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-green-500">
      {/* Navigation */}
      <nav className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Video className="w-8 h-8 text-blue-500" />
          <span className="text-2xl font-bold text-white">VideoAI</span>
        </div>
        <div className="flex space-x-4">
          {isSignedIn ? (
            <Link href="/dashboard">
            <button className="flex items-center px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-blue-600 transition-all">
              <LayoutDashboard className="w-5 h-5 mr-2" />
              Dashboard
            </button>
          </Link>
          ) : (
            <>
              {/* Sign-in */}
              <Link href="/sign-in">
                <button className="flex items-center rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-black">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </button>
              </Link>
              {/* Sign-up */}
              <Link href="/sign-up">
                <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Transform Your Ideas Into
            <span className="text-blue-500"> Professional Videos</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Create stunning videos with AI-powered technology. Generate professional content with just a few clicks.
          </p>

          <div className="flex justify-center space-x-6">
            <Link href="/sign-in">
              <button className="flex items-center px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105">
                <Play className="w-5 h-5 mr-2" />
                Get Started
              </button>
            </Link>


          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="bg-blue-500/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
              <Sparkles className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Creation</h3>
            <p className="text-gray-400">Generate professional videos using advanced AI technology.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="bg-blue-500/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
              <Mic className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Professional Audio</h3>
            <p className="text-gray-400">Crystal clear audio generation with natural voices.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="bg-blue-500/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
              <Lock className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Secure Platform</h3>
            <p className="text-gray-400">Your content is protected with enterprise-grade security.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
