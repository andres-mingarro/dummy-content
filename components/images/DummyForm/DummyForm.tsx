"use client";

import { useState, useCallback, useRef } from "react";
import type { DesignType } from "@/lib/images/imageGenerator";
import { type LandscapeSubType, LANDSCAPE_SUB_TYPES, LANDSCAPE_SVG_MAP } from "@/lib/images/landscapes";
import { type UserSubType, USER_SUB_TYPES, USER_SVG_INNER_MAP } from "@/lib/images/users";
import { type TextureSubType, TEXTURE_SUB_TYPES } from "@/lib/images/textures";
import { TEXTURE_SVG_MAP } from "@/components/images/SvgPresetGenerator";
import { useLang } from "@/providers/LangProvider";
import type { Translations } from "@/lib/i18n/translations";
import { RippleButton } from "@/components/shared/RippleButton/RippleButton";
import DevicePresets from "@/components/images/DevicePresets/DevicePresets";
import ResetLink from "@/components/shared/ResetLink/ResetLink";
import styles from "./DummyForm.module.scss";

export interface FormValues {
  width: string;
  height: string;
  bgColor: string;
  textColor: string;
  label: string;
  showLabel: boolean;
  design: DesignType;
  landscapeSubType: LandscapeSubType;
  userSubType: UserSubType;
  textureSubType: TextureSubType;
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
  showLabel: true,
  design: "solid",
  landscapeSubType: "forest",
  userSubType: "style-1",
  textureSubType: "bullseye-gradient",
};

function LandscapePreview({ subType }: { subType: LandscapeSubType }) {
  const { inner, viewBox } = LANDSCAPE_SVG_MAP[subType];
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" preserveAspectRatio="xMidYMid slice" overflow="hidden">${inner}</svg>`;
  return <div dangerouslySetInnerHTML={{ __html: svgString }} />;
}

interface LandscapeSubGridProps {
  selected: LandscapeSubType;
  onSelect: (sub: LandscapeSubType) => void;
  t: Translations;
}

function LandscapeSubGrid({ selected, onSelect, t }: LandscapeSubGridProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className={`${styles.landscapeSubGrid} ${expanded ? styles.landscapeSubGridExpanded : ""}`}>
        {LANDSCAPE_SUB_TYPES.map((sub, i) => (
          <div key={sub} className={styles.subCardAnimated} style={{ position: "relative", borderRadius: "0.5rem", "--i": i } as React.CSSProperties}>
            <RippleButton
              type="button"
              className={`${styles.landscapeSubCard} ${selected === sub ? styles.landscapeSubCardActive : ""}`}
              onClick={() => onSelect(sub)}
            >
              <span className={styles.landscapeSubPreview}>
                <LandscapePreview subType={sub} />
              </span>
              <span className={styles.landscapeSubLabel}>
                {t.form.landscapes[sub]}
              </span>
            </RippleButton>
          </div>
        ))}
      </div>
      {LANDSCAPE_SUB_TYPES.length > 6 && (
        <button
          type="button"
          className={styles.subGridToggle}
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? t.form.showLess : t.form.showMore}
          <svg
            className={`${styles.subGridToggleIcon} ${expanded ? styles.subGridToggleIconOpen : ""}`}
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <polyline points="4,6 8,10 12,6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </>
  );
}

function UserPreview({ subType }: { subType: UserSubType }) {
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" overflow="hidden">${USER_SVG_INNER_MAP[subType]}</svg>`;
  return <div dangerouslySetInnerHTML={{ __html: svgString }} />;
}

function TexturePreview({ subType }: { subType: TextureSubType }) {
  const { buildInner, mode } = TEXTURE_SVG_MAP[subType];
  const inner = buildInner();
  let svgString: string;
  if (mode.type === "gradient") {
    svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" overflow="hidden"><svg viewBox="${mode.viewBox}" width="600" height="400" preserveAspectRatio="xMidYMid slice">${inner}</svg></svg>`;
  } else {
    const tw = mode.width!;
    const th = mode.height!;
    svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><defs><pattern id="prev-tex-${subType}" x="0" y="0" width="${tw}" height="${th}" patternUnits="userSpaceOnUse">${inner}</pattern></defs><rect width="600" height="400" fill="url(#prev-tex-${subType})"/></svg>`;
  }
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
  texture: null, // rendered dynamically
};

export default function DummyForm({ onChange }: DummyFormProps) {
  const { t } = useLang();
  const [values, setValues] = useState<FormValues>(DEFAULT_VALUES);
  const bgColorPickerRef = useRef<HTMLInputElement>(null);
  const textColorPickerRef = useRef<HTMLInputElement>(null);

  const openColorPicker = useCallback((ref: React.RefObject<HTMLInputElement | null>) => (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target;
    if (target instanceof HTMLInputElement) return;
    ref.current?.click();
  }, []);

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

  const handleTextureSubType = useCallback(
    (textureSubType: TextureSubType) => {
      const updated = { ...values, textureSubType };
      setValues(updated);
      onChange(updated);
    },
    [values, onChange]
  );

  const handleDevicePreset = useCallback(
    (width: string, height: string) => {
      const updated = { ...values, width, height };
      setValues(updated);
      onChange(updated);
    },
    [values, onChange]
  );

  const handleDevicePresetReset = useCallback(() => {
    const updated = { ...values, width: DEFAULT_VALUES.width, height: DEFAULT_VALUES.height };
    setValues(updated);
    onChange(updated);
  }, [values, onChange]);

  const handleLabelReset = useCallback(() => {
    const updated = { ...values, label: DEFAULT_VALUES.label, showLabel: DEFAULT_VALUES.showLabel };
    setValues(updated);
    onChange(updated);
  }, [values, onChange]);

  const DESIGNS: { id: DesignType; label: string }[] = [
    { id: "solid",     label: t.form.designs.solid },
    { id: "landscape", label: t.form.designs.landscape },
    { id: "user",      label: t.form.designs.user },
    { id: "texture",   label: t.form.designs.texture },
  ];

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
                    : d.id === "texture"
                    ? <TexturePreview subType={values.textureSubType} />
                    : DESIGN_PREVIEWS[d.id]}
                </span>
                <span className={styles.designLabel}>{d.label}</span>
              </RippleButton>
            </div>
          ))}
        </div>

        {values.design === "landscape" && (
          <LandscapeSubGrid selected={values.landscapeSubType} onSelect={handleLandscapeSubType} t={t} />
        )}

        {values.design === "user" && (
          <div className={styles.landscapeSubGrid}>
            {USER_SUB_TYPES.map((sub, i) => (
              <div key={sub} className={styles.subCardAnimated} style={{ position: "relative", borderRadius: "0.5rem", "--i": i } as React.CSSProperties}>
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
              </div>
            ))}
          </div>
        )}

        {values.design === "texture" && (
          <div className={styles.landscapeSubGrid}>
            {TEXTURE_SUB_TYPES.map((sub, i) => (
              <div key={sub} className={styles.subCardAnimated} style={{ position: "relative", borderRadius: "0.5rem", "--i": i } as React.CSSProperties}>
                <RippleButton
                  type="button"
                  className={`${styles.landscapeSubCard} ${values.textureSubType === sub ? styles.landscapeSubCardActive : ""}`}
                  onClick={() => handleTextureSubType(sub)}
                >
                  <span className={styles.landscapeSubPreview}>
                    <TexturePreview subType={sub} />
                  </span>
                  <span className={styles.landscapeSubLabel}>
                    {t.form.textures[sub]}
                  </span>
                </RippleButton>
              </div>
            ))}
          </div>
        )}
      </div>

      {(values.design === "solid" || values.design === "texture") && (
        <div className={styles.field}>
          <div className={styles.labelRow}>
            <div className={styles.labelWithReset}>
              <label htmlFor="label">{t.form.customLabel}</label>
              <ResetLink onClick={handleLabelReset}>{t.form.reset}</ResetLink>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={values.showLabel}
              className={`${styles.switch} ${values.showLabel ? styles.switchOn : ""}`}
              onClick={() => {
                const updated = { ...values, showLabel: !values.showLabel };
                setValues(updated);
                onChange(updated);
              }}
            >
              <span className={styles.switchThumb} />
            </button>
          </div>
          <input id="label" name="label" type="text" className={styles.customTextInput}
            value={values.label} onChange={handleChange}
            placeholder={`${values.width}×${values.height}`}
            disabled={!values.showLabel} />
        </div>
      )}

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

      <DevicePresets onSelect={handleDevicePreset} onReset={handleDevicePresetReset} />

      {values.design === "solid" && (
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="bgColor">{t.form.bgColor}</label>
            <div className={styles.colorInput} onClick={openColorPicker(bgColorPickerRef)}>
              <span className={styles.colorSwatch} style={{ background: `#${values.bgColor.replace(/^#/, "")}` }}>
                <input ref={bgColorPickerRef} type="color"
                  value={`#${values.bgColor.replace(/^#/, "")}`}
                  onChange={(e) => handleChange({
                    target: { name: "bgColor", value: e.target.value.replace("#", "") },
                  } as React.ChangeEvent<HTMLInputElement>)}
                  className={styles.colorPicker}
                />
              </span>
              <span className={styles.colorHash}>#</span>
              <input id="bgColor" name="bgColor" type="text" maxLength={6}
                value={values.bgColor} onChange={handleChange} placeholder="cccccc" />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="textColor">{t.form.textColor}</label>
            <div className={styles.colorInput} onClick={openColorPicker(textColorPickerRef)}>
              <span className={styles.colorSwatch} style={{ background: `#${values.textColor.replace(/^#/, "")}` }}>
                <input ref={textColorPickerRef} type="color"
                  value={`#${values.textColor.replace(/^#/, "")}`}
                  onChange={(e) => handleChange({
                    target: { name: "textColor", value: e.target.value.replace("#", "") },
                  } as React.ChangeEvent<HTMLInputElement>)}
                  className={styles.colorPicker}
                />
              </span>
              <span className={styles.colorHash}>#</span>
              <input id="textColor" name="textColor" type="text" maxLength={6}
                value={values.textColor} onChange={handleChange} placeholder="333333" />
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
