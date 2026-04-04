"use client";

import { useState, useCallback } from "react";
import { RippleButton } from "@/components/shared/RippleButton/RippleButton";
import styles from "./CopyButton.module.scss";

interface CopyButtonProps {
  text: string;
  label?: string;
  copiedLabel?: string;
}

export default function CopyButton({ text, label = "Copiar URL", copiedLabel = "¡Copiado!" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  return (
    <RippleButton
      onClick={handleCopy}
      className={`${styles.button} ${copied ? styles.copied : ""} CopyButton`}
      type="button"
      aria-label={copied ? copiedLabel : label}
    >
      {copied ? (
        <>
          <CheckIcon />
          {copiedLabel}
        </>
      ) : (
        <>
          <CopyIcon />
          {label}
        </>
      )}
    </RippleButton>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
