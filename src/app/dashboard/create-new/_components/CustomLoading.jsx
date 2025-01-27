import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Image from 'next/image'
  

function CustomLoading({loading}) {
  return (
        <AlertDialog open={loading}>
            <AlertDialogContent className="bg-white border-pink-800 border-2">
            <AlertDialogTitle></AlertDialogTitle>
                <div className="bg-white flex flex-col justify-center items-center">
                    <Image  src={'/soon.gif'} alt="Loading" width={100} height={100}/>
                Creating your AI short video...Don't Refresh the page ..
                </div>
            </AlertDialogContent>
        </AlertDialog>

  )
}

export default CustomLoading