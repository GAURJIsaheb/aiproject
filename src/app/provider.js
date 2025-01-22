"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import { db_VAR } from '../../configs/db';
import { schema_var } from '../../configs/schema';
import { eq } from 'drizzle-orm';

function Provider({children}) {
  const {user}=useUser();
useEffect(()=>{
  user && isNewUser();
},[user])

const isNewUser=async()=>{
  const res=await db_VAR.select().from(schema_var)//in video--> schema_var: Users,,,,,   db_VAR :db
  .where(eq(schema_var.email,user?.primaryEmailAddress?.emailAddress));
  console.log(res);

  if(!res[0]){//user hai nhi database mai,,to iska data bhejna pdega d mai
    await db_VAR.insert(schema_var).values({
      name:user.fullName,
      email:user?.primaryEmailAddress?.emailAddress,
      imageurl:user?.imageUrl
    })
  }
}

  return (
    <div>
        {children}
    </div>
  )
}

export default Provider