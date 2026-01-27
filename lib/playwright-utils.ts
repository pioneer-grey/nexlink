import { chromium } from "playwright";
import { URL } from "url";
import net from "net";


const isPrivateIP = (ip: string) => {
  if (!net.isIP(ip)) return false;
  return (
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(ip) ||
    ip.startsWith("169.254.") ||
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip === "169.254.169.254"
  );
};

const validateUrl = (input: string) => {
  let parsed: URL;
  try {
    parsed = new URL(input);
  } catch {
    throw new Error("Invalid URL");
  }

  if (!["http:", "https:"].includes(parsed.protocol))
    throw new Error("Invalid URL protocol");

  if (
    parsed.hostname === "localhost" ||
    parsed.hostname.endsWith(".local")
  )
    throw new Error("Localhost URLs are not allowed");

  if (isPrivateIP(parsed.hostname))
    throw new Error("Private IPs are not allowed");

  return parsed.toString();
};

const extractBrandColors = async (page: any) => {
  return await page.evaluate(() => {
    const rgbToHex = (rgb: string) => {
      const m = rgb.match(/\d+/g);
      if (!m) return null;
      const [r, g, b] = m.map(Number);
      return (
        "#" +
        [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("")
      );
    };

    const isLargeEnough = (el: Element) => {
      const r = el.getBoundingClientRect();
      return r.width * r.height > 15_000; 
    };

    const colors: Record<string, number> = {};

    document
      .querySelectorAll("section, main, header, footer, div")
      .forEach(el => {
        if (!isLargeEnough(el)) return;

        const bg = getComputedStyle(el).backgroundColor;
        if (
          !bg ||
          bg === "transparent" ||
          bg === "rgba(0, 0, 0, 0)"
        )
          return;

        const hex = rgbToHex(bg);
        if (!hex) return;

        colors[hex] = (colors[hex] || 0) + 1;
      });

    return Object.entries(colors).map(([hex, count]) => ({
      hex,
      count
    }));
  });
};

const hexToRgb = (hex: string) =>
  hex.match(/\w\w/g)!.map(x => parseInt(x, 16));

const colorDistance = (a: number[], b: number[]) =>
  Math.sqrt(a.reduce((s, v, i) => s + (v - b[i]) ** 2, 0));

const mergeSimilarColors = (
  colors: { hex: string; count: number }[]
) => {
  const merged: { hex: string; count: number }[] = [];

  for (const c of colors) {
    const rgb = hexToRgb(c.hex);
    const existing = merged.find(m =>
      colorDistance(hexToRgb(m.hex), rgb) < 20
    );

    if (existing) {
      existing.count += c.count;
    } else {
      merged.push({ ...c });
    }
  }

  return merged;
};

const snapHex = (hex: string) => {
  const snap = (v: number) => Math.round(v / 5) * 5;
  const rgb = hexToRgb(hex).map(snap);
  return (
    "#" +
    rgb.map(v => v.toString(16).padStart(2, "0")).join("")
  );
};

const extractTypography = async (page: any) => {
  return await page.evaluate(() => {
    const getUniqueFontFamilies = () => {
      const fonts = Array.from(document.querySelectorAll("body *"))
        .map(el => getComputedStyle(el).fontFamily)
        .flatMap(f => f.split(","))    
        .map(f => f.trim())
        .filter(f => f.startsWith("__"))
        .map(f =>
          f
            .replace(/^__/, "")         
            .replace(/_Fallback.*$/i, "")
            .replace(/_[a-z0-9]+$/i, "") 
            .replace(/_/g, " ")          
            .trim()
        );

      return Array.from(new Set(fonts));
    };

    const getH1Text = () =>
      Array.from(document.querySelectorAll("h1"))
        .slice(0, 3)
        .map(h => h.textContent?.trim() || "");

        const getH2Text = () =>
      Array.from(document.querySelectorAll("h2"))
        .slice(0, 3)
        .map(h => h.textContent?.trim() || "");

    const getPText = () =>
      Array.from(document.querySelectorAll("p"))
        .slice(0, 5)
        .map(p => p.textContent?.trim() || "");

    return {
      fontFamilies: getUniqueFontFamilies(),
      h1: getH1Text(),
      h2:getH2Text(),
      p: getPText(),
    };
  });
};

const extractAppName = async (page: any) => {
  return await page.evaluate(() => {
    const clean = (s?: string | null) =>
      s?.replace(/\s+\|.+$/, "").replace(/\s+-\s+.+$/, "").trim();

    const metaApp =
      document.querySelector('meta[name="application-name"]')?.getAttribute("content");

    const ogSite =
      document.querySelector('meta[property="og:site_name"]')?.getAttribute("content");

    const title = clean(document.title);

    return (
      clean(metaApp) ||
      clean(ogSite) ||
      title ||
      window.location.hostname.replace(/^www\./, "")
    );
  });
};

const takeScreenshotBuffer = async (page: any) => {
  const buffer = await page.screenshot({
    fullPage: true,
    type: "png"
  });

  return buffer; 
};


export const scrapeData = async (
  rawUrl: string,
  timeout = 15000
) => {
  const url = validateUrl(rawUrl);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout
    });
    await page.waitForSelector("body");

    const screenShot=await takeScreenshotBuffer(page)
    let colors:{hex:string,count:number}[] = await extractBrandColors(page);

    colors = colors.filter(
      c => !["#ffffff", "#000000"].includes(c.hex.toLowerCase())
    );
   

    colors = mergeSimilarColors(colors)
      .map(c => ({
        hex: snapHex(c.hex),
        count: c.count
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

      const typography = await extractTypography(page);
      const appName=await extractAppName(page)
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
