
type Typography={
  fontFamilies: string[],
      h1: string[],
      h2:string[],
      p: string[],
}

export const extractTypography = async (page: any):Promise<Typography>=> {

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

    const getH1Text = ():string[] =>
      Array.from(document.querySelectorAll("h1"))
        .slice(0, 3)
        .map(h => h.textContent?.trim() || "");

        const getH2Text = ():string[] =>
      Array.from(document.querySelectorAll("h2"))
        .slice(0, 3)
        .map(h => h.textContent?.trim() || "");

    const getPText = ():string[] =>
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
