"use client"
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

function SelectDuration({onUserSelect}) {
  return (
    <div className="mt-8">
        <h2 className="font-bold text-3xl text-purple-600 ">Duration</h2>

        <Select onValueChange={(value)=>{
            value !='Custom Prompt' && onUserSelect('duration',value)
        }}>
            <SelectTrigger className="w-full mt-2 p-6 text-lg">
                <SelectValue placeholder="Choose Duration.." />
            </SelectTrigger>
            <SelectContent>

                <SelectItem  value={3}>10 Seconds</SelectItem>
                
                <SelectItem value={5}>20 Seconds</SelectItem>
            </SelectContent>
        </Select>
        </div>
  )
}

export default SelectDuration