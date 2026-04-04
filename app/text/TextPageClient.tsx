"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useLang } from "@/providers/LangProvider";
import { PulsatingButton } from "@/components/shared/PulsatingButton/PulsatingButton";
import { lobster } from "@/components/shared/Logo/Logo";
import { BlurFade } from "@/components/shared/BlurFade/BlurFade";
import TextForm, { TextFormValues } from "@/components/text/TextForm/TextForm";
import TextOutput from "@/components/text/TextOutput/TextOutput";
import { generateUnits, unitsToText } from "@/lib/text/textGenerator";
import type { TextType } from "@/lib/text/textGenerator";

const TEXT_TYPES: TextType[] = ["paragraphs", "sentences", "words"];

export default function TextPageClient() {
  const { t, lang } = useLang();
  const [formValues, setFormValues] = useState<TextFormValues>({ type: "words", count: 3 });
  const [initialized, setInitialized] = useState(false);
  const [units, setUnits] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const prevTypeRef = useRef<TextType>("words");
  const prevLangRef = useRef(lang);

  useEffect(() => {
    const hash = window.location.hash.slice(1) as TextType;
    const type = TEXT_TYPES.includes(hash) ? hash : "words";
    const countParam = new URLSearchParams(window.location.search).get("count");
    const count = countParam ? Math.max(1, parseInt(countParam, 10)) : 3;
    setFormValues({ type, count });
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) return;
    history.replaceState(null, "", `?count=${formValues.count}#${formValues.type}`);
  }, [initialized, formValues.type, formValues.count]);

  useEffect(() => {
    const typeChanged = formValues.type !== prevTypeRef.current;
    const langChanged = lang !== prevLangRef.current;

    prevTypeRef.current = formValues.type;
    prevLangRef.current = lang;

    if (typeChanged || langChanged || units.length === 0) {
      setUnits(generateUnits({ type: formValues.type, count: formValues.count, lang }));
      return;
    }

    setUnits((prev) => {
      const diff = formValues.count - prev.length;
      if (diff === 0) return prev;
      if (diff > 0) {
        const newUnits = generateUnits({ type: formValues.type, count: diff, lang });
        return [...newUnits, ...prev];
      }
      return prev.slice(0, formValues.count);
    });
  }, [formValues, lang]); // eslint-disable-line react-hooks/exhaustive-deps

  const text = unitsToText(units, formValues.type);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const charCount = text.length;

  return (
    <main className="flex-1 py-12 px-4 TextPage" style={{ background: "var(--background)" }}>
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <BlurFade delay={0} direction="up">
            <h1 className={lobster.className} style={{ color: "var(--foreground)", fontSize: "40px" }}>
              {t.text.title}
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

        {text && (
          <BlurFade delay={0.15} direction="up">
            <div className="rounded-2xl shadow-sm p-6 space-y-4" style={{ background: "var(--card)", border: "1.5px solid var(--card-border)" }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                  {t.text.result}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs" style={{ color: "var(--muted)" }}>
                    {wordCount} {t.text.wordCount} · {charCount} {t.text.charCount}
                  </span>
                  <PulsatingButton
                    type="button"
                    onClick={handleCopy}
                    pulseColor="var(--accent)"
                    className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                    style={{
                      border: "1.5px solid var(--input-border)",
                      background: copied ? "var(--accent-bg)" : "var(--card)",
                      color: copied ? "var(--accent)" : "var(--foreground)",
                    }}
                  >
                    {copied ? t.text.copied : t.text.copy}
                  </PulsatingButton>
                </div>
              </div>
              <TextOutput key={text} text={text} />
            </div>
          </BlurFade>
        )}
      </div>
    </main>
  );
}
