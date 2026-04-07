"use client";

import { useLang } from "@/providers/LangProvider";
import { lobster } from "@/components/shared/Logo/Logo";
import { BlurFade } from "@/components/shared/BlurFade/BlurFade";
import { AuroraText } from "@/components/shared/AuroraText/AuroraText";

const BMC_URL = "https://www.buymeacoffee.com/YOUR_USERNAME";

export default function SupportPage() {
  const { t } = useLang();

  return (
    <main className="flex-1 flex items-center justify-center py-16 px-4 SupportPage" style={{ background: "var(--background)" }}>
      <div className="max-w-lg w-full mx-auto text-center space-y-8">

        <BlurFade delay={0} direction="up">
          <h1 className={lobster.className} style={{ fontSize: "40px", color: "var(--heading)", lineHeight: 1 }}>
            &lt;<AuroraText colors={["#07CFFE", "#a78bfa", "#38bdf8", "#07CFFE"]} speed={2}>Dummy</AuroraText> Support&gt;
          </h1>
        </BlurFade>

        <BlurFade delay={0.08} direction="up">
          <div className="rounded-2xl p-8 space-y-6" style={{ background: "var(--card)", border: "1.5px solid var(--card-border)" }}>
            <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--foreground)" }}>
              {t.support.description}
            </p>

            <a
              href={BMC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 rounded-xl text-sm font-semibold tracking-wide transition-all text-center"
              style={{
                border: "1.5px solid var(--accent)",
                background: "transparent",
                color: "var(--accent)",
                textDecoration: "none",
              }}
            >
              {t.support.cta}
            </a>

            <p style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>
              {t.support.disclaimer}
            </p>
          </div>
        </BlurFade>

      </div>
    </main>
  );
}
