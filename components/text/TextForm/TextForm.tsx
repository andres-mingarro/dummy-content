"use client";

import { useLang } from "@/providers/LangProvider";
import type { TextUnit } from "@/lib/text/textGenerator";
import { RippleButton } from "@/components/shared/RippleButton/RippleButton";
import styles from "./TextForm.module.scss";

export interface TextFormValues {
  count: number;
  unit: TextUnit;
  paragraphs: number;
  displayTags: boolean;
}

interface TextFormProps {
  values: TextFormValues;
  onChange: (values: TextFormValues) => void;
}

const UNIT_OPTIONS: TextUnit[] = ["words", "characters"];

const COUNT_MIN = 0;
const COUNT_MAX = 999;
const PARA_MIN = 1;
const PARA_MAX = 100;

export default function TextForm({ values, onChange }: TextFormProps) {
  const { t } = useLang();

  const setCount = (count: number) =>
    onChange({ ...values, count: Math.min(Math.max(COUNT_MIN, count), COUNT_MAX) });

  const setParagraphs = (paragraphs: number) =>
    onChange({ ...values, paragraphs: Math.min(Math.max(PARA_MIN, paragraphs), PARA_MAX) });

  const countPct = (values.count / COUNT_MAX) * 100;
  const paraPct = ((values.paragraphs - PARA_MIN) / (PARA_MAX - PARA_MIN)) * 100;

  return (
    <div className={`${styles.form} TextForm`}>

      {/* Fila 1: botones de unidad */}
      <div className={styles.typeGrid}>
        {UNIT_OPTIONS.map((unit) => (
          <RippleButton
            key={unit}
            type="button"
            className={`${styles.typeBtn} ${values.unit === unit ? styles.typeBtnActive : ""}`}
            onClick={() => onChange({ ...values, unit })}
          >
            {t.text[unit]}
          </RippleButton>
        ))}
      </div>

      {/* Fila 2: título + slider de count + input */}
      <span className={styles.sectionTitle}>
        {values.unit === "words" ? t.text.countWords : t.text.countCharacters}
      </span>
      <div className={styles.sliderRow}>
        <input
          type="range"
          min={COUNT_MIN}
          max={COUNT_MAX}
          step={10}
          value={values.count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          className={styles.slider}
          style={{ "--pct": `${countPct}%` } as React.CSSProperties}
        />
        <input
          id="count"
          type="number"
          min={COUNT_MIN}
          max={COUNT_MAX}
          value={values.count}
          onChange={(e) => setCount(parseInt(e.target.value) || 0)}
          className={styles.numberInput}
        />
      </div>

      {/* Fila 3: título párrafos */}
      <span className={styles.sectionTitle}>{t.text.paragraphs}</span>

      {/* Fila 4: slider de párrafos + input */}
      <div className={styles.sliderRow}>
        <input
          type="range"
          min={PARA_MIN}
          max={PARA_MAX}
          step={1}
          value={values.paragraphs}
          onChange={(e) => setParagraphs(parseInt(e.target.value))}
          className={styles.slider}
          style={{ "--pct": `${paraPct}%` } as React.CSSProperties}
        />
        <input
          id="paragraphs"
          type="number"
          min={PARA_MIN}
          max={PARA_MAX}
          value={values.paragraphs}
          onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)}
          className={styles.numberInput}
        />
      </div>

      {/* Display tags toggle */}
      <div className={styles.rowDisplay}>
        <span className={styles.sectionTitle}>{t.text.displayTags}</span>
        <button
          role="switch"
          aria-checked={values.displayTags}
          type="button"
          onClick={() => onChange({ ...values, displayTags: !values.displayTags })}
          className={`relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full transition-colors ${values.displayTags ? "bg-[var(--accent)]" : "bg-[var(--input-border)]"}`}
        >
          <span
            className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${values.displayTags ? "translate-x-4" : "translate-x-0.5"}`}
          />
        </button>
      </div>

    </div>
  );
}
