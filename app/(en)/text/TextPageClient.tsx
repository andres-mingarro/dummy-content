"use client";

import { useState, useEffect, useRef } from "react";
import { useLang } from "@/providers/LangProvider";
import CopyButton from "@/components/images/CopyButton/CopyButton";
import { ToolPanel, ToolWorkspace, ToolWorkspaceGrid } from "@/components/shared/ToolWorkspace/ToolWorkspace";
import TextForm, { TextFormValues } from "@/components/text/TextForm/TextForm";
import TextOutput from "@/components/text/TextOutput/TextOutput";
import { generateParagraphs } from "@/lib/text/textGenerator";
import type { TextUnit } from "@/lib/text/textGenerator";
import styles from "./TextPageClient.module.scss";

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

  return <ToolWorkspace tone="text" eyebrow="02 — DummyText" description={t.text.subtitle}>
    <ToolWorkspaceGrid>
      <ToolPanel label={lang === "es" ? "Configuración" : "Configuration"}><TextForm values={formValues} onChange={setFormValues}/></ToolPanel>
      <ToolPanel label={t.text.result}>
        <div className={styles["text-tool__meta"]}><span>{wordCount} {t.text.wordCount}</span><span>{charCount} {t.text.charCount}</span></div>
        <div className={styles["text-tool__output"]}>{units.length > 0 && <TextOutput key={copyText} paragraphs={units} displayTags={formValues.displayTags}/>}</div>
        <CopyButton text={copyText} label={t.text.copy} copiedLabel={t.text.copied} fullWidth/>
      </ToolPanel>
    </ToolWorkspaceGrid>
  </ToolWorkspace>;
}
