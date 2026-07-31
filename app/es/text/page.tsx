import type { Metadata } from "next";
import TextPageClient from "@/app/(en)/text/TextPageClient";
import { absoluteUrl, buildAlternates } from "@/lib/seo/urls";

const URL = absoluteUrl("/text", "es");
const DESCRIPTION =
  "Generá texto dummy lorem ipsum en español e inglés. Definí la cantidad de palabras o de caracteres y repartilos en párrafos — generador de lorem ipsum gratuito para desarrolladores y diseñadores.";

export const metadata: Metadata = {
  title: "Generador de Texto Dummy",
  description: DESCRIPTION,
  keywords: [
    "generador de texto dummy",
    "generador lorem ipsum",
    "generador de texto de relleno",
    "texto de relleno",
    "lorem ipsum",
    "texto dummy",
  ],
  alternates: buildAlternates("/text", "es"),
  openGraph: {
    title: "Generador de Texto Dummy — Dummy Content",
    description: DESCRIPTION,
    url: URL,
  },
};

export default function TextPageEs() {
  return <TextPageClient />;
}
