import type { Metadata } from "next";
import TermsArticle from "@/components/legal/TermsArticle/TermsArticle";
import { TERMS_CONTENT } from "@/lib/i18n/termsContent";
import { absoluteUrl, buildAlternates } from "@/lib/seo/urls";

const LANG = "en" as const;
const copy = TERMS_CONTENT[LANG];

export const metadata: Metadata = {
  title: copy.title,
  description: copy.metaDescription,
  alternates: buildAlternates("/terms", LANG),
  openGraph: {
    title: `${copy.title} — Dummy Content`,
    description: copy.metaDescription,
    url: absoluteUrl("/terms", LANG),
  },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return <TermsArticle lang={LANG} />;
}
