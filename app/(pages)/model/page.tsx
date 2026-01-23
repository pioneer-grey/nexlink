"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation'
import {UrlForm} from "@/components/model/UrlForm"
const page = () => {
const router=useRouter()
  return (
    <>
    <header className='absolute z-10'>
      <Button 
      className="font-bold m-2 cursor-pointer"
      variant={"ghost"}
      onClick={()=>router.back()}><ArrowLeft/> Back</Button>
    </header>
    <div className='h-screen flex items-center justify-center'>
    <UrlForm/>
    </div>
    </>
  )
}

export default page