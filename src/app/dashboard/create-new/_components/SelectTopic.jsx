"use client"
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'
  

function SelectTopic({onUserSelect}) {
    const options=['Custom Prompt','Random Ai Story','Scary Story','Historical Story','Bed Time Story','Motivational','Fun Facts']
    const [selectedOption,setselectedOption]=useState()
    return (
    <div>
        <h2 className="font-bold text-3xl text-purple-600 ">Content</h2>
        <p className="text-gray-500">What is the theme of the video...?</p>
        <Select onValueChange={(value)=>{setselectedOption(value)
            value !='Custom Prompt' && onUserSelect('topic',value)
        }}>
            <SelectTrigger className="w-full mt-2 p-6 text-lg">
                <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
                {options.map((item,index)=>(
                        <SelectItem key={index} value={item}>{item}</SelectItem>

                ))}

            </SelectContent>
        </Select>
        {selectedOption=='Custom Prompt' &&
        <Textarea placeholder="Write your custom theme..🎈🎈🎈"
        onChange={(e)=>onUserSelect('topic',e.target.value)}/>}

    </div>
  )
}

export default SelectTopic