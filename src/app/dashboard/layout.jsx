"use client";
import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import { VideoDataContext } from "../_context/videoDataContext";
import { UserDetailContext } from "../_context/UserDetailContext";
import { useUser } from "@clerk/nextjs";
import { db_VAR } from "../../../configs/db";
import { schema_var } from "../../../configs/schema";
import { eq } from "drizzle-orm";

function DashboardLayout({ children }) {

  const [videoData,setvideoData]=useState([])

  
  //for Credits ka scene
  const[userDetail,setuserDetail]=useState([]);
  const {user}=useUser();
  const getUserDetail=async()=>{
    const resp=await db_VAR.select().from(schema_var)
    .where(eq(schema_var.email,user?.primaryEmailAddress?.emailAddress))

    setuserDetail(resp[0])
  }

  useEffect(()=>{
    user && getUserDetail();
  },[user])


  return (
    <UserDetailContext.Provider value={{userDetail,setuserDetail}}>
      <VideoDataContext.Provider value={{videoData,setvideoData}}>
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

    </VideoDataContext.Provider>
    </UserDetailContext.Provider>
    
    
  );
}

export default DashboardLayout;
