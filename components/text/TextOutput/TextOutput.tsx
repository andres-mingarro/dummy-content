"use client";

import styles from "./TextOutput.module.scss";

interface TextOutputProps {
  text: string;
}

export default function TextOutput({ text }: TextOutputProps) {
  if (!text) return null;

  return (
    <div className={`${styles.content} TextOutput`} spellCheck={false}>
      {text.split("\n\n").filter(Boolean).map((p, i) => (
        <p key={i} className={styles.paragraph}>{p}</p>
      ))}
    </div>
  );
}
