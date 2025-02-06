"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import EmptyState from './_components/EmptyState'
import Link from 'next/link'
import { db_VAR } from '../../../configs/db'
import { videoDataTableName } from '../../../configs/schema'
import { eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import VideoList from './_components/VideoList'

function Dashboard() {
  
  /*Use to get all videos via user signed email */
  const [videolist, setvideolist] = useState([])
  const {user}=useUser();
  const getVideoList=async()=>{
    const resp=await db_VAR.select().from(videoDataTableName)
    .where(eq(videoDataTableName?.createdBy,user?.primaryEmailAddress?.emailAddress))

    //console.log(resp)
    setvideolist(resp)
  }

  useEffect(()=>{
    getVideoList();
  },[user])


  return (
    <div className="pt-10"> {/* Add padding-top to prevent overlap with sticky header */}
      <div className="flex z-40 justify-between items-center">
        <h2 className="font-bold text-primary text-2xl mt-6 ml-6">Dashboard</h2>
        <Link href={"/dashboard/create-new"}>
          <Button className="hover:bg-green-500 hover:scale-110">+ Create New</Button>
        </Link>
      </div>
      {/* Empty State list */}
      {videolist?.length === 0 && (
        <div>
          <EmptyState />
        </div>
      )}

      {/*To show all list of videos ,,jo bun chuki hai pehle se */}
      <VideoList VideoListData={videolist} SetVideoListData={setvideolist}/>
    </div>
  )
}

export default Dashboard
