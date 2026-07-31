import type { Metadata } from "next";
import RootShell from "@/components/shared/RootShell/RootShell";
import { BASE_URL } from "@/lib/seo/urls";

const TITLE = "Dummy Content — Generador gratuito de contenido dummy: imágenes, texto e iFrames";
const DESCRIPTION =
  "El contenido dummy es el texto, las imágenes y los medios de relleno que se usan para maquetar antes de tener el contenido real. Generalo gratis: imágenes placeholder por URL, texto lorem ipsum en ES/EN e iframes embebibles.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: TITLE,
    template: "%s — Dummy Content",
  },
  description: DESCRIPTION,
  keywords: [
    "contenido dummy",
    "generador de contenido dummy",
    "qué es contenido dummy",
    "contenido de relleno",
    "imágenes dummy",
    "imágenes placeholder",
    "generador lorem ipsum",
    "generador de texto dummy",
    "generador de iframes",
    "texto de relleno",
    "herramientas para desarrollo web",
    "herramientas de prototipado",
    "datos dummy",
  ],
  authors: [{ name: "Dummy Content", url: BASE_URL }],
  openGraph: {
    type: "website",
    siteName: "Dummy Content",
    locale: "es",
    alternateLocale: ["en"],
    title: TITLE,
    description: DESCRIPTION,
    url: `${BASE_URL}/es`,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EsRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootShell lang="es">{children}</RootShell>;
}
