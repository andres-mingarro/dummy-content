export type TextureSubType =
  | "bullseye-gradient"
  | "liquid-cheese"
  | "radiant-gradient"
  | "subtle-prism"
  | "wavey-fingerprint"
  | "zig-zag";

export interface TextureRenderMode {
  type: "gradient" | "tile";
  viewBox?: string;   // gradient
  width?: number;     // tile
  height?: number;    // tile
}

export interface TextureEntry {
  inner: string;
  mode: TextureRenderMode;
}

import { SVG_INNER as BULLSEYE_I, RENDER_MODE as BULLSEYE_M } from "./bullseye-gradient";
import { SVG_INNER as CHEESE_I,   RENDER_MODE as CHEESE_M }   from "./liquid-cheese";
import { SVG_INNER as RADIANT_I,  RENDER_MODE as RADIANT_M }  from "./radiant-gradient";
import { SVG_INNER as PRISM_I,    RENDER_MODE as PRISM_M }    from "./subtle-prism";
import { SVG_INNER as WAVEY_I,    RENDER_MODE as WAVEY_M }    from "./wavey-fingerprint";
import { SVG_INNER as ZIGZAG_I,   RENDER_MODE as ZIGZAG_M }   from "./zig-zag";

export const TEXTURE_SVG_MAP: Record<TextureSubType, TextureEntry> = {
  "bullseye-gradient": { inner: BULLSEYE_I, mode: BULLSEYE_M },
  "liquid-cheese":     { inner: CHEESE_I,   mode: CHEESE_M },
  "radiant-gradient":  { inner: RADIANT_I,  mode: RADIANT_M },
  "subtle-prism":      { inner: PRISM_I,    mode: PRISM_M },
  "wavey-fingerprint": { inner: WAVEY_I,    mode: WAVEY_M },
  "zig-zag":           { inner: ZIGZAG_I,   mode: ZIGZAG_M },
};
