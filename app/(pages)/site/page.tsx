"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation'
import {UrlForm} from "@/components/site/UrlForm"
const page = () => {
const router=useRouter()

  const handelBack=()=>{
    if(window.history.length>1){
      router.back()
    }
    else{
      router.push("/")
    }
  }
  
  return (
    <>
    <header className='absolute z-10'>
      <Button 
      className="font-light m-2 cursor-pointer rounded-full"
      variant={"ghost"}
      onClick={handelBack}><ArrowLeft/>Back</Button>
    </header>
    <div className='h-screen flex items-center justify-center'>
    <UrlForm/>
    </div>
    </>
  )
}

export default page