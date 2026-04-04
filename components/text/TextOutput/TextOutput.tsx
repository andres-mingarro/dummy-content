"use client";

import { motion } from "motion/react";
import styles from "./TextOutput.module.scss";

interface TextOutputProps {
  text: string;
}

const wordVariants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.15 },
  },
};

function AnimatedParagraph({ text }: { text: string }) {
  const words = text.split(/(\s+)/);
  const wordCount = words.filter((w) => w.trim()).length;
  const stagger = Math.max(0.01, Math.min(0.08, 1 / wordCount));

  const containerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { delayChildren: 0, staggerChildren: stagger },
    },
  };

  return (
    <motion.p
      key={text}
      className={styles.paragraph}
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{ margin: 0 }}
      aria-label={text}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className="inline-block whitespace-pre"
          aria-hidden
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

export default function TextOutput({ text }: TextOutputProps) {
  if (!text) return null;

  return (
    <div className={`${styles.content} TextOutput`} spellCheck={false}>
      {text.split("\n\n").filter(Boolean).map((p, i) => (
        <AnimatedParagraph key={`${i}-${p.slice(0, 20)}`} text={p} />
      ))}
    </div>
  );
}
