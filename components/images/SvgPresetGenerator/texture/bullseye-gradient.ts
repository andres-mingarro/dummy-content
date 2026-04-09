import type { TextureRenderMode } from "./index";

// gradient — preserveAspectRatio xMidYMid slice over viewBox 0 0 800 800
// primary-color: outermost ring / background; secondary through senary: inner rings inward
export const DEFAULT_COLORS: Record<string, string> = {
  "primary-color":    "#000000",
  "secondary-color":  "#230046",
  "tertiary-color":   "#2f0052",
  "quaternary-color": "#3b075e",
  "quinary-color":    "#48156a",
  "senary-color":     "#552277",
};

export function buildInner(colors: Record<string, string> = {}): string {
  const c = { ...DEFAULT_COLORS, ...colors };
  return `<rect fill='${c["primary-color"]}' width='800' height='800'/><g fill-opacity='1'><circle fill='${c["primary-color"]}' cx='400' cy='400' r='600'/><circle fill='${c["secondary-color"]}' cx='400' cy='400' r='500'/><circle fill='${c["tertiary-color"]}' cx='400' cy='400' r='400'/><circle fill='${c["quaternary-color"]}' cx='400' cy='400' r='300'/><circle fill='${c["quinary-color"]}' cx='400' cy='400' r='200'/><circle fill='${c["senary-color"]}' cx='400' cy='400' r='100'/></g>`;
}

export const RENDER_MODE: TextureRenderMode = { type: "gradient", viewBox: "0 0 800 800" };
