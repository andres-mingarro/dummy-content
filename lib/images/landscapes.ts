import { NATURE_LANDSCAPE_SVG_MAP } from "@/components/images/SvgPresetGenerator";

export type LandscapeSubType =
  | "forest"
  | "desert"
  | "city"
  | "beach"
  | "park"
  | "meadow"
  | "valley"
  | "dunes"
  | "ocean"
  | "farmland"
  | "alpine"
  | "dawn";

export const LANDSCAPE_SUB_TYPES: LandscapeSubType[] = [
  "forest",
  "desert",
  "city",
  "beach",
  "park",
  "meadow",
  "valley",
  "dunes",
  "ocean",
  "farmland",
  "alpine",
  "dawn",
];

export function parseLandscapeSubType(raw: string | null): LandscapeSubType {
  if (raw && LANDSCAPE_SUB_TYPES.includes(raw as LandscapeSubType))
    return raw as LandscapeSubType;
  return "forest";
}

// SVG inner content + native viewBox for each landscape sub-type
// Source SVGs live in components/images/SvgPresetGenerator/SvgSource/nature/
export const LANDSCAPE_SVG_MAP = NATURE_LANDSCAPE_SVG_MAP;

export function buildLandscapeSVG(W: number, H: number, subType: LandscapeSubType): string {
  const { inner, viewBox } = LANDSCAPE_SVG_MAP[subType];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="${viewBox}" preserveAspectRatio="xMidYMid slice">${inner}</svg>`;
}
