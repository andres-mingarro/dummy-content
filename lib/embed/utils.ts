import { fakerEN, fakerES } from "@faker-js/faker";
import type { Lang } from "@/lib/i18n/translations";

export type Palette = { bg: string; fg: string; design: string; subType?: string };

export const PALETTES: Palette[] = [
  { bg: "c7d2fe", fg: "4338ca", design: "solid" },
  { bg: "86efac", fg: "166534", design: "landscape", subType: "nature" },
  { bg: "fca5a5", fg: "991b1b", design: "solid" },
  { bg: "fde68a", fg: "92400e", design: "texture",   subType: "liquid-cheese" },
  { bg: "a5f3fc", fg: "0e7490", design: "landscape", subType: "mountain-river" },
  { bg: "d8b4fe", fg: "6d28d9", design: "texture",   subType: "subtle-prism" },
  { bg: "fbcfe8", fg: "9d174d", design: "user",      subType: "style-3" },
  { bg: "fed7aa", fg: "9a3412", design: "solid" },
  { bg: "bfdbfe", fg: "1e40af", design: "texture",   subType: "bullseye-gradient" },
  { bg: "bbf7d0", fg: "14532d", design: "landscape", subType: "waterfall" },
  { bg: "fef08a", fg: "713f12", design: "texture",   subType: "zig-zag" },
  { bg: "e9d5ff", fg: "581c87", design: "user",      subType: "style-5" },
];

export const HERO_PALETTES: Palette[] = [
  { bg: "87ceeb", fg: "1565c0", design: "landscape", subType: "river" },
  { bg: "a5d6a7", fg: "1b5e20", design: "landscape", subType: "tree-forest" },
  { bg: "c7d2fe", fg: "4338ca", design: "texture",   subType: "radiant-gradient" },
  { bg: "fde68a", fg: "92400e", design: "texture",   subType: "wavey-fingerprint" },
  { bg: "bfdbfe", fg: "1e40af", design: "landscape", subType: "desert" },
  { bg: "e9d5ff", fg: "581c87", design: "user",      subType: "style-1" },
];

export const IMAGES_LIST_PALETTES: Palette[] = [
  { bg: "c7d2fe", fg: "4338ca", design: "solid" },
  { bg: "86efac", fg: "166534", design: "landscape", subType: "nature" },
  { bg: "fca5a5", fg: "991b1b", design: "solid" },
  { bg: "fde68a", fg: "92400e", design: "texture",   subType: "liquid-cheese" },
  { bg: "a5f3fc", fg: "0e7490", design: "landscape", subType: "mountain-river" },
  { bg: "d8b4fe", fg: "6d28d9", design: "texture",   subType: "subtle-prism" },
  { bg: "fed7aa", fg: "9a3412", design: "solid" },
  { bg: "bfdbfe", fg: "1e40af", design: "texture",   subType: "bullseye-gradient" },
  { bg: "bbf7d0", fg: "14532d", design: "landscape", subType: "waterfall" },
  { bg: "fef08a", fg: "713f12", design: "texture",   subType: "zig-zag" },
  { bg: "f0abfc", fg: "701a75", design: "landscape", subType: "desert" },
  { bg: "99f6e4", fg: "134e4a", design: "texture",   subType: "radiant-gradient" },
];

export const TEXTURE_HERO_PALETTES: Palette[] = [
  { bg: "1a1a2e", fg: "e0e0e0", design: "texture", subType: "bullseye-gradient" },
  { bg: "ffaa00", fg: "1a1a1a", design: "texture", subType: "liquid-cheese" },
  { bg: "cc5577", fg: "fff8f0", design: "texture", subType: "radiant-gradient" },
  { bg: "0f172a", fg: "94a3b8", design: "texture", subType: "subtle-prism" },
  { bg: "000000", fg: "444444", design: "texture", subType: "wavey-fingerprint" },
  { bg: "00bb77", fg: "003322", design: "texture", subType: "zig-zag" },
];

export const CATEGORIES: Record<Lang, string[]> = {
  en: ["Technology", "Science", "Business", "Sports", "Entertainment", "Health", "Politics", "World"],
  es: ["Tecnología", "Ciencia", "Negocios", "Deportes", "Entretenimiento", "Salud", "Política", "Mundo"],
};

export const BASE_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { font-size: 16px; }
`;

export function getFaker(lang: Lang) {
  return lang === "es" ? fakerES : fakerEN;
}

export function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function formatDate(d: Date, lang: Lang): string {
  return d.toLocaleDateString(lang === "es" ? "es-ES" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function imgUrl(w: number, h: number, p: Palette): string {
  if (p.design === "solid") return `/api/image/${w}x${h}/${p.bg}/${p.fg}`;
  let q = `?design=${p.design}`;
  if (p.subType) {
    if (p.design === "landscape") q += `&landscape=${p.subType}`;
    else if (p.design === "user")  q += `&user=${p.subType}`;
    else if (p.design === "texture") q += `&texture=${p.subType}`;
  }
  return `/api/image/${w}x${h}/${p.bg}/${p.fg}${q}`;
}
