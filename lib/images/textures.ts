import { TEXTURE_SVG_MAP, type TextureSubType } from "@/components/images/SvgPresetGenerator";
export type { TextureSubType } from "@/components/images/SvgPresetGenerator";

export const TEXTURE_SUB_TYPES: TextureSubType[] = [
  "bullseye-gradient",
  "liquid-cheese",
  "radiant-gradient",
  "subtle-prism",
  "wavey-fingerprint",
  "zig-zag",
];

export function parseTextureSubType(raw: string | null): TextureSubType {
  if (raw && (TEXTURE_SUB_TYPES as string[]).includes(raw)) return raw as TextureSubType;
  return "bullseye-gradient";
}

export function buildTextureSVG(W: number, H: number, subType: TextureSubType): string {
  const { inner, mode } = TEXTURE_SVG_MAP[subType];
  if (mode.type === "gradient") {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="${mode.viewBox}" preserveAspectRatio="xMidYMid slice" overflow="hidden">${inner}</svg>`;
  }
  const tw = mode.width!;
  const th = mode.height!;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><pattern id="tex" x="0" y="0" width="${tw}" height="${th}" patternUnits="userSpaceOnUse">${inner}</pattern></defs><rect width="${W}" height="${H}" fill="url(#tex)"/></svg>`;
}
