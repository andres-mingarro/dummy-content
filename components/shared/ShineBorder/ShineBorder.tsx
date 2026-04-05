"use client";

import * as React from "react";
import styles from "./ShineBorder.module.scss";

interface ShineBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  borderWidth?: number;
  duration?: number;
  shineColor?: string | string[];
}

export function ShineBorder({
  borderWidth = 1,
  duration = 4,
  shineColor = "var(--accent)",
  className,
  style,
  ...props
}: ShineBorderProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        "--border-width": `${borderWidth}px`,
        "--duration": `${duration}s`,
        backgroundImage: `radial-gradient(transparent, transparent, ${
          Array.isArray(shineColor) ? shineColor.join(",") : shineColor
        }, transparent, transparent)`,
        ...style,
      } as React.CSSProperties}
      className={`ShineBorder animate-shine pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position] ${styles.shineBorder} ${className ?? ""}`}
      {...props}
    />
  );
}
