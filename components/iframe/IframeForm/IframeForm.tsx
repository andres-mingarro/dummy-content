"use client";

import { useState, useCallback } from "react";
import { useLang } from "@/providers/LangProvider";
import styles from "./IframeForm.module.scss";

export type IframeType = "article" | "article-image" | "images-list" | "card-list";

export interface IframeFormValues {
  type: IframeType;
  width: string;
  height: string;
  border: boolean;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
}

interface Props {
  onChange: (values: IframeFormValues) => void;
}

const DEFAULTS: IframeFormValues = {
  type: "article",
  width: "100%",
  height: "450",
  border: false,
  borderColor: "e5e7eb",
  borderWidth: "1",
  borderRadius: "8",
};

const TYPE_PREVIEWS: Record<IframeType, React.ReactNode> = {
  article: (
    <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#f9fafb" />
      <rect x="5" y="5" width="10" height="1.5" rx="0.75" fill="#6366f1" />
      <rect x="5" y="10" width="40" height="4" rx="1" fill="#111" opacity="0.8" />
      <rect x="5" y="17" width="25" height="1.5" rx="0.75" fill="#aaa" />
      <line x1="5" y1="21.5" x2="55" y2="21.5" stroke="#eee" strokeWidth="0.5" />
      <rect x="5" y="24" width="50" height="1.5" rx="0.75" fill="#ccc" />
      <rect x="5" y="27.5" width="50" height="1.5" rx="0.75" fill="#ccc" />
      <rect x="5" y="31" width="38" height="1.5" rx="0.75" fill="#ccc" />
      <rect x="5" y="35.5" width="2" height="3" rx="0.5" fill="#6366f1" />
      <rect x="9" y="36.25" width="38" height="1.5" rx="0.75" fill="#ccc" opacity="0.7" />
    </svg>
  ),
  "article-image": (
    <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="16" fill="#87ceeb" />
      <polygon points="10,16 26,7 42,16" fill="#4caf50" opacity="0.7" />
      <circle cx="48" cy="6" r="3.5" fill="#ffa726" opacity="0.9" />
      <rect x="5" y="19" width="10" height="1.5" rx="0.75" fill="#6366f1" />
      <rect x="5" y="22.5" width="38" height="3" rx="1" fill="#111" opacity="0.8" />
      <rect x="5" y="28" width="22" height="1.5" rx="0.75" fill="#aaa" />
      <rect x="5" y="31.5" width="50" height="1.5" rx="0.75" fill="#ccc" />
      <rect x="5" y="35" width="42" height="1.5" rx="0.75" fill="#ccc" />
    </svg>
  ),
  "images-list": (
    <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#f5f5f5" />
      <rect x="2" y="2" width="17" height="11" rx="1.5" fill="#c7d2fe" />
      <rect x="21.5" y="2" width="17" height="11" rx="1.5" fill="#86efac" />
      <rect x="41" y="2" width="17" height="11" rx="1.5" fill="#fde68a" />
      <rect x="2" y="15" width="17" height="11" rx="1.5" fill="#fca5a5" />
      <rect x="21.5" y="15" width="17" height="11" rx="1.5" fill="#a5f3fc" />
      <rect x="41" y="15" width="17" height="11" rx="1.5" fill="#d8b4fe" />
      <rect x="2" y="28" width="17" height="11" rx="1.5" fill="#fbcfe8" />
      <rect x="21.5" y="28" width="17" height="11" rx="1.5" fill="#fed7aa" />
      <rect x="41" y="28" width="17" height="11" rx="1.5" fill="#bfdbfe" />
    </svg>
  ),
  "card-list": (
    <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#f5f5f5" />
      <rect x="2" y="2" width="56" height="10" rx="2" fill="#fff" />
      <rect x="4" y="4" width="13" height="6" rx="1" fill="#c7d2fe" />
      <rect x="20" y="5" width="24" height="2" rx="0.75" fill="#333" opacity="0.7" />
      <rect x="20" y="9" width="16" height="1.5" rx="0.75" fill="#bbb" />
      <rect x="2" y="15" width="56" height="10" rx="2" fill="#fff" />
      <rect x="4" y="17" width="13" height="6" rx="1" fill="#86efac" />
      <rect x="20" y="18" width="20" height="2" rx="0.75" fill="#333" opacity="0.7" />
      <rect x="20" y="22" width="14" height="1.5" rx="0.75" fill="#bbb" />
      <rect x="2" y="28" width="56" height="10" rx="2" fill="#fff" />
      <rect x="4" y="30" width="13" height="6" rx="1" fill="#fde68a" />
      <rect x="20" y="31" width="28" height="2" rx="0.75" fill="#333" opacity="0.7" />
      <rect x="20" y="35" width="18" height="1.5" rx="0.75" fill="#bbb" />
    </svg>
  ),
};

export default function IframeForm({ onChange }: Props) {
  const { t } = useLang();
  const [values, setValues] = useState<IframeFormValues>(DEFAULTS);

  const update = useCallback(
    (partial: Partial<IframeFormValues>) => {
      const updated = { ...values, ...partial };
      setValues(updated);
      onChange(updated);
    },
    [values, onChange]
  );

  const TYPES: { id: IframeType; label: string }[] = [
    { id: "article",       label: t.iframe.types.article },
    { id: "article-image", label: t.iframe.types.articleImage },
    { id: "images-list",   label: t.iframe.types.imagesList },
    { id: "card-list",     label: t.iframe.types.cardList },
  ];

  return (
    <form className={`${styles.form} IframeForm`} onSubmit={(e) => e.preventDefault()}>

      {/* Tipo de iframe */}
      <div className={styles.field}>
        <label>{t.iframe.type}</label>
        <div className={styles.typeGrid}>
          {TYPES.map((tp) => (
            <button
              key={tp.id}
              type="button"
              className={`${styles.typeCard} ${values.type === tp.id ? styles.typeCardActive : ""}`}
              onClick={() => update({ type: tp.id })}
            >
              <span className={styles.typePreview}>{TYPE_PREVIEWS[tp.id]}</span>
              <span className={styles.typeLabel}>{tp.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Ancho × Alto */}
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="iframe-width">{t.iframe.width}</label>
          <input
            id="iframe-width"
            type="text"
            value={values.width}
            onChange={(e) => update({ width: e.target.value })}
            placeholder="100%"
          />
        </div>
        <span className={styles.separator}>×</span>
        <div className={styles.field}>
          <label htmlFor="iframe-height">{t.iframe.height}</label>
          <input
            id="iframe-height"
            type="number"
            min={100}
            max={2000}
            value={values.height}
            onChange={(e) => update({ height: e.target.value })}
            placeholder="450"
          />
        </div>
      </div>

      {/* Borde toggle */}
      <div className={styles.field}>
        <label>{t.iframe.border}</label>
        <div className={styles.borderToggle}>
          <button
            type="button"
            className={`${styles.toggleBtn} ${!values.border ? styles.toggleBtnActive : ""}`}
            onClick={() => update({ border: false })}
          >
            {t.iframe.noBorder}
          </button>
          <button
            type="button"
            className={`${styles.toggleBtn} ${values.border ? styles.toggleBtnActive : ""}`}
            onClick={() => update({ border: true })}
          >
            {t.iframe.withBorder}
          </button>
        </div>
      </div>

      {/* Opciones de borde (condicional) */}
      {values.border && (
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="border-color">{t.iframe.borderColor}</label>
            <div className={styles.colorInput}>
              <input
                type="color"
                value={`#${values.borderColor.replace(/^#/, "")}`}
                onChange={(e) =>
                  update({ borderColor: e.target.value.replace("#", "") })
                }
                className={styles.colorPicker}
              />
              <span>#</span>
              <input
                id="border-color"
                type="text"
                maxLength={6}
                value={values.borderColor}
                onChange={(e) => update({ borderColor: e.target.value })}
                placeholder="e5e7eb"
              />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="border-width">{t.iframe.borderWidth}</label>
            <input
              id="border-width"
              type="number"
              min={1}
              max={10}
              value={values.borderWidth}
              onChange={(e) => update({ borderWidth: e.target.value })}
              placeholder="1"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="border-radius">{t.iframe.borderRadius}</label>
            <input
              id="border-radius"
              type="number"
              min={0}
              max={32}
              value={values.borderRadius}
              onChange={(e) => update({ borderRadius: e.target.value })}
              placeholder="8"
            />
          </div>
        </div>
      )}
    </form>
  );
}
