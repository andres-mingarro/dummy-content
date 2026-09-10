"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import DummyForm, { FormValues } from "@/components/images/DummyForm/DummyForm";
import ImagePreview from "@/components/images/ImagePreview/ImagePreview";
import CopyButton from "@/components/images/CopyButton/CopyButton";
import { useLang } from "@/providers/LangProvider";
import { ToolPanel, ToolSnippet, ToolSnippets, ToolWorkspace, ToolWorkspaceGrid } from "@/components/shared/ToolWorkspace/ToolWorkspace";
import styles from "./ImagesPageClient.module.scss";

const DEFAULT_FORM: FormValues = {
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

function buildImagePath(values: FormValues): string {
  const { width, height, bgColor, textColor, label, showLabel, design, landscapeSubType, userSubType, textureSubType } = values;
  let path = `/api/image/${width}x${height}/${bgColor}/${textColor}`;
  if ((design === "solid" || design === "texture") && showLabel && label.trim()) {
    path += `/${encodeURIComponent(label.trim())}`;
  }
  const params = new URLSearchParams();
  if (design !== "solid") params.set("design", design);
  if (design === "landscape") params.set("landscape", landscapeSubType);
  if (design === "user") params.set("user", userSubType);
  if (design === "texture") params.set("texture", textureSubType);
  if ((design === "solid" || design === "texture") && !showLabel) params.set("notext", "1");
  const qs = params.toString();
  if (qs) path += `?${qs}`;
  return path;
}

export default function ImagesPageClient() {
  const { t, lang } = useLang();
  const [formValues, setFormValues] = useState<FormValues>(DEFAULT_FORM);
  const imagePath = useMemo(() => buildImagePath(formValues), [formValues]);

  const [origin, setOrigin] = useState("");
  useEffect(() => { setOrigin(window.location.origin); }, []);

  const fullUrl = origin ? `${origin}${imagePath}` : imagePath;
  const handleChange = useCallback((values: FormValues) => setFormValues(values), []);
  const widthNum = parseInt(formValues.width, 10) || 600;
  const heightNum = parseInt(formValues.height, 10) || 400;

  const html = `<img src="${fullUrl}" alt="placeholder ${widthNum}x${heightNum}">`;
  return <ToolWorkspace tone="image" eyebrow="01 — DummyImage" description={t.images.subtitle}>
    <ToolWorkspaceGrid>
      <ToolPanel label={lang === "es" ? "Configuración" : "Configuration"}><DummyForm onChange={handleChange}/></ToolPanel>
      <ToolPanel label={t.images.preview}><div className={styles["images-tool__preview"]}><ImagePreview src={imagePath} width={widthNum} height={heightNum}/></div></ToolPanel>
      <ToolSnippets>
        <ToolSnippet label={t.images.generatedUrl} action={<CopyButton text={fullUrl} label={t.copy.url} copiedLabel={t.copy.copied}/>}>{fullUrl}</ToolSnippet>
        <ToolSnippet label={t.images.html} action={<CopyButton text={html} label={t.copy.html} copiedLabel={t.copy.copied}/>}>{html}</ToolSnippet>
      </ToolSnippets>
    </ToolWorkspaceGrid>
  </ToolWorkspace>;
}
