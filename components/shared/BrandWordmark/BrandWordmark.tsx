"use client";

import { Lobster } from "next/font/google";
import { AuroraText } from "@/components/shared/AuroraText/AuroraText";
import { useTheme } from "@/providers/ThemeProvider";
import styles from "./BrandWordmark.module.scss";

const display = Lobster({ weight: "400", subsets: ["latin"] });

interface BrandWordmarkProps {
  size?: "header" | "hero";
  className?: string;
}

const palette = {
  dark: ["#b8ff3d", "#56e6ff", "#a78bfa", "#b8ff3d"],
  light: ["#397300", "#007d9b", "#6845bb", "#397300"],
};

export default function BrandWordmark({ size = "header", className = "" }: BrandWordmarkProps) {
  const { theme } = useTheme();

  return (
    <span
      className={`${display.className} ${styles["brand-wordmark"]} ${styles[`brand-wordmark--${size}`]} ${className}`.trim()}
      role="img"
      aria-label="DummyContent"
    >
      &lt;<AuroraText colors={palette[theme]} speed={2}>Dummy</AuroraText>Content/&gt;
    </span>
  );
}
