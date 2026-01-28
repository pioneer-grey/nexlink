"use client"
import React,{useState} from 'react'
import axios from "axios"
import { Button } from '@/components/ui/button'
const page = () => {
    const [data,setData]=useState<{hex:string,count:number}[]>()
    const [img,setimg]=useState<string>()
    const submit=async()=>{
        try{
            const url="https://www.example.com/"
            const res=await axios.get(`http://localhost:3000/api/site?url=${url}`)
            setData(res.data.colors)
            setimg(res.data.imgUrl)
            console.log(res.data)
        }
        catch(err){
            console.log(err)
        }
    }

  return (
    <>
    <Button onClick={submit}>Fetch</Button>
    {data && data.map((item,i:number)=>(
        <div key={i}>
            <input type="color" readOnly value={item.hex} />
            <h1>Hex is {item.hex} The count is {item.count} </h1>
        </div>

    ))}
    <img src={img} alt="img url" 
    className='w-50 h-50 object-contain'
    />
    </>
  );
}

export default page