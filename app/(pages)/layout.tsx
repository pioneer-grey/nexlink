"use client"
import type { Metadata } from "next";
import React from 'react'
import { AppSidebar } from "@/components/sidebar/Sidebar";
import {
   SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Navbar from "@/components/sidebar/Navbar"
import { useGetBrand } from '@/hooks/useBrandHook'
import { useBrands } from '@/store/useBrands'
import { Spinner } from "@/components/ui/spinner"
import { useRouter} from 'next/navigation'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   const {data,isLoading}=useGetBrand()
  const {setBrands}=useBrands()

  const router=useRouter()

  React.useEffect(()=>{
    if (!data) return; 
    if(data.success){
      setBrands(data.data)
    }
    else if(!data.success){
      router.push("/site")
    }
  },[data])

  if(isLoading){
    return (
      <div className='flex h-screen justify-center items-center'>
        <Spinner/>
      </div>
    )
  }
  return (<>
   <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar/>
    {children}
    </SidebarInset>
    </SidebarProvider>
  </>
        
  );
}