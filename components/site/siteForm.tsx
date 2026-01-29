import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
    Label

} from '../ui/label'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { SiteSnapshot} from '@/store/types'
import { useAddSite } from '@/hooks/useAddSite'
import { toast } from 'sonner'

export const SiteForm = ({ colors, description, fontFamily, name, imgUrl, url }:SiteSnapshot ) => {
    const{isPending,mutateAsync}=useAddSite()
    const router=useRouter()
    const submit=async()=>{
        try{
            const res=mutateAsync({colors,description,fontFamily,name,imgUrl,url})
            toast.promise(res,{
                loading: "Saving analyzed site data…",
                success: "Site saved successfully",
            })
            await res
            router.push("/dashboard")
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <>
            <Card className="w-full sm:max-w-sm md:max-w-2xl my-10">
                <CardHeader>
                    <CardTitle>Business Details</CardTitle>
                    <CardDescription>
                    Our AI has captured your brand’s distinctive elements.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='name'>Business Name</Label>
                            <Input value={name} readOnly name='name' id="name" />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='url'>Website URL</Label>
                            <Input value={url} readOnly name='url' id="url" />
                        </div>


                        {fontFamily.length>0&&
                         <div className='col-span-2 space-y-2'>
                            <Label htmlFor='fontFamily'>Brand Fonts</Label>
                            {fontFamily.map((item, i) => (
                                <div key={i} className='border-2  h-auto flex flex-col justify-center p-2 rounded-xl'>
                                    <h5 className='font-bold'>{item}</h5>
                                    <p className='text-muted-foreground'>The quick brown fox jumps over the lazy dog</p>
                                </div>
                            ))}
                        </div>
                        }
                       
                        <div className='col-span-2 space-y-2'>
                            <Label >Brand Description</Label>
                            <Textarea value={description} readOnly />
                        </div>


                        {colors.length>0&&
                        <div className='col-span-2 space-y-2'>
                            <Label >Brand Colors</Label>
                            <div className='flex flex-wrap gap-4'>
                                {colors.map((hexColor, i) => (
                                    <div key={i}>
                                        <div className={cn("w-20 h-20 border rounded-xl")}
                                            style={{ backgroundColor: hexColor}}
                                        >
                                        </div>
                                        <p className='mt-2 text-center'>
                                            {hexColor}
                                        </p>
                                    </div>
                                ))}

                            </div>
                        </div>
                        }
                        
                        <div className='col-span-2 space-y-2'>
                                <Label >Brand Images</Label>
                                 <div className='flex flex-wrap gap-4'>
                                <div className="w-64 h-64 overflow-hidden rounded-xl border">
                                    <img
                                        src={imgUrl}
                                        alt="brand image"
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>
                                <div className="w-64 h-64 overflow-hidden rounded-xl border">
                                    <img
                                        src={imgUrl}
                                        alt="brand image"
                                        className="w-full h-full object-cover object-bottom"
                                    />
                                </div>

                            </div>
                        </div>
                        
                    </div>
                </CardContent>
                <CardFooter className='flex justify-end gap-2'>
                    <Button type="submit" variant={"secondary"} 
                    disabled={isPending}
                    onClick={()=>router.push("/dashboard")}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" className="p-4 cursor-pointer"
                    onClick={()=>submit()}
                    disabled={isPending}
                    >
                        Save
                    </Button>
                </CardFooter>
            </Card>

        </>
    )
}

