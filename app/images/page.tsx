import type { Metadata } from "next";
import ImagesPageClient from "./ImagesPageClient";

export const metadata: Metadata = {
  title: "Image Generator",
  description:
    "Generate placeholder images instantly from a parametrized URL. Customize size, background color, text color, and design.",
  openGraph: {
    title: "Image Generator — Dummy Content",
    description:
      "Generate placeholder images instantly from a parametrized URL. Customize size, background color, text color, and design.",
    url: "https://dummycontent.app/images",
  },
};

export default function ImagesPage() {
  return <ImagesPageClient />;
}
