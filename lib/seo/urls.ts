import type { Metadata } from "next";
import type { Lang } from "@/lib/i18n/translations";

/**
 * Host canónico del sitio. Tiene que coincidir con el dominio primario configurado en Vercel:
 * www.dummycontent.app redirige 308 → dummycontent.app.
 */
export const BASE_URL = "https://dummycontent.app";

/** Rutas de página traducidas, sin prefijo de idioma. `""` es la home. */
export type PagePath = "" | "/images" | "/text" | "/iframe" | "/support" | "/terms";

/** Rutas que van al sitemap, en las dos versiones de idioma. */
export const INDEXABLE_PATHS: PagePath[] = ["", "/images", "/text", "/iframe"];

/**
 * Prefija la ruta con el idioma. El inglés vive en la raíz (`/images`) y el español bajo `/es`
 * (`/es/images`). Las URLs de la API de imágenes y los embeds de iframe nunca se prefijan:
 * el idioma no forma parte de un asset.
 */
export function localizedPath(path: PagePath, lang: Lang): string {
  const prefixed = lang === "es" ? `/es${path}` : path;
  return prefixed || "/";
}

export function absoluteUrl(path: PagePath, lang: Lang): string {
  const localized = localizedPath(path, lang);
  return localized === "/" ? BASE_URL : `${BASE_URL}${localized}`;
}

/**
 * Canonical de la variante servida + hreflang hacia las dos versiones de idioma.
 * `x-default` apunta al inglés, que es la versión que se sirve sin prefijo.
 */
export function buildAlternates(path: PagePath, lang: Lang): Metadata["alternates"] {
  return {
    canonical: absoluteUrl(path, lang),
    languages: {
      en: absoluteUrl(path, "en"),
      es: absoluteUrl(path, "es"),
      "x-default": absoluteUrl(path, "en"),
    },
  };
}
