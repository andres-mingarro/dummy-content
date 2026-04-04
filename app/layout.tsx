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
    default: "Dummy Content — Free Placeholder Tools",
    template: "%s — Dummy Content",
  },
  description:
    "Free tools to generate placeholder images, text, and embeddable iframes for your development and design projects.",
  keywords: ["placeholder", "dummy content", "lorem ipsum", "placeholder images", "dummy images", "iframe generator", "text generator", "web development tools"],
  authors: [{ name: "Dummy Content", url: BASE_URL }],
  openGraph: {
    type: "website",
    siteName: "Dummy Content",
    title: "Dummy Content — Free Placeholder Tools",
    description:
      "Free tools to generate placeholder images, text, and embeddable iframes for your development and design projects.",
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Dummy Content — Free Placeholder Tools",
    description:
      "Free tools to generate placeholder images, text, and embeddable iframes for your development and design projects.",
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Dummy Content",
              url: "https://dummycontent.app",
              description:
                "Free tools to generate placeholder images, text, and embeddable iframes for development and design projects.",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "All",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            }),
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
