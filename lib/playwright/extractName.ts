

export const extractName = async (page: any):Promise<string> => {
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
