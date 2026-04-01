"use client";

import { useRef, useEffect, useState } from "react";
import { prepareWithSegments, layoutWithLines } from "@chenglou/pretext";
import styles from "./TextOutput.module.scss";

const FONT = "14px 'Geist Mono', 'Fira Code', monospace";
const LINE_HEIGHT = 14 * 1.75;

interface TextOutputProps {
  text: string;
}

export default function TextOutput({ text }: TextOutputProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    if (!text || !contentRef.current) return;

    function compute() {
      const width = contentRef.current?.clientWidth ?? 0;
      if (width === 0) return;
      const prepared = prepareWithSegments(text, FONT);
      const result = layoutWithLines(prepared, width, LINE_HEIGHT);
      setLineCount(result.lines.length);
    }

    compute();
    const observer = new ResizeObserver(compute);
    observer.observe(contentRef.current!);
    return () => observer.disconnect();
  }, [text]);

  if (!text) return null;

  const gutterWidth = String(lineCount).length;

  return (
    <div className={styles.wrapper}>
      <div className={styles.gutter}>
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i} className={styles.lineNumber} style={{ minWidth: `${gutterWidth}ch` }}>
            {i + 1}
          </div>
        ))}
      </div>
      <div ref={contentRef} className={styles.content}>
        {text.split("\n\n").filter(Boolean).map((p, i) => (
          <p key={i} className={styles.paragraph}>{p}</p>
        ))}
      </div>
    </div>
  );
}
