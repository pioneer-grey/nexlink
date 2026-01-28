"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation'
import {UrlForm} from "@/components/site/UrlForm"
import { useScanPage } from "@/hooks/useScanPage"
import {SiteLoader} from '@/components/site/siteLoader';
import { SiteInfo } from '@/components/site/siteInfo';
const page = () => {
  const {mutateAsync,isPending,data}=useScanPage()
const router=useRouter()

  const handelBack=()=>{
    if(window.history.length>1){
      router.back()
    }
    else{
      router.push("/")
    }
  }

  const submit=async(url:string)=>{
    await mutateAsync(url)
  }
  if(data){
    return(<>
       <header className='absolute z-10'>
      <Button 
      className="font-light m-2 cursor-pointer rounded-full"
      variant={"ghost"}
      onClick={handelBack}><ArrowLeft/>Back</Button>
    </header>
      <div className='flex justify-center'>
        <SiteInfo name={data.name} url={data.url} colors={data.colors} description={data.ai}
        fontFamily={data.fontFamily} imgUrl={data.imgUrl}
        />
      </div>
      </>
    )
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

     {isPending ? <SiteLoader/> :  <UrlForm submit={submit}/>} 
    </div>
    </>
  )
}

export default page