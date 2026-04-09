const MAX_SIZE = 4000;
const MIN_SIZE = 1;

function escXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export type { LandscapeSubType } from "./landscapes";
export { LANDSCAPE_SUB_TYPES, parseLandscapeSubType } from "./landscapes";
import { buildLandscapeSVG, parseLandscapeSubType, type LandscapeSubType } from "./landscapes";

export type { UserSubType } from "./users";
export { USER_SUB_TYPES, parseUserSubType } from "./users";
import { buildUserSVG, parseUserSubType, type UserSubType } from "./users";

export type { TextureSubType } from "./textures";
export { TEXTURE_SUB_TYPES, parseTextureSubType } from "./textures";
import { buildTextureSVG, parseTextureSubType, type TextureSubType } from "./textures";

export type DesignType = "solid" | "landscape" | "user" | "texture";
const DESIGN_TYPES: DesignType[] = ["solid", "landscape", "user", "texture"];

function parseSize(sizeStr: string): { width: number; height: number } | null {
  const match = sizeStr.match(/^(\d+)x(\d+)$/i);
  if (!match) return null;
  const width = parseInt(match[1], 10);
  const height = parseInt(match[2], 10);
  if (width < MIN_SIZE || width > MAX_SIZE || height < MIN_SIZE || height > MAX_SIZE) return null;
  return { width, height };
}

function normalizeHex(color: string): string | null {
  const clean = color.replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(clean)) {
    return `#${clean[0]}${clean[0]}${clean[1]}${clean[1]}${clean[2]}${clean[2]}`;
  }
  if (/^[0-9a-fA-F]{6}$/.test(clean)) {
    return `#${clean}`;
  }
  return null;
}

export function parseDesign(raw: string | null): DesignType {
  if (raw && DESIGN_TYPES.includes(raw as DesignType)) return raw as DesignType;
  return "solid";
}

export interface ImageParams {
  width: number;
  height: number;
  bgColor: string;
  textColor: string;
  label?: string;
  noText?: boolean;
  design: DesignType;
  landscapeSubType?: LandscapeSubType;
  userSubType?: UserSubType;
  textureSubType?: TextureSubType;
}

export function parseImageParams(
  params: string[],
  design: DesignType,
  landscapeSubType?: LandscapeSubType,
  userSubType?: UserSubType,
  textureSubType?: TextureSubType,
  noText?: boolean,
): ImageParams | { error: string } {
  if (params.length < 1) return { error: "Parámetros insuficientes" };

  const size = parseSize(params[0]);
  if (!size) return { error: `Tamaño inválido: "${params[0]}". Formato esperado: {ancho}x{alto} (1-${MAX_SIZE}px)` };

  const bgRaw = params[1] ?? "cccccc";
  const textRaw = params[2] ?? "333333";

  const bgColor = normalizeHex(bgRaw);
  if (!bgColor) return { error: `Color de fondo inválido: "${bgRaw}"` };

  const textColor = normalizeHex(textRaw);
  if (!textColor) return { error: `Color de texto inválido: "${textRaw}"` };

  const label = params[3] ? decodeURIComponent(params[3]) : `${size.width}x${size.height}`;

  return { width: size.width, height: size.height, bgColor, textColor, label, noText, design, landscapeSubType, userSubType, textureSubType };
}

// ── Solid ────────────────────────────────────────────────────────────────────

function solidSVG({ width, height, bgColor, textColor, label, noText }: ImageParams): string {
  const fontSize = Math.max(10, Math.min(Math.floor(Math.min(width, height) * 0.12), 48));
  const textEl = noText ? "" : `\n  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"\n    font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" fill="${textColor}"\n  >${escXml(label ?? "")}</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${bgColor}"/>${textEl}
</svg>`;
}

// ── Landscape ────────────────────────────────────────────────────────────────

function landscapeSVG({ width: W, height: H, landscapeSubType }: ImageParams): string {
  return buildLandscapeSVG(W, H, parseLandscapeSubType(landscapeSubType ?? null));
}

// ── User ─────────────────────────────────────────────────────────────────────

function userSVG({ width: W, height: H, userSubType }: ImageParams): string {
  return buildUserSVG(W, H, parseUserSubType(userSubType ?? null));
}

// ── Texture ──────────────────────────────────────────────────────────────────

function textureSVG({ width: W, height: H, textureSubType, label, noText }: ImageParams): string {
  return buildTextureSVG(W, H, parseTextureSubType(textureSubType ?? null), undefined, noText ? "" : label);
}

// ── Dispatcher ───────────────────────────────────────────────────────────────

export function generateSVG(params: ImageParams): string {
  switch (params.design) {
    case "landscape": return landscapeSVG(params);
    case "user":      return userSVG(params);
    case "texture":   return textureSVG(params);
    default:          return solidSVG(params);
  }
}
