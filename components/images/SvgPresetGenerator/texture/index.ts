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
  buildInner: (colors?: Record<string, string>) => string;
  defaultColors: Record<string, string>;
  mode: TextureRenderMode;
}

import { buildInner as BULLSEYE_I, DEFAULT_COLORS as BULLSEYE_C, RENDER_MODE as BULLSEYE_M } from "./bullseye-gradient";
import { buildInner as CHEESE_I,   DEFAULT_COLORS as CHEESE_C,   RENDER_MODE as CHEESE_M }   from "./liquid-cheese";
import { buildInner as RADIANT_I,  DEFAULT_COLORS as RADIANT_C,  RENDER_MODE as RADIANT_M }  from "./radiant-gradient";
import { buildInner as PRISM_I,    DEFAULT_COLORS as PRISM_C,    RENDER_MODE as PRISM_M }    from "./subtle-prism";
import { buildInner as WAVEY_I,    DEFAULT_COLORS as WAVEY_C,    RENDER_MODE as WAVEY_M }    from "./wavey-fingerprint";
import { buildInner as ZIGZAG_I,   DEFAULT_COLORS as ZIGZAG_C,   RENDER_MODE as ZIGZAG_M }   from "./zig-zag";

export const TEXTURE_SVG_MAP: Record<TextureSubType, TextureEntry> = {
  "bullseye-gradient": { buildInner: BULLSEYE_I, defaultColors: BULLSEYE_C, mode: BULLSEYE_M },
  "liquid-cheese":     { buildInner: CHEESE_I,   defaultColors: CHEESE_C,   mode: CHEESE_M },
  "radiant-gradient":  { buildInner: RADIANT_I,  defaultColors: RADIANT_C,  mode: RADIANT_M },
  "subtle-prism":      { buildInner: PRISM_I,    defaultColors: PRISM_C,    mode: PRISM_M },
  "wavey-fingerprint": { buildInner: WAVEY_I,    defaultColors: WAVEY_C,    mode: WAVEY_M },
  "zig-zag":           { buildInner: ZIGZAG_I,   defaultColors: ZIGZAG_C,   mode: ZIGZAG_M },
};
