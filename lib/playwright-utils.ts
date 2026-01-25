import { chromium } from "playwright"

export const scrapeData = async (url: string,timeout:number=15_000) => {
    const browser = await chromium.launch({ headless: true })
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto(url, { waitUntil: "networkidle", timeout: timeout })

    const data = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll("*"));

        const fontFamilies = new Set<string>();
        const fontSizes = new Set<string>();
        const textColors = new Set<string>();
        const backgroundColors = new Set<string>();

        elements.forEach(el => {
            const style = getComputedStyle(el);

            if (style.fontFamily) {
                fontFamilies.add(style.fontFamily);
            }

            // Font size
            if (style.fontSize) {
                fontSizes.add(style.fontSize);
            }

            // Text color
            const textHex = rgbHex(style.color);
            if (textHex) {
                textColors.add(textHex);
            }

            // Background color (ignore transparent)
            const bgHex = rgbHex(style.backgroundColor);
            if (bgHex && bgHex !== "transparent") {
                backgroundColors.add(bgHex);
            }
        });
        const h1 = Array.from(document.querySelectorAll("h1")).map(el =>
            el.textContent?.trim()
        ).filter(Boolean);

        const p = Array.from(document.querySelectorAll("p")).map(el =>
            el.textContent?.trim()
        ).filter(Boolean);

        return {
            fonts: Array.from(fontFamilies),
            fontSizes: Array.from(fontSizes),
            textColors: Array.from(textColors),
            backgroundColors: Array.from(backgroundColors),
        };
    })
    await browser.close();
    return data
}


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