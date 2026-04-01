"use client";

import { useLang } from "@/providers/LangProvider";

export default function IframePage() {
  const { t } = useLang();
  return (
    <main className="flex-1 py-12 px-4" style={{ background: "var(--background)" }}>
      <div className="max-w-2xl mx-auto text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
          {t.iframe.title}
        </h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>{t.iframe.comingSoon}</p>
      </div>
    </main>
  );
}
