import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { LangProvider } from "@/providers/LangProvider";
import Header from "@/components/shared/Header/Header";
import Footer from "@/components/shared/Footer/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://dummycontent.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Dummy Content — Free Placeholder Images, Text & iFrames",
    template: "%s — Dummy Content",
  },
  description:
    "Free online tools to generate dummy content for web development and design: placeholder images via URL, lorem ipsum text in EN/ES, and embeddable iframes with realistic layouts.",
  keywords: [
    "dummy content",
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
    title: "Dummy Content — Free Placeholder Images, Text & iFrames",
    description:
      "Free online tools to generate dummy content for web development and design: placeholder images via URL, lorem ipsum text in EN/ES, and embeddable iframes with realistic layouts.",
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Dummy Content — Free Placeholder Images, Text & iFrames",
    description:
      "Free online tools to generate dummy content for web development and design: placeholder images via URL, lorem ipsum text in EN/ES, and embeddable iframes with realistic layouts.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                name: "Dummy Content",
                url: "https://dummycontent.app",
                description:
                  "Free online tools to generate dummy content for web development and design: placeholder images via URL, lorem ipsum text, and embeddable iframes with realistic layouts.",
                applicationCategory: "DeveloperApplication",
                operatingSystem: "All",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                featureList: [
                  "Placeholder image generator via URL",
                  "Lorem ipsum text generator in English and Spanish",
                  "Embeddable iframe generator with realistic content",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "What is dummy content?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Dummy content refers to placeholder text, images, and media used during web development and design prototyping. DummyContent.app provides free tools to generate all types of dummy content instantly — placeholder images, lorem ipsum text, and embeddable iframes.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How do I generate a placeholder image?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Use the Dummy Image Generator at dummycontent.app/images. Set the dimensions, background color, text color, and design style. You get a URL you can drop directly into an <img> tag: /api/image/{width}x{height}/{background}/{text}.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is DummyContent.app free to use?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, all tools on DummyContent.app are completely free with no registration or account required.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What types of dummy content can I generate?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "DummyContent.app lets you generate: placeholder images in custom sizes and styles (solid colors, landscapes, user avatars, textures), lorem ipsum text in English and Spanish by word or character count, and embeddable iframes with realistic articles, image grids, and card lists.",
                    },
                  },
                ],
              },
            ]),
          }}
        />
        <ThemeProvider>
          <LangProvider>
            <Header />
            {children}
            <Footer />
          </LangProvider>
        </ThemeProvider>
      </body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-2R2WD8EBLQ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-2R2WD8EBLQ');
        `}
      </Script>
    </html>
  );
}
