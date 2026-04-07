"use client";

import { motion } from "motion/react";
import styles from "./TextOutput.module.scss";

interface TextOutputProps {
  paragraphs: string[];
  displayTags: boolean;
}

export default function TextOutput({ paragraphs, displayTags }: TextOutputProps) {
  if (!paragraphs.length) return null;

  return (
    <div className={`${styles.content} TextOutput`} spellCheck={false}>
      {paragraphs.map((p, i) => {
        const content = displayTags ? `<p>${p}</p>` : p;
        return (
          <motion.p
            key={`${i}-${p.slice(0, 20)}`}
            className={styles.paragraph}
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.25, delay: i * 0.06 }}
            style={{ margin: 0 }}
          >
            {content}
          </motion.p>
        );
      })}
    </div>
  );
}
