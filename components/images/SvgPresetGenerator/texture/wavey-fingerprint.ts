import type { TextureRenderMode } from "./index";

// tile — repeating pattern 1000×120
export const DEFAULT_COLORS: Record<string, string> = {
  "primary-color":   "#000000",
  "secondary-color": "#222222",
};

export function buildInner(colors: Record<string, string> = {}): string {
  const c = { ...DEFAULT_COLORS, ...colors };
  return `<rect fill='${c["primary-color"]}' width='1000' height='120'/><g fill='none' stroke='${c["secondary-color"]}' stroke-width='10' stroke-opacity='1'><path d='M-500 75c0 0 125-30 250-30S0 75 0 75s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/><path d='M-500 45c0 0 125-30 250-30S0 45 0 45s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/><path d='M-500 105c0 0 125-30 250-30S0 105 0 105s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/><path d='M-500 15c0 0 125-30 250-30S0 15 0 15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/><path d='M-500-15c0 0 125-30 250-30S0-15 0-15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/><path d='M-500 135c0 0 125-30 250-30S0 135 0 135s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/></g>`;
}

export const RENDER_MODE: TextureRenderMode = { type: "tile", width: 1000, height: 120 };
