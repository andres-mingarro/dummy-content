"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useLang } from "@/providers/LangProvider";
import { ToolPanel, ToolSnippet, ToolSnippets, ToolWorkspace, ToolWorkspaceGrid } from "@/components/shared/ToolWorkspace/ToolWorkspace";
import styles from "./IframePageClient.module.scss";
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
  darkMode: false,
  cardCount: "",
  imageCount: "",
  paragraphCount: "",
};

function buildEmbedPath(values: IframeFormValues): string {
  const basePath = `/iframe/${values.type}`;
  const params = new URLSearchParams();
  if (values.type === "card-list" && values.cardCount) params.set("cards", values.cardCount);
  if (values.type === "images-list" && values.imageCount) params.set("images", values.imageCount);
  if ((values.type === "article" || values.type === "article-image") && values.paragraphCount) params.set("paragraphs", values.paragraphCount);
  if (values.darkMode) params.set("theme", "dark");
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

function buildPreviewPath(values: IframeFormValues, lang: string): string {
  const publicPath = buildEmbedPath(values);
  const [pathname, query = ""] = publicPath.split("?");
  const params = new URLSearchParams(query);
  params.set("lang", lang);
  return `${pathname}?${params.toString()}`;
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

  const embedPath = useMemo(() => buildEmbedPath(formValues), [formValues]);
  const previewPath = useMemo(() => buildPreviewPath(formValues, lang), [formValues, lang]);
  const fullUrl = origin ? `${origin}${embedPath}` : embedPath;
  const iframeStyle = useMemo(() => buildIframeStyle(formValues), [formValues]);
  const htmlSnippet = useMemo(() => buildHtmlSnippet(fullUrl, formValues), [fullUrl, formValues]);

  const handleChange = useCallback((values: IframeFormValues) => setFormValues(values), []);

  return <ToolWorkspace tone="iframe" eyebrow="03 — DummyIframe" description={t.iframe.subtitle}>
    <ToolWorkspaceGrid>
      <ToolPanel label={lang === "es" ? "Configuración" : "Configuration"}><IframeForm onChange={handleChange}/></ToolPanel>
      <ToolPanel label={t.iframe.preview}><div className={styles["iframe-tool__preview"]}><iframe key={previewPath} src={previewPath} style={iframeStyle} loading="lazy" title={lang === "es" ? "Vista previa del iframe" : "Iframe preview"}/></div></ToolPanel>
      <ToolSnippets>
        <ToolSnippet label={t.iframe.generatedUrl} action={<CopyButton text={fullUrl} label={t.copy.url} copiedLabel={t.copy.copied}/>}>{fullUrl}</ToolSnippet>
        <ToolSnippet label={t.iframe.html} action={<CopyButton text={htmlSnippet} label={t.copy.html} copiedLabel={t.copy.copied}/>}>{htmlSnippet}</ToolSnippet>
      </ToolSnippets>
    </ToolWorkspaceGrid>
  </ToolWorkspace>;
}
