import { NextRequest, NextResponse } from "next/server";
import { scrapeData } from "@/lib/playwright-utils";
import { uploadScreenshot } from "@/lib/upload-ss";
import { generateText } from 'ai';
import { groq } from '@ai-sdk/groq';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const url = searchParams.get("url")

    if (!url) return null
    const data = await scrapeData(url)

        const { text } = await generateText({
            model: groq('llama-3.3-70b-versatile'),
            prompt: `Generate a clear 100 words description of the website.
    H1: ${data.h1},
    H2:${data.h2}
    Paragraph: ${data.p}`,
        });
    const img_url=await uploadScreenshot(data.ss)

    return NextResponse.json({
        colors:data.brandColors,
        fontFamily:data.fontFamilies,
        imgUrl:img_url,
        name:data.appName,
        url:data.url,
        ai:text,
    })
}