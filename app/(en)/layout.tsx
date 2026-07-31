import type { Metadata } from "next";
import RootShell from "@/components/shared/RootShell/RootShell";
import { BASE_URL } from "@/lib/seo/urls";

const TITLE = "Dummy Content — Free Dummy Content Generator for Images, Text & iFrames";
const DESCRIPTION =
  "Dummy content is the placeholder text, images and media used to fill a layout before the real content exists. Generate it free: placeholder images via URL, lorem ipsum text in EN/ES, and embeddable iframes.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: TITLE,
    template: "%s — Dummy Content",
  },
  description: DESCRIPTION,
  keywords: [
    "dummy content",
    "dummy content generator",
    "what is dummy content",
    "placeholder content",
    "dummy images",
    "placeholder images",
    "lorem ipsum generator",
    "dummy text generator",
    "iframe generator",
    "placeholder text",
    "web development tools",
    "design prototyping tools",
    "fake content generator",
    "dummy data",
  ],
  authors: [{ name: "Dummy Content", url: BASE_URL }],
  openGraph: {
    type: "website",
    siteName: "Dummy Content",
    locale: "en",
    alternateLocale: ["es"],
    title: TITLE,
    description: DESCRIPTION,
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EnRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootShell lang="en">{children}</RootShell>;
}
