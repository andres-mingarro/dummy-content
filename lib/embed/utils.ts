import { fakerEN, fakerES } from "@faker-js/faker";
import type { Lang } from "@/lib/i18n/translations";

export type Palette = { bg: string; fg: string; design: string };

export const PALETTES: Palette[] = [
  { bg: "c7d2fe", fg: "4338ca", design: "solid" },
  { bg: "86efac", fg: "166534", design: "landscape" },
  { bg: "fca5a5", fg: "991b1b", design: "solid" },
  { bg: "fde68a", fg: "92400e", design: "texture" },
  { bg: "a5f3fc", fg: "0e7490", design: "landscape" },
  { bg: "d8b4fe", fg: "6d28d9", design: "texture" },
  { bg: "fbcfe8", fg: "9d174d", design: "user" },
  { bg: "fed7aa", fg: "9a3412", design: "solid" },
  { bg: "bfdbfe", fg: "1e40af", design: "solid" },
  { bg: "bbf7d0", fg: "14532d", design: "landscape" },
  { bg: "fef08a", fg: "713f12", design: "texture" },
  { bg: "e9d5ff", fg: "581c87", design: "user" },
];

export const HERO_PALETTES: Palette[] = [
  { bg: "87ceeb", fg: "1565c0", design: "landscape" },
  { bg: "a5d6a7", fg: "1b5e20", design: "landscape" },
  { bg: "c7d2fe", fg: "4338ca", design: "texture" },
  { bg: "fde68a", fg: "92400e", design: "texture" },
  { bg: "bfdbfe", fg: "1e40af", design: "solid" },
  { bg: "e9d5ff", fg: "581c87", design: "solid" },
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
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
  const q = p.design !== "solid" ? `?design=${p.design}` : "";
  return `/api/image/${w}x${h}/${p.bg}/${p.fg}${q}`;
}
