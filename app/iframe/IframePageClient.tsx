"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useLang } from "@/providers/LangProvider";
import { lobster } from "@/components/shared/Logo/Logo";
import { BlurFade } from "@/components/shared/BlurFade/BlurFade";
import IframeForm, { IframeFormValues } from "@/components/iframe/IframeForm/IframeForm";
import CopyButton from "@/components/images/CopyButton/CopyButton";

const DEFAULT_FORM: IframeFormValues = {
  type: "article",
  width: "100%",
  height: "450",
  border: false,
  borderColor: "e5e7eb",
  borderWidth: "1",
  borderRadius: "8",
};

function buildEmbedPath(values: IframeFormValues, lang: string): string {
  return `/iframe/${values.type}?lang=${lang}`;
}

function buildIframeStyle(values: IframeFormValues): React.CSSProperties {
  const style: React.CSSProperties = {
    display: "block",
    width: values.width || "100%",
    height: `${parseInt(values.height, 10) || 450}px`,
    border: values.border
      ? `${parseInt(values.borderWidth, 10) || 1}px solid #${values.borderColor}`
      : "none",
  };
  if (values.border && parseInt(values.borderRadius, 10) > 0) {
    style.borderRadius = `${parseInt(values.borderRadius, 10)}px`;
  }
  return style;
}

function buildHtmlSnippet(fullUrl: string, values: IframeFormValues): string {
  const w = values.width || "100%";
  const h = parseInt(values.height, 10) || 450;
  const borderStyle = values.border
    ? `border: ${parseInt(values.borderWidth, 10) || 1}px solid #${values.borderColor}; border-radius: ${parseInt(values.borderRadius, 10) || 0}px;`
    : "border: none;";
  return `<iframe src="${fullUrl}" style="display: block; width: ${w}; height: ${h}px; ${borderStyle}" loading="lazy"></iframe>`;
}

export default function IframePageClient() {
  const { t, lang } = useLang();
  const [formValues, setFormValues] = useState<IframeFormValues>(DEFAULT_FORM);
  const [origin, setOrigin] = useState("");

  useEffect(() => { setOrigin(window.location.origin); }, []);

  const embedPath = useMemo(() => buildEmbedPath(formValues, lang), [formValues, lang]);
  const fullUrl = origin ? `${origin}${embedPath}` : embedPath;
  const iframeStyle = useMemo(() => buildIframeStyle(formValues), [formValues]);
  const htmlSnippet = useMemo(() => buildHtmlSnippet(fullUrl, formValues), [fullUrl, formValues]);

  const handleChange = useCallback((values: IframeFormValues) => setFormValues(values), []);

  return (
    <main className="flex-1 py-12 px-4 IframePage" style={{ background: "var(--background)" }}>
      <div className="max-w-2xl mx-auto space-y-8">

        {/* Título */}
        <div className="text-center space-y-2">
          <BlurFade delay={0} direction="up">
            <h1 className={lobster.className} style={{ fontSize: "40px", color: "#fff" }}>
              &lt;Dummy Iframe&gt;
            </h1>
          </BlurFade>
          <BlurFade delay={0.05} direction="up">
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              {t.iframe.subtitle}
            </p>
          </BlurFade>
        </div>

        {/* Formulario + URLs */}
        <div className="rounded-2xl shadow-sm p-6 space-y-6" style={{ background: "var(--card)", border: "1.5px solid var(--card-border)" }}>
          <BlurFade delay={0.1} direction="up">
            <IframeForm onChange={handleChange} />
          </BlurFade>

          <BlurFade delay={0.2} direction="up">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                {t.iframe.generatedUrl}
              </span>
              <div className="flex items-center gap-2 rounded-xl px-4 py-3" style={{ background: "var(--muted-bg)", border: "1.5px solid var(--card-border)" }}>
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
                {t.iframe.html}
              </span>
              <div className="flex items-center gap-2 rounded-xl px-4 py-3" style={{ background: "var(--muted-bg)", border: "1.5px solid var(--card-border)" }}>
                <code className="flex-1 text-sm break-all font-mono" style={{ color: "var(--foreground)" }}>
                  {htmlSnippet}
                </code>
                <CopyButton text={htmlSnippet} label={t.copy.html} copiedLabel={t.copy.copied} />
              </div>
            </div>
          </BlurFade>
        </div>

        {/* Preview */}
        <BlurFade delay={0.4} direction="up">
          <div className="rounded-2xl shadow-sm p-6 space-y-4" style={{ background: "var(--card)", border: "1.5px solid var(--card-border)" }}>
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
              {t.iframe.preview}
            </span>
            <div style={{ overflow: "auto" }}>
              <iframe
                key={embedPath}
                src={embedPath}
                style={iframeStyle}
                loading="lazy"
              />
            </div>
          </div>
        </BlurFade>

      </div>
    </main>
  );
}
