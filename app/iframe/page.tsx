import type { Metadata } from "next";
import IframePageClient from "./IframePageClient";

export const metadata: Metadata = {
  title: "Iframe Generator",
  description:
    "Generate embeddable iframes with dummy articles, image grids, and card lists. Customize dimensions and border styles for your prototypes.",
  openGraph: {
    title: "Iframe Generator — Dummy Content",
    description:
      "Generate embeddable iframes with dummy articles, image grids, and card lists. Customize dimensions and border styles for your prototypes.",
    url: "https://dummycontent.app/iframe",
  },
};

export default function IframePage() {
  return <IframePageClient />;
}
