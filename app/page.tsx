"use client";

import Link from "next/link";
import { bebasNeue } from "@/components/shared/Logo/Logo";
import { useLang } from "@/providers/LangProvider";
import { LightRays } from "@/components/shared/LightRays/LightRays";
import { AuroraText } from "@/components/shared/AuroraText/AuroraText";
import styles from "./page.module.scss";

const tools = [
  {
    href: "/images",
    key: "image" as const,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
    ),
    description: {
      en: "Generate placeholder images instantly from a parametrized URL.",
      es: "Generá imágenes placeholder al instante desde una URL parametrizada.",
    },
  },
  {
    href: "/text",
    key: "text" as const,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 7V4h16v3" />
        <path d="M9 20h6" />
        <path d="M12 4v16" />
      </svg>
    ),
    description: {
      en: "Generate realistic placeholder text: paragraphs, sentences or words.",
      es: "Generá texto placeholder realista: párrafos, oraciones o palabras.",
    },
  },
  {
    href: "/iframe",
    key: "iframe" as const,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="m8 10-3 3 3 3" />
        <path d="m16 10 3 3-3 3" />
      </svg>
    ),
    description: {
      en: "Generate embeddable iframes with dummy articles, images and cards.",
      es: "Generá iframes embebibles con artículos, imágenes y cards.",
    },
  },
];

const labels = {
  en: { image: "DUMMY IMAGE", text: "DUMMY TEXT", iframe: "DUMMY IFRAME" },
  es: { image: "DUMMY IMAGE", text: "DUMMY TEXT", iframe: "DUMMY IFRAME" },
};

export default function Home() {
  const { lang } = useLang();

  return (
    <main
      className="flex-1 flex flex-col items-center justify-center px-4 py-16 HomePage"
      style={{ background: "var(--background)", position: "relative" }}
    >
      <LightRays color="#036b83" blur={48} count={8} speed={12} length="80vh" />
      {/* Hero */}
      <div className={`text-center space-y-4 mb-16 ${styles.hero}`}>
        <h1 className={bebasNeue.className} style={{ color: "#07CFFE", lineHeight: 1 }}>
          &lt;<AuroraText colors={["#07CFFE", "#a78bfa", "#38bdf8", "#07CFFE"]} speed={0.8}>DUMMY</AuroraText>Content/&gt;
        </h1>
        <p style={{ fontSize: "1.125rem", color: "var(--muted)", maxWidth: "480px", margin: "0 auto" }}>
          {lang === "en"
            ? "Free tools to generate placeholder content for your projects."
            : "Herramientas gratuitas para generar contenido placeholder para tus proyectos."}
        </p>
      </div>

      {/* Tools */}
      <div className="grid grid-cols-1 gap-4 w-full" style={{ maxWidth: "640px" }}>
        {tools.map(({ href, key, icon, description }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center gap-5 rounded-2xl p-6 transition-all"
            style={{
              background: "var(--card)",
              border: "1.5px solid var(--card-border)",
              textDecoration: "none",
            }}
          >
            <div
              className="shrink-0 rounded-xl flex items-center justify-center transition-colors"
              style={{
                width: "56px",
                height: "56px",
                background: "var(--accent-bg)",
                color: "var(--accent)",
              }}
            >
              {icon}
            </div>
            <div className="flex-1 space-y-1">
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  color: "var(--accent)",
                }}
              >
                {labels[lang][key]}
              </div>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.5 }}>
                {description[lang]}
              </p>
            </div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ color: "var(--muted)", flexShrink: 0 }}
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        ))}
      </div>
    </main>
  );
}
