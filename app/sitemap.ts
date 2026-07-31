import type { MetadataRoute } from "next";
import { INDEXABLE_PATHS, absoluteUrl, type PagePath } from "@/lib/seo/urls";

const LAST_MODIFIED = new Date("2026-07-31");

const PRIORITY: Record<PagePath, number> = {
  "": 1,
  "/images": 0.9,
  "/text": 0.9,
  "/iframe": 0.9,
  "/support": 0.3,
  "/terms": 0.1,
};

/**
 * Cada ruta se lista en sus dos versiones de idioma, y cada entrada declara los `alternates`
 * hreflang hacia la otra. Sin esto Google solo puede indexar la mitad del contenido escrito.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_PATHS.flatMap((path) =>
    (["en", "es"] as const).map((lang) => ({
      url: absoluteUrl(path, lang),
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: PRIORITY[path],
      alternates: {
        languages: {
          en: absoluteUrl(path, "en"),
          es: absoluteUrl(path, "es"),
          "x-default": absoluteUrl(path, "en"),
        },
      },
    })),
  );
}
