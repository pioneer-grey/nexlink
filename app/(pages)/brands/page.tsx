"use client"
import React from 'react'
import { useBrands } from '@/store/useBrands'
import { BrandCard } from '@/components/brands/BrandCard'
const page = () => {
  const{brands}=useBrands()
  return (
  <div className='w-full p-4 flex flex-wrap gap-4 h-auto'>
   {brands && brands.map((data,i)=>(
      <BrandCard
      key={i} 
      id={data.id} imgUrl={data.imgUrl} 
      name={data.name} url={data.url}/>
   ))}
   </div>
  )
}

export default page