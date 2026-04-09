import { USER_SVG_INNER } from "@/components/images/SvgPresetGenerator";

export type UserSubType =
  | "style-1"
  | "style-2"
  | "style-3"
  | "style-4"
  | "style-5"
  | "style-6";

export const USER_SUB_TYPES: UserSubType[] = [
  "style-1",
  "style-2",
  "style-3",
  "style-4",
  "style-5",
  "style-6",
];

export function parseUserSubType(raw: string | null): UserSubType {
  if (raw && USER_SUB_TYPES.includes(raw as UserSubType))
    return raw as UserSubType;
  return "style-1";
}

// SVG inner content for each user sub-type (viewBox="0 0 600 400")
// Source SVGs live in components/images/SvgPresetGenerator/SvgSource/user/
export const USER_SVG_INNER_MAP: Record<UserSubType, string> = USER_SVG_INNER;

export function buildUserSVG(W: number, H: number, subType: UserSubType): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" overflow="hidden">${USER_SVG_INNER_MAP[subType]}</svg>`;
}
