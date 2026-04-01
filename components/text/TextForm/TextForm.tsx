"use client";

import { useLang } from "@/providers/LangProvider";
import type { TextType } from "@/lib/text/textGenerator";
import styles from "./TextForm.module.scss";

export interface TextFormValues {
  type: TextType;
  count: number;
}

interface TextFormProps {
  values: TextFormValues;
  onChange: (values: TextFormValues) => void;
}

const TYPE_OPTIONS: TextType[] = ["paragraphs", "sentences", "words"];

const MAX_COUNT: Record<TextType, number> = {
  paragraphs: 20,
  sentences: 50,
  words: 100,
};

export default function TextForm({ values, onChange }: TextFormProps) {
  const { t } = useLang();
  const max = MAX_COUNT[values.type];
  const percentage = ((values.count - 1) / (max - 1)) * 100;

  const setCount = (count: number) =>
    onChange({ ...values, count: Math.min(Math.max(1, count), max) });

  return (
    <div className={styles.form}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label>{t.text.type}</label>
          <div className={styles.typeGrid}>
            {TYPE_OPTIONS.map((type) => (
              <button
                key={type}
                type="button"
                className={`${styles.typeBtn} ${values.type === type ? styles.typeBtnActive : ""}`}
                onClick={() => onChange({ ...values, type, count: Math.min(values.count, MAX_COUNT[type]) })}
              >
                {t.text.types[type]}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.fieldCount}>
          <label htmlFor="count">{t.text.count}</label>
          <input
            id="count"
            type="number"
            min={1}
            max={max}
            value={values.count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
          />
        </div>
      </div>

      <input
        type="range"
        min={1}
        max={max}
        value={values.count}
        onChange={(e) => setCount(parseInt(e.target.value))}
        className={styles.slider}
        style={{ "--pct": `${percentage}%` } as React.CSSProperties}
      />
    </div>
  );
}
