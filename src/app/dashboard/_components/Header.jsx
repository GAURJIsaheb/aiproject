import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className="p-3 px-5 flex items-center justify-between shadow-md">
        <div className='flex gap-3 items-center'>
            <Image className="rounded-full" src={"/Logo.jpg"} alt="logo" width={100} height={100} />
            <h2 className="font-bold ">Ai Short Video</h2>
        </div>
        <div className="flex  items-center">
            <Button className="bg-purple-700">Dashboard</Button>
            <UserButton/>
        </div>
    </div>
  )
}

export default Header