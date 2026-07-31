import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { LangProvider } from "@/providers/LangProvider";
import Header from "@/components/shared/Header/Header";
import Footer from "@/components/shared/Footer/Footer";
import type { Lang } from "@/lib/i18n/translations";
import { BASE_URL } from "@/lib/seo/urls";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const GA_ID = "G-2R2WD8EBLQ";

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Dummy Content",
  url: BASE_URL,
  description:
    "Free online tools to generate dummy content for web development and design: placeholder images via URL, lorem ipsum text, and embeddable iframes with realistic layouts.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  inLanguage: ["en", "es"],
  featureList: [
    "Placeholder image generator via URL",
    "Lorem ipsum text generator in English and Spanish",
    "Embeddable iframe generator with realistic content",
  ],
};

/**
 * Cascarón `<html>`/`<body>` compartido por los dos root layouts (`app/(en)` y `app/es`).
 * El `lang` servido tiene que coincidir con el idioma del contenido renderizado — ver LangProvider.
 */
export default function RootShell({
  lang,
  children,
}: Readonly<{ lang: Lang; children: React.ReactNode }>) {
  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
        />
        <ThemeProvider>
          <LangProvider lang={lang}>
            <Header />
            {children}
            <Footer />
          </LangProvider>
        </ThemeProvider>
      </body>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </html>
  );
}
