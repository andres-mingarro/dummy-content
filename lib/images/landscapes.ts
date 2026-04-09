import { NATURE_LANDSCAPE_SVG_INNER } from "@/components/images/SvgPresetGenerator";

export type LandscapeSubType =
  | "nature"
  | "desert"
  | "mountain-river"
  | "tree-forest"
  | "river"
  | "waterfall";

export const LANDSCAPE_SUB_TYPES: LandscapeSubType[] = [
  "nature",
  "desert",
  "mountain-river",
  "tree-forest",
  "river",
  "waterfall",
];

export function parseLandscapeSubType(raw: string | null): LandscapeSubType {
  if (raw && LANDSCAPE_SUB_TYPES.includes(raw as LandscapeSubType))
    return raw as LandscapeSubType;
  return "nature";
}

// SVG inner content for each landscape sub-type (viewBox="0 0 600 400")
// Source SVGs live in components/images/SvgPresetGenerator/SvgSource/nature/
export const LANDSCAPE_SVG_INNER: Record<LandscapeSubType, string> =
  NATURE_LANDSCAPE_SVG_INNER;

export function buildLandscapeSVG(W: number, H: number, subType: LandscapeSubType): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">${LANDSCAPE_SVG_INNER[subType]}</svg>`;
}
