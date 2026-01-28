
export const screenshotBuffer = async (page: any) => {
  const buffer = await page.screenshot({
    fullPage: true,
    type: "png"
  });

  return buffer; 
};
