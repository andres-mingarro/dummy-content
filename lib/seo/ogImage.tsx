import { ImageResponse } from "next/og";
import type { Lang } from "@/lib/i18n/translations";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const COPY: Record<Lang, { alt: string; subtitle: string; pills: string[] }> = {
  en: {
    alt: "Dummy Content — Free Dummy Content Generator for Images, Text & iFrames",
    subtitle: "Free dummy content for developers and designers",
    pills: ["Placeholder Images", "Lorem Ipsum Text", "Embeddable iFrames"],
  },
  es: {
    alt: "Dummy Content — Generador gratuito de contenido dummy: imágenes, texto e iFrames",
    subtitle: "Contenido dummy gratis para desarrolladores y diseñadores",
    pills: ["Imágenes placeholder", "Texto lorem ipsum", "iFrames embebibles"],
  },
};

export const ogAlt = (lang: Lang) => COPY[lang].alt;

/**
 * Imagen Open Graph compartida por los dos root layouts. Cada idioma expone su propia ruta
 * `opengraph-image` porque los metadatos de archivo solo cascadean dentro del segmento que los
 * contiene, y cada root layout es un segmento distinto.
 */
export function renderOgImage(lang: Lang) {
  const { subtitle, pills } = COPY[lang];

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f172a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Background accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(7,207,254,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            color: "#07CFFE",
            letterSpacing: "-3px",
            marginBottom: "20px",
            lineHeight: 1,
          }}
        >
          {"<DummyContent/>"}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 30,
            color: "#94a3b8",
            marginBottom: "52px",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </div>

        {/* Tool pills */}
        <div style={{ display: "flex", gap: "20px" }}>
          {pills.map((tool) => (
            <div
              key={tool}
              style={{
                background: "#1e293b",
                border: "1.5px solid #334155",
                borderRadius: "10px",
                padding: "14px 24px",
                fontSize: 22,
                color: "#f1f5f9",
                fontWeight: 500,
              }}
            >
              {tool}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: 22,
            color: "#475569",
            letterSpacing: "0.05em",
          }}
        >
          dummycontent.app
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
