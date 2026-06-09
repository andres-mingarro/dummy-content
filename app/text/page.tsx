import type { Metadata } from "next";
import TextPageClient from "./TextPageClient";

const URL = "https://dummycontent.app/text";

export const metadata: Metadata = {
  title: "Dummy Text Generator",
  description:
    "Generate dummy lorem ipsum placeholder text in English and Spanish. Set word count or character count, split into paragraphs — free lorem ipsum generator for developers and designers.",
  keywords: [
    "dummy text generator",
    "lorem ipsum generator",
    "placeholder text generator",
    "fake text generator",
    "lorem ipsum",
    "dummy text",
  ],
  alternates: {
    canonical: URL,
  },
  openGraph: {
    title: "Dummy Text Generator — Dummy Content",
    description:
      "Generate dummy lorem ipsum placeholder text in English and Spanish. Set word count or character count, split into paragraphs — free lorem ipsum generator for developers and designers.",
    url: URL,
  },
};

export default function TextPage() {
  return <TextPageClient />;
}
