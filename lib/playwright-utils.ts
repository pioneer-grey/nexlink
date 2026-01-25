import { chromium } from "playwright"
import { URL } from "url";
import net from "net";

const isPrivateIP = (ip: string) => {
    if (!net.isIP(ip)) return false;

    return (
        ip.startsWith("10.") ||
        ip.startsWith("192.168.") ||
        ip.startsWith("172.") ||
        ip === "127.0.0.1" ||
        ip === "::1" ||
        ip === "169.254.169.254"
    );
};

export const validateUrl = (input: string) => {
    let parsed: URL;

    try {
        parsed = new URL(input);
    } catch {
        throw new Error("Invalid URL");
    }

    if (!["http:", "https:"].includes(parsed.protocol)) {
        throw new Error("Invalid URL protocol");
    }

    if (
        parsed.hostname === "localhost" ||
        parsed.hostname.endsWith(".local")
    ) {
        throw new Error("Localhost URLs are not allowed");
    }


    if (isPrivateIP(parsed.hostname)) {
        throw new Error("Private IPs are not allowed");
    }

    return parsed.toString();
};


export const scrapeData = async (rawUrl: string, timeout: number = 15_000) => {

    const url = validateUrl(rawUrl);


    const browser = await chromium.launch({ headless: true })
    const context = await browser.newContext()
    const page = await context.newPage()
    try {


        await page.goto(url, { waitUntil: "domcontentloaded", timeout: timeout })
        await page.waitForSelector("body");

        const data = await page.evaluate(() => {
            const elements = Array.from(document.querySelectorAll("*"));

            const fontFamilies = new Set<string>();
            const fontSizes = new Set<string>();
            const textColors = new Set<string>();
            const backgroundColors = new Set<string>();

            const rgbHex = (rgb: string) => {
                const result = rgb.match(/\d+/g);
                if (!result) return null;

                return (
                    "#" +
                    result
                        .slice(0, 3)
                        .map(x => Number(x).toString(16).padStart(2, "0"))
                        .join("")
                );
            }


            elements.forEach(el => {
                const style = getComputedStyle(el);


                if (style.fontFamily) fontFamilies.add(style.fontFamily);
                if (style.fontSize) fontSizes.add(style.fontSize);

                const text = rgbHex(style.color);
                if (text) textColors.add(text);

                const bg = rgbHex(style.backgroundColor);
                if (bg) backgroundColors.add(bg);
            });

            return {
                fonts: [...fontFamilies],
                fontSizes: [...fontSizes],
                textColors: [...textColors],
                backgroundColors: [...backgroundColors],
                h1: [...document.querySelectorAll("h1")].map(e => e.textContent?.trim()).filter(Boolean),
                p: [...document.querySelectorAll("p")].map(e => e.textContent?.trim()).filter(Boolean),
            };
        });

        return data
    }
    finally {
        await browser.close();
    }
}


