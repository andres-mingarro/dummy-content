import type { Metadata } from "next";
import IframePageClient from "./IframePageClient";
import { absoluteUrl, buildAlternates } from "@/lib/seo/urls";

const URL = absoluteUrl("/iframe", "en");

export const metadata: Metadata = {
  title: "Dummy iFrame Generator",
  description:
    "Generate embeddable dummy iframes with realistic placeholder content: articles, image grids, and card lists. Free iframe generator for web prototyping and UI development.",
  keywords: [
    "dummy iframe generator",
    "placeholder iframe",
    "embed placeholder content",
    "dummy article iframe",
    "iframe generator",
    "dummy content embed",
  ],
  alternates: buildAlternates("/iframe", "en"),
  openGraph: {
    title: "Dummy iFrame Generator — Dummy Content",
    description:
      "Generate embeddable dummy iframes with realistic placeholder content: articles, image grids, and card lists. Free iframe generator for web prototyping and UI development.",
    url: URL,
  },
};

export default function IframePage() {
  return <IframePageClient />;
}
