import type { Metadata } from "next";
import ImagesPageClient from "@/app/(en)/images/ImagesPageClient";
import { absoluteUrl, buildAlternates } from "@/lib/seo/urls";

const URL = absoluteUrl("/images", "es");
const DESCRIPTION =
  "Generá imágenes dummy al instante desde una URL. Elegí ancho, alto, color de fondo, color de texto y estilo de diseño — colores sólidos, paisajes, avatares y texturas.";

export const metadata: Metadata = {
  title: "Generador de Imágenes Dummy",
  description: DESCRIPTION,
  keywords: [
    "generador de imágenes dummy",
    "generador de imágenes placeholder",
    "imágenes placeholder",
    "imágenes dummy",
    "imágenes de relleno",
    "URL de imagen placeholder",
  ],
  alternates: buildAlternates("/images", "es"),
  openGraph: {
    title: "Generador de Imágenes Dummy — Dummy Content",
    description: DESCRIPTION,
    url: URL,
  },
};

export default function ImagesPageEs() {
  return <ImagesPageClient />;
}
