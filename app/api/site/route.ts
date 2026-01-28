import { NextRequest, NextResponse } from "next/server";
import { scrapeData } from "@/lib/playwright/scrapData";
import { uploadImg } from "@/lib/uploadImg";
import { appDescription } from "@/lib/ai/appDescription";
import { handleApiError } from "@/lib/handleApiError";

export async function POST(req: NextRequest) {
    try{
    
    const {url}=await req.json()

    if (!url) return NextResponse.json({message:"Url is required"},{status:400})

    const data = await scrapeData(url)

    const text=await appDescription(data.h1,data.h2,data.p)

    const img_url=await uploadImg(data.ss,"screenshots")

    return NextResponse.json({
        colors:data.brandColors,
        fontFamily:data.fontFamilies,
        imgUrl:img_url,
        name:data.appName,
        url:data.url,
        ai:text,
    })
    }
    catch(err){
        return handleApiError(err)
    }
   
}