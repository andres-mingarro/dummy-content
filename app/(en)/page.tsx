import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import HomeArticle from "@/components/home/HomeArticle/HomeArticle";
import { HOME_CONTENT } from "@/lib/i18n/homeContent";
import { buildAlternates } from "@/lib/seo/urls";

const LANG = "en" as const;

export const metadata: Metadata = {
  alternates: buildAlternates("", LANG),
};

export default function Home() {
  const copy = HOME_CONTENT[LANG];

  return (
    <HomePageClient title={copy.title} lead={copy.lead} toolsHeading={copy.toolsHeading}>
      <HomeArticle lang={LANG} />
    </HomePageClient>
  );
}
