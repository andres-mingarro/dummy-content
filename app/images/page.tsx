import type { Metadata } from "next";
import ImagesPageClient from "./ImagesPageClient";

const URL = "https://dummycontent.app/images";

export const metadata: Metadata = {
  title: "Dummy Image Generator",
  description:
    "Generate dummy placeholder images instantly via URL. Customize width, height, background color, text, and design style — solid colors, landscapes, avatars, and textures.",
  keywords: [
    "dummy image generator",
    "placeholder image generator",
    "placeholder images",
    "dummy images",
    "fake image generator",
    "image placeholder URL",
  ],
  alternates: {
    canonical: URL,
  },
  openGraph: {
    title: "Dummy Image Generator — Dummy Content",
    description:
      "Generate dummy placeholder images instantly via URL. Customize width, height, background color, text, and design style — solid colors, landscapes, avatars, and textures.",
    url: URL,
  },
};

export default function ImagesPage() {
  return <ImagesPageClient />;
}
