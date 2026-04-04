import type { Metadata } from "next";
import TextPageClient from "./TextPageClient";

export const metadata: Metadata = {
  title: "Text Generator",
  description:
    "Generate realistic placeholder text in English and Spanish. Choose between paragraphs, sentences, or individual words powered by Faker.js.",
  openGraph: {
    title: "Text Generator — Dummy Content",
    description:
      "Generate realistic placeholder text in English and Spanish. Choose between paragraphs, sentences, or individual words powered by Faker.js.",
    url: "https://dummycontent.app/text",
  },
};

export default function TextPage() {
  return <TextPageClient />;
}
