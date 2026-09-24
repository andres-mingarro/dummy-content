"use client";

import { useLang } from "@/providers/LangProvider";
import HomeHero from "@/components/home/HomeHero/HomeHero";
import ToolsShowcase from "@/components/home/ToolsShowcase/ToolsShowcase";
import HomeIntroFilm from "@/components/home/HomeIntroFilm/HomeIntroFilm";
import EditorialIntro from "@/components/home/EditorialIntro/EditorialIntro";
import styles from "./page.module.scss";

interface HomePageClientProps {
  title: string;
  lead: string;
  toolsHeading: string;
  children: React.ReactNode;
}

export default function HomePageClient({ title, lead, toolsHeading, children }: HomePageClientProps) {
  const { lang, href } = useLang();

  return (
    <main className={styles["home-page"]}>
      <HomeHero lang={lang} title={title} lead={lead} />
      <ToolsShowcase lang={lang} heading={toolsHeading} resolveHref={href} />
      <HomeIntroFilm lang={lang} />
      <EditorialIntro lang={lang} />
      {children}
    </main>
  );
}
