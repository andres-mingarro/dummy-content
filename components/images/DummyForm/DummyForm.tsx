"use client";

import { useState, useCallback } from "react";
import type { DesignType } from "@/lib/images/imageGenerator";
import { type LandscapeSubType, LANDSCAPE_SUB_TYPES, LANDSCAPE_SVG_INNER } from "@/lib/images/landscapes";
import { type UserSubType, USER_SUB_TYPES, USER_SVG_INNER_MAP } from "@/lib/images/users";
import { useLang } from "@/providers/LangProvider";
import { RippleButton } from "@/components/shared/RippleButton/RippleButton";
import { ShineBorder } from "@/components/shared/ShineBorder/ShineBorder";
import styles from "./DummyForm.module.scss";

export interface FormValues {
  width: string;
  height: string;
  bgColor: string;
  textColor: string;
  label: string;
  design: DesignType;
  landscapeSubType: LandscapeSubType;
  userSubType: UserSubType;
}

interface DummyFormProps {
  onChange: (values: FormValues) => void;
}

const DEFAULT_VALUES: FormValues = {
  width: "600",
  height: "400",
  bgColor: "cccccc",
  textColor: "333333",
  label: "",
  design: "solid",
  landscapeSubType: "nature",
  userSubType: "style-1",
};

function LandscapePreview({ subType }: { subType: LandscapeSubType }) {
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" overflow="hidden">${LANDSCAPE_SVG_INNER[subType]}</svg>`;
  return <div dangerouslySetInnerHTML={{ __html: svgString }} />;
}

function UserPreview({ subType }: { subType: UserSubType }) {
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" overflow="hidden">${USER_SVG_INNER_MAP[subType]}</svg>`;
  return <div dangerouslySetInnerHTML={{ __html: svgString }} />;
}

const DESIGN_PREVIEWS: Record<DesignType, React.ReactNode> = {
  solid: (
    <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#cccccc" />
      <text x="50%" y="52%" dominantBaseline="middle" textAnchor="middle"
        fontFamily="Arial" fontSize="8" fill="#555">600×400</text>
    </svg>
  ),
  landscape: null, // rendered dynamically
  user: null,      // rendered dynamically
  texture: (
    <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="prev-diag" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.3" />
        </pattern>
      </defs>
      <rect width="60" height="40" fill="#eef2ff" />
      <rect width="60" height="40" fill="url(#prev-diag)" />
    </svg>
  ),
};

export default function DummyForm({ onChange }: DummyFormProps) {
  const { t } = useLang();
  const [values, setValues] = useState<FormValues>(DEFAULT_VALUES);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const updated = { ...values, [e.target.name]: e.target.value };
      setValues(updated);
      onChange(updated);
    },
    [values, onChange]
  );

  const handleDesign = useCallback(
    (design: DesignType) => {
      const updated = { ...values, design };
      setValues(updated);
      onChange(updated);
    },
    [values, onChange]
  );

  const handleLandscapeSubType = useCallback(
    (landscapeSubType: LandscapeSubType) => {
      const updated = { ...values, landscapeSubType };
      setValues(updated);
      onChange(updated);
    },
    [values, onChange]
  );

  const handleUserSubType = useCallback(
    (userSubType: UserSubType) => {
      const updated = { ...values, userSubType };
      setValues(updated);
      onChange(updated);
    },
    [values, onChange]
  );

  const DESIGNS: { id: DesignType; label: string }[] = [
    { id: "solid",     label: t.form.designs.solid },
    { id: "landscape", label: t.form.designs.landscape },
    { id: "user",      label: t.form.designs.user },
    { id: "texture",   label: t.form.designs.texture },
  ];

  const bgColorLabel =
    values.design === "landscape" ? t.form.skyColor :
    values.design === "user"      ? t.form.background :
    values.design === "texture"   ? t.form.background :
    t.form.bgColor;

  return (
    <form className={`${styles.form} DummyForm`} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.field}>
        <label>{t.form.design}</label>
        <div className={styles.designGrid}>
          {DESIGNS.map((d) => (
            <div key={d.id} style={{ position: "relative", borderRadius: "0.75rem" }}>
              <RippleButton
                type="button"
                className={`${styles.designCard} ${values.design === d.id ? styles.designCardActive : ""}`}
                onClick={() => handleDesign(d.id)}
              >
                <span className={styles.designPreview}>
                  {d.id === "landscape"
                    ? <LandscapePreview subType={values.landscapeSubType} />
                    : d.id === "user"
                    ? <UserPreview subType={values.userSubType} />
                    : DESIGN_PREVIEWS[d.id]}
                </span>
                <span className={styles.designLabel}>{d.label}</span>
              </RippleButton>
              {values.design === d.id && <ShineBorder borderWidth={1.5} />}
            </div>
          ))}
        </div>

        {values.design === "landscape" && (
          <div className={styles.landscapeSubGrid}>
            {LANDSCAPE_SUB_TYPES.map((sub) => (
              <div key={sub} style={{ position: "relative", borderRadius: "0.5rem" }}>
                <RippleButton
                  type="button"
                  className={`${styles.landscapeSubCard} ${values.landscapeSubType === sub ? styles.landscapeSubCardActive : ""}`}
                  onClick={() => handleLandscapeSubType(sub)}
                >
                  <span className={styles.landscapeSubPreview}>
                    <LandscapePreview subType={sub} />
                  </span>
                  <span className={styles.landscapeSubLabel}>
                    {t.form.landscapes[sub]}
                  </span>
                </RippleButton>
                {values.landscapeSubType === sub && <ShineBorder borderWidth={1.5} />}
              </div>
            ))}
          </div>
        )}

        {values.design === "user" && (
          <div className={styles.landscapeSubGrid}>
            {USER_SUB_TYPES.map((sub) => (
              <div key={sub} style={{ position: "relative", borderRadius: "0.5rem" }}>
                <RippleButton
                  type="button"
                  className={`${styles.landscapeSubCard} ${values.userSubType === sub ? styles.landscapeSubCardActive : ""}`}
                  onClick={() => handleUserSubType(sub)}
                >
                  <span className={styles.landscapeSubPreview}>
                    <UserPreview subType={sub} />
                  </span>
                  <span className={styles.landscapeSubLabel}>
                    {t.form.users[sub]}
                  </span>
                </RippleButton>
                {values.userSubType === sub && <ShineBorder borderWidth={1.5} />}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="width">{t.form.width}</label>
          <input id="width" name="width" type="number" min={1} max={4000}
            value={values.width} onChange={handleChange} placeholder="600" />
        </div>
        <span className={styles.separator}>×</span>
        <div className={styles.field}>
          <label htmlFor="height">{t.form.height}</label>
          <input id="height" name="height" type="number" min={1} max={4000}
            value={values.height} onChange={handleChange} placeholder="400" />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="bgColor">{bgColorLabel}</label>
          <div className={styles.colorInput}>
            <input type="color"
              value={`#${values.bgColor.replace(/^#/, "")}`}
              onChange={(e) => handleChange({
                target: { name: "bgColor", value: e.target.value.replace("#", "") },
              } as React.ChangeEvent<HTMLInputElement>)}
              className={styles.colorPicker}
            />
            <span>#</span>
            <input id="bgColor" name="bgColor" type="text" maxLength={6}
              value={values.bgColor} onChange={handleChange} placeholder="cccccc" />
          </div>
        </div>

        {values.design !== "landscape" && values.design !== "user" && (
          <div className={styles.field}>
            <label htmlFor="textColor">
              {values.design === "texture" ? t.form.lineColor : t.form.textColor}
            </label>
            <div className={styles.colorInput}>
              <input type="color"
                value={`#${values.textColor.replace(/^#/, "")}`}
                onChange={(e) => handleChange({
                  target: { name: "textColor", value: e.target.value.replace("#", "") },
                } as React.ChangeEvent<HTMLInputElement>)}
                className={styles.colorPicker}
              />
              <span>#</span>
              <input id="textColor" name="textColor" type="text" maxLength={6}
                value={values.textColor} onChange={handleChange} placeholder="333333" />
            </div>
          </div>
        )}
      </div>

      {values.design === "solid" && (
        <div className={styles.field}>
          <label htmlFor="label">{t.form.customLabel}</label>
          <input id="label" name="label" type="text"
            value={values.label} onChange={handleChange}
            placeholder={`${values.width}×${values.height}`} />
        </div>
      )}
    </form>
  );
}
