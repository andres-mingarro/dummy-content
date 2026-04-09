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

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

export function buildTextureSVG(W: number, H: number, subType: TextureSubType, colors?: Record<string, string>, label?: string): string {
  const { buildInner, mode } = TEXTURE_SVG_MAP[subType];
  const inner = buildInner(colors);
  const fontSize = Math.max(10, Math.min(Math.floor(Math.min(W, H) * 0.12), 48));
  const resolvedLabel = label !== undefined ? label : `${W}x${H}`;
  const textEl = resolvedLabel
    ? `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700" fill="white" paint-order="stroke" stroke="rgba(0,0,0,0.45)" stroke-width="3" stroke-linejoin="round">${esc(resolvedLabel)}</text>`
    : "";

  if (mode.type === "gradient") {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><svg viewBox="${mode.viewBox}" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice">${inner}</svg>${textEl}</svg>`;
  }
  const tw = mode.width!;
  const th = mode.height!;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><pattern id="tex" x="0" y="0" width="${tw}" height="${th}" patternUnits="userSpaceOnUse">${inner}</pattern></defs><rect width="${W}" height="${H}" fill="url(#tex)"/>${textEl}</svg>`;
}
