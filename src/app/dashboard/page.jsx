"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import EmptyState from './_components/EmptyState'
import Link from 'next/link'
import { db_VAR } from '../../../configs/db'
import { videoDataTableName } from '../../../configs/schema'
import { eq } from 'drizzle-orm'

function Dashboard() {
  const [videolist, setvideolist] = useState([])

  // const resp=await db_VAR.select().from(videoDataTableName)
  // .where(eq(videoDataTableName?.cre))

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
    </div>
  )
}

export default Dashboard
