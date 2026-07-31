import type { Metadata } from "next";
import IframePageClient from "@/app/(en)/iframe/IframePageClient";
import { absoluteUrl, buildAlternates } from "@/lib/seo/urls";

const URL = absoluteUrl("/iframe", "es");
const DESCRIPTION =
  "Generá iframes dummy embebibles con contenido de relleno realista: artículos, grillas de imágenes y listados de cards. Generador de iframes gratuito para prototipado y desarrollo de UI.";

export const metadata: Metadata = {
  title: "Generador de iFrames Dummy",
  description: DESCRIPTION,
  keywords: [
    "generador de iframes dummy",
    "iframe placeholder",
    "embeber contenido de relleno",
    "iframe de artículo dummy",
    "generador de iframes",
    "embed de contenido dummy",
  ],
  alternates: buildAlternates("/iframe", "es"),
  openGraph: {
    title: "Generador de iFrames Dummy — Dummy Content",
    description: DESCRIPTION,
    url: URL,
  },
};

export default function IframePageEs() {
  return <IframePageClient />;
}
