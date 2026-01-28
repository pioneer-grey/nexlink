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
import { cn } from '@/lib/utils'

type Props = {
    description: string,
    colors: { count: number, hex: string }[],
    fontFamily: string[],
    imgUrl: string,
    name: string,
    url: string,
}

export const SiteInfo = ({ colors, description, fontFamily, name, imgUrl, url }: Props) => {
    return (
        <>
            <Card className="w-full sm:max-w-sm md:max-w-2xl my-10">
                <CardHeader>
                    <CardTitle>Business DNA</CardTitle>
                    <CardDescription>
                    Our AI has captured your brand’s distinctive elements.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='name'>Business Name</Label>
                            <Input value={name} readOnly name='name' />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='url'>Business Url</Label>
                            <Input value={url} readOnly name='url' />
                        </div>


                        {fontFamily.length>0&&
                         <div className='col-span-2 space-y-2'>
                            <Label htmlFor='fontFamily '>Font Styles</Label>
                            {fontFamily.map((item, i) => (
                                <div key={i} className='border-2  h-auto flex flex-col justify-center p-2 rounded-xl'>
                                    <h5 className='font-bold'>{item}</h5>
                                    <p className='text-muted-foreground'>The quick brown fox jumps over the lazy dog</p>
                                </div>
                            ))}
                        </div>
                        }
                       
                        <div className='col-span-2 space-y-2'>
                            <Label >Description</Label>
                            <Textarea value={description} readOnly />
                        </div>


                        {colors.length>0&&
                        <div className='col-span-2 space-y-2'>
                            <Label >Brand Colors</Label>
                            <div className='flex flex-wrap gap-4'>
                                {colors.map((hexColor, i) => (
                                    <div key={i}>
                                        <div className={cn("w-20 h-20 border rounded-xl")}
                                            style={{ backgroundColor: hexColor.hex }}
                                        >
                                        </div>
                                        <p className='mt-2 text-center'>
                                            {hexColor.hex}
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
                    <Button type="submit" variant={"secondary"} >
                        Cancel
                    </Button>
                    <Button type="submit" className="p-4 cursor-pointer">
                        Save
                    </Button>
                </CardFooter>
            </Card>

        </>
    )
}

