import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function EmptyState() {
  return (
    <div className="mt-12 px-5 py-12 flex flex-col items-center justify-center border-2 border-dotted">
        <h2>You Don't have any created items...</h2>
        <Link href={"/dashboard/create-new"}>
            <Button className="mt-5 hover:bg-green-500 hover:scale-105">Create</Button>
        </Link>
        
    </div>
  )
}

export default EmptyState