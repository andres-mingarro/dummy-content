"use client";

import { useState, useEffect, useRef } from "react";
import { useLang } from "@/providers/LangProvider";
import CopyButton from "@/components/images/CopyButton/CopyButton";
import { lobster } from "@/components/shared/Logo/Logo";
import { BlurFade } from "@/components/shared/BlurFade/BlurFade";
import { AuroraText } from "@/components/shared/AuroraText/AuroraText";
import TextForm, { TextFormValues } from "@/components/text/TextForm/TextForm";
import TextOutput from "@/components/text/TextOutput/TextOutput";
import { generateParagraphs } from "@/lib/text/textGenerator";
import type { TextUnit } from "@/lib/text/textGenerator";

const UNIT_OPTIONS: TextUnit[] = ["words", "characters"];

export default function TextPageClient() {
  const { t, lang } = useLang();
  const [formValues, setFormValues] = useState<TextFormValues>({
    count: 50,
    unit: "words",
    paragraphs: 1,
    displayTags: false,
  });
  const [initialized, setInitialized] = useState(false);
  const [units, setUnits] = useState<string[]>([]);

  const prevLangRef = useRef(lang);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const count = Math.min(999, Math.max(0, parseInt(params.get("count") || "50") || 50));
    const unitParam = params.get("unit") as TextUnit | null;
    const unit = unitParam && UNIT_OPTIONS.includes(unitParam) ? unitParam : "words";
    const paragraphs = Math.min(100, Math.max(1, parseInt(params.get("paragraphs") || "1") || 1));
    setFormValues((prev) => ({ ...prev, count, unit, paragraphs }));
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) return;
    history.replaceState(
      null,
      "",
      `?count=${formValues.count}&unit=${formValues.unit}&paragraphs=${formValues.paragraphs}`
    );
  }, [initialized, formValues.count, formValues.unit, formValues.paragraphs]);

  useEffect(() => {
    prevLangRef.current = lang;

    setUnits(generateParagraphs({ count: formValues.count, unit: formValues.unit, paragraphs: formValues.paragraphs, lang }));
  }, [formValues, lang]); // eslint-disable-line react-hooks/exhaustive-deps

  const plainText = units.join("\n\n");
  const copyText = formValues.displayTags
    ? units.map((p) => `<p>${p}</p>`).join("\n\n")
    : plainText;

  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
  const charCount = plainText.length;

  return (
    <main className="flex-1 py-12 px-4 TextPage" style={{ background: "var(--background)" }}>
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <BlurFade delay={0} direction="up">
            <h1 className={lobster.className} style={{ fontSize: "40px", color: "var(--heading)" }}>
              &lt;<AuroraText colors={["#07CFFE", "#a78bfa", "#38bdf8", "#07CFFE"]} speed={2}>Dummy</AuroraText> Text&gt;
            </h1>
          </BlurFade>
          <BlurFade delay={0.05} direction="up">
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              {t.text.subtitle}
            </p>
          </BlurFade>
        </div>

        <BlurFade delay={0.1} direction="up">
          <div className="rounded-2xl shadow-sm p-6 space-y-6" style={{ background: "var(--card)", border: "1.5px solid var(--card-border)" }}>
            <TextForm values={formValues} onChange={setFormValues} />
          </div>
        </BlurFade>

        {units.length > 0 && (
          <BlurFade delay={0.15} direction="up">
            <div className="rounded-2xl shadow-sm p-6 space-y-4" style={{ background: "var(--card)", border: "1.5px solid var(--card-border)" }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                  {t.text.result}
                </span>
                <span className="text-xs" style={{ color: "var(--muted)" }}>
                  {wordCount} {t.text.wordCount} · {charCount} {t.text.charCount}
                </span>
              </div>
              <TextOutput key={copyText} paragraphs={units} displayTags={formValues.displayTags} />
              <CopyButton text={copyText} label={t.text.copy} copiedLabel={t.text.copied} fullWidth />
            </div>
          </BlurFade>
        )}
      </div>
    </main>
  );
}
