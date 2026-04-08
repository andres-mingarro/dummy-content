"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import DummyForm, { FormValues } from "@/components/images/DummyForm/DummyForm";
import ImagePreview from "@/components/images/ImagePreview/ImagePreview";
import CopyButton from "@/components/images/CopyButton/CopyButton";
import { useLang } from "@/providers/LangProvider";
import { lobster } from "@/components/shared/Logo/Logo";
import { BlurFade } from "@/components/shared/BlurFade/BlurFade";
import { AuroraText } from "@/components/shared/AuroraText/AuroraText";
import styles from "./ImagesPageClient.module.scss";

const DEFAULT_FORM: FormValues = {
  width: "600",
  height: "400",
  bgColor: "cccccc",
  textColor: "333333",
  label: "",
  design: "solid",
  landscapeSubType: "nature",
  userSubType: "style-1",
};

function buildImagePath(values: FormValues): string {
  const { width, height, bgColor, textColor, label, design, landscapeSubType, userSubType } = values;
  let path = `/api/image/${width}x${height}/${bgColor}/${textColor}`;
  if (design === "solid" && label.trim()) path += `/${encodeURIComponent(label.trim())}`;
  if (design !== "solid") {
    path += `?design=${design}`;
    if (design === "landscape") path += `&landscape=${landscapeSubType}`;
    if (design === "user") path += `&user=${userSubType}`;
  }
  return path;
}

export default function ImagesPageClient() {
  const { t } = useLang();
  const [formValues, setFormValues] = useState<FormValues>(DEFAULT_FORM);
  const imagePath = useMemo(() => buildImagePath(formValues), [formValues]);

  const [origin, setOrigin] = useState("");
  useEffect(() => { setOrigin(window.location.origin); }, []);

  const fullUrl = origin ? `${origin}${imagePath}` : imagePath;
  const handleChange = useCallback((values: FormValues) => setFormValues(values), []);
  const widthNum = parseInt(formValues.width, 10) || 600;
  const heightNum = parseInt(formValues.height, 10) || 400;

  return (
    <main className="flex-1 py-12 px-4 ImagesPage" style={{ background: "var(--background)" }}>
      <div className="max-w-2xl mx-auto space-y-8">

        <div className="text-center space-y-2">
          <BlurFade delay={0} direction="up">
            <h1 className={lobster.className} style={{ fontSize: "40px", color: "var(--heading)" }}>
              &lt;<AuroraText colors={["#07CFFE", "#a78bfa", "#38bdf8", "#07CFFE"]} speed={2}>Dummy</AuroraText> Image&gt;
            </h1>
          </BlurFade>
          <BlurFade delay={0.05} direction="up">
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              {t.images.subtitle}
            </p>
          </BlurFade>
        </div>

        <div className="rounded-2xl shadow-sm p-6 space-y-6" style={{ background: "var(--card)", border: "1.5px solid var(--card-border)" }}>
          <BlurFade delay={0.1} direction="up">
            <DummyForm onChange={handleChange} />
          </BlurFade>

          <BlurFade delay={0.2} direction="up">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                {t.images.generatedUrl}
              </span>
              <div className={`flex items-center gap-2 rounded-xl px-4 py-3 ${styles.snippetBox}`} style={{ background: "var(--muted-bg)", border: "1.5px solid var(--card-border)" }}>
                <code className="flex-1 text-sm break-all font-mono" style={{ color: "var(--accent)" }}>
                  {fullUrl}
                </code>
                <CopyButton text={fullUrl} label={t.copy.url} copiedLabel={t.copy.copied} />
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.3} direction="up">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                {t.images.html}
              </span>
              <div className={`flex items-center gap-2 rounded-xl px-4 py-3 ${styles.snippetBox}`} style={{ background: "var(--muted-bg)", border: "1.5px solid var(--card-border)" }}>
                <code className="flex-1 text-sm break-all font-mono" style={{ color: "var(--foreground)" }}>
                  {`<img src="${fullUrl}" alt="placeholder ${widthNum}x${heightNum}">`}
                </code>
                <CopyButton
                  text={`<img src="${fullUrl}" alt="placeholder ${widthNum}x${heightNum}">`}
                  label={t.copy.html}
                  copiedLabel={t.copy.copied}
                />
              </div>
            </div>
          </BlurFade>
        </div>

        <BlurFade delay={0.4} direction="up">
          <div className="rounded-2xl shadow-sm p-6 space-y-4" style={{ background: "var(--card)", border: "1.5px solid var(--card-border)" }}>
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
              {t.images.preview}
            </span>
            <ImagePreview src={imagePath} width={widthNum} height={heightNum} />
          </div>
        </BlurFade>

      </div>
    </main>
  );
}
