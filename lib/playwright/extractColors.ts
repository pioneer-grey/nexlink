

export const extractColors = async (page: any) => {
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

const hexToRgb = (hex: string): number[] => {
  const match = hex.match(/[0-9a-fA-F]{2}/g);
  if (!match || match.length < 3) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return match.slice(0, 3).map(x => parseInt(x, 16));
};

const colorDistance = (a: number[], b: number[]) =>
  Math.sqrt(a.reduce((s, v, i) => s + (v - b[i]) ** 2, 0));



export const mergeColors = (
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



export const snapHex = (hex: string) => {
  const snap = (v: number) => Math.round(v / 5) * 5;
  const rgb = hexToRgb(hex).map(snap);
  return (
    "#" +
    rgb.map(v => v.toString(16).padStart(2, "0")).join("")
  );
};
