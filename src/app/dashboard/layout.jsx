"use client";
import React from "react";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="relative">
      {/* Header at the top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <Header />
      </div>

      {/* Sidebar below the header */}
      <Sidebar />

      {/* Main content area */}
      <div className="md:ml-64 mt-[45px] p-10 ">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
