"use client";

import { createContext, useContext, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { translations, type Lang, type Translations } from "@/lib/i18n/translations";

interface LangContextValue {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
  /** Prefija una ruta interna con el idioma activo: `/images` → `/es/images` en español. */
  href: (path: string) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

/** Ruta equivalente en el otro idioma: `/images` ↔ `/es/images`. */
function swapLangPath(pathname: string): string {
  if (pathname === "/es") return "/";
  if (pathname.startsWith("/es/")) return pathname.slice(3);
  return pathname === "/" ? "/es" : `/es${pathname}`;
}

/**
 * El idioma lo determina la ruta, no el estado de cliente: el inglés se sirve en la raíz y el
 * español bajo `/es`. Así el `<html lang>` renderizado en el servidor siempre coincide con el
 * contenido, y cada idioma tiene su propia URL indexable.
 */
export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const toggleLang = useCallback(() => {
    const target = swapLangPath(pathname);
    // La query se preserva porque las páginas sincronizan su estado con la URL (ej. /text).
    router.push(`${target}${typeof window === "undefined" ? "" : window.location.search}`);
  }, [pathname, router]);

  const href = useCallback(
    (path: string) => (lang === "es" ? (path === "/" ? "/es" : `/es${path}`) : path),
    [lang],
  );

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggleLang, href }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
