import { NextRequest,NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db/db";
import { site } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function GET(){
    try{
         const session = await auth.api.getSession({
        headers: await headers() })
        
        if(!session) return NextResponse.json({message:"Unauthorized"},{status:401})
        const userId=session?.user.id  
        
        const result=await db.select({
            name:site.site,
            id:site.id,
            imgUrl:site.siteImg,
            url:site.siteUrl
        }).from(site).where(eq(site.userId,userId))
        
        if(result.length<=0){
            return NextResponse.json({
            success:false,
        },{status:200})
        }

        return NextResponse.json({
            success:true,
            data:result
        },{status:200})
    }
    catch{
         return NextResponse.json({
            message:"Internal Server Error"
        },{status:500})
    }
}

export async function DELETE(req:NextRequest){
    try{
         const session = await auth.api.getSession({
        headers: await headers() })
        
        if(!session) return NextResponse.json({message:"Unauthorized"},{status:401})
        const userId=session?.user.id  
    
        const {id}=await req.json()

        await db.delete(site).where(
            and(eq(site.id, id), eq(site.userId, userId))      )
        

        return NextResponse.json({
           message:"Brand is deleted"
        },{status:200})
    }
    catch(err){

         return NextResponse.json({
            message:"Internal Server Error"
        },{status:500})
    }
}