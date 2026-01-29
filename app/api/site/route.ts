import { NextRequest,NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db/db";
import { site } from "@/db/schema";
import { SiteSnapshot } from "@/store/types";

export async function POST(req:NextRequest){
    try{
        const session = await auth.api.getSession({
        headers: await headers() })
        
        if(!session) return NextResponse.json({message:"Unauthorized"},{status:401})
        const userId=session?.user.id  
        
        const {name,url,imgUrl,description,
            fontFamily,colors} =await req.json() as SiteSnapshot

            
        await db.insert(site).values({
            site:name,
            siteUrl:url,
            siteColors:colors,
            siteDescription:description,
            siteFonts:fontFamily,
            siteImg:imgUrl,
            userId:userId
        })

        return NextResponse.json({
            message:"Site saved successfully"
        },{status:200})
    }
    catch{
        return NextResponse.json({
            message:"Internal Server Error"
        },{status:500})
    }
}