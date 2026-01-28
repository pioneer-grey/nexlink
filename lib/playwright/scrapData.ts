import { chromium } from "playwright";
import { validateUrl } from "./validateUrl";
import { screenshotBuffer } from "./screenshotBuffer";
import { extractTypography } from "./extractTypography";
import { extractName } from "./extractName";
import { extractColors ,mergeColors,snapHex } from "./extractColors";

export const scrapeData = async (
  rawUrl: string,
  timeout = 15000
) => {
  const url = await validateUrl(rawUrl);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout
    });
    await page.waitForSelector("body");

    const screenShot=await screenshotBuffer(page)
    
    let colors:{hex:string,count:number}[] = await extractColors(page);
    colors = colors.filter(
      c => !["#ffffff", "#000000"].includes(c.hex.toLowerCase())
    );
   

    colors = mergeColors(colors)
      .map(c => ({
        hex: snapHex(c.hex),
        count: c.count
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

      const typography = await extractTypography(page);
      const appName=await extractName(page)


    return {
      url,
      brandColors: colors,
      fontFamilies: typography.fontFamilies,
      appName:appName,
      ss:screenShot,
      h1: typography.h1,
      h2:typography.h2,
      p: typography.p,
    };
  } finally {
    await browser.close();
  }
};
