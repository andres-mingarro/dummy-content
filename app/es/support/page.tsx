import type { Metadata } from "next";
import SupportPage from "@/app/(en)/support/page";
import { buildAlternates } from "@/lib/seo/urls";

export const metadata: Metadata = {
  title: "Apoyar el proyecto",
  description: "Apoyá Dummy Content, la herramienta gratuita para generar contenido dummy.",
  alternates: buildAlternates("/support", "es"),
  robots: { index: false, follow: true },
};

export default function SupportPageEs() {
  return <SupportPage />;
}
