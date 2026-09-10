"use client";

import { DEVICE_PRESETS, type DevicePresetId, type DevicePresetOrientation } from "@/lib/images/devicePresets";
import { useLang } from "@/providers/LangProvider";
import { RippleButton } from "@/components/shared/RippleButton/RippleButton";
import styles from "./DevicePresets.module.scss";

interface DevicePresetsProps {
  onSelect: (width: string, height: string) => void;
  onReset: () => void;
}

const ORIENTATIONS: DevicePresetOrientation[] = ["landscape", "portrait"];

const PRESET_ICONS: Record<DevicePresetId, React.ReactNode> = {
  desktop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M9 20h6M12 16v4" />
    </svg>
  ),
  laptop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="4" width="14" height="10" rx="1" />
      <path d="M2 18h20l-2-4H4l-2 4Z" />
    </svg>
  ),
  tablet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <circle cx="12" cy="18.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="7" y="2" width="10" height="20" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </svg>
  ),
};

export default function DevicePresets({ onSelect, onReset }: DevicePresetsProps) {
  const { t } = useLang();

  const groupLabel: Record<DevicePresetOrientation, string> = {
    landscape: t.form.devicePresetsLandscape,
    portrait: t.form.devicePresetsPortrait,
  };

  return (
    <div className={`${styles["device-presets"]} DevicePresets`}>
      <div className={styles["device-presets__label-row"]}>
        <span className={styles["device-presets__label"]}>{t.form.devicePresetsLabel}</span>
        <button type="button" className={styles["device-presets__reset"]} onClick={onReset}>
          {t.form.devicePresetsReset}
        </button>
      </div>
      <div className={styles["device-presets__groups"]}>
        {ORIENTATIONS.map((orientation) => (
          <div key={orientation} className={styles["device-presets__group"]}>
            <span className={styles["device-presets__group-label"]}>{groupLabel[orientation]}</span>
            <div className={styles["device-presets__options"]}>
              {DEVICE_PRESETS.filter((preset) => preset.orientation === orientation).map((preset) => (
                <RippleButton
                  key={preset.id}
                  type="button"
                  className={styles["device-presets__option"]}
                  onClick={() => onSelect(String(preset.width), String(preset.height))}
                >
                  <span className={styles["device-presets__icon"]}>{PRESET_ICONS[preset.id]}</span>
                  <span className={styles["device-presets__option-text"]}>
                    <span className={styles["device-presets__option-name"]}>{t.form.devicePresets[preset.id]}</span>
                    <span className={styles["device-presets__option-dims"]}>{preset.width}×{preset.height}</span>
                  </span>
                </RippleButton>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
