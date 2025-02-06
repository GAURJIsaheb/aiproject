"use client"
import { UserDetailContext } from '@/app/_context/UserDetailContext'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'

function Header() {
  //this is also for HandleCedits ka Scene
  const{userDetail,setuserDetail}=useContext(UserDetailContext);

  return (
    <div className="p-3 z-50 px-5 flex items-center justify-between shadow-md bg-opacity-60 w-full"> {/* Fixed header */}
        <div className='flex gap-3 items-center'>
        <Image
        className="rounded-full"
        src="/Logo.jpg"
        alt="logo"
        width={70}
        height={50}

/>

            <h2 className="font-bold text-white">Ai Short Video</h2>
        </div>
        <div className="flex items-center">
          <div className="mr-4 flex">
            <Image src={'/star.png'} alt="credit logo" width={25} height={20} className="mr-2"/>
            <h2>{userDetail?.credits}</h2>
          </div>
          <Link href={"/dashboard"}>
            <Button className="bg-purple-700 text-white">Dashboard</Button>
          </Link>
            <UserButton />
        </div>
    </div>
  )
}

export default Header
