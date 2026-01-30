"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from '@/components/ui/card'
import { useDeleteBrand } from '@/hooks/useBrandHook'
import { Trash } from 'lucide-react'
import {toast} from "sonner"
type Props = {
  id: string
  name: string,
  imgUrl: string,
  url: string,
}

export const BrandCard = ({ id, name, url, imgUrl }: Props) => {
  const {isPending,mutateAsync}=useDeleteBrand()
  const deleteFunc=async(id:string)=>{
    try{
       const res=mutateAsync(id)
       toast.promise(res,{
        loading:`Deleting the brand ${name}`,
        success:`${name} is successfully deleted`,
        error:`Failed to delete ${name}`
       })
       await res
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <Card className='min-w-xs pt-0'>
      <CardContent className='px-0'>
        <img
          src={imgUrl}
          alt={name}
          className="w-full h-48 object-cover object-top"
        />
      </CardContent>
      <CardHeader>
          <CardTitle>{name}</CardTitle>  
        <CardDescription>
          <a className='underline underline-offset-2' 
          href={url} target='_blank'>{url}</a>
          </CardDescription>
      </CardHeader>
      <CardFooter className='p-2 flex justify-between'>
        <Button
        onClick={()=>deleteFunc(id)}
        disabled={isPending}
        aria-label={`Delete ${name}`}
        variant={"ghost"}><Trash/></Button>
        {/* <Button variant={"secondary"} >Edit </Button> */}
      </CardFooter>
    </Card>
  )
}

