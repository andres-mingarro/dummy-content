import type { TextureRenderMode } from "./index";

// tile — repeating pattern 120×120
export const SVG_INNER = `<rect fill='#00bb77' width='120' height='120'/><polygon  fill='#000' fill-opacity='.1' points='120 0 120 60 90 30 60 0 0 0 0 0 60 60 0 120 60 120 90 90 120 60 120 0'/>`;
export const RENDER_MODE: TextureRenderMode = { type: "tile", width: 120, height: 120 };
