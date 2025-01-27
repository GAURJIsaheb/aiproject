import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className="p-3 z-50 px-5 flex items-center justify-between shadow-md bg-opacity-60 fixed top-0 w-full"> {/* Fixed header */}
        <div className='flex gap-3 items-center'>
            <Image className="rounded-full" src={"/Logo.jpg"} alt="logo" width={100} height={100} />
            <h2 className="font-bold text-white">Ai Short Video</h2>
        </div>
        <div className="flex items-center">
          <Link href={"/dashboard"}>
            <Button className="bg-purple-700 text-white">Dashboard</Button>
          </Link>
            <UserButton />
        </div>
    </div>
  )
}

export default Header
