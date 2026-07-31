import type { ReactNode } from "react";
import styles from "./ToolWorkspace.module.scss";

type Tone = "image" | "text" | "iframe";

export function ToolWorkspace({ tone, eyebrow, description, children }: { tone:Tone; eyebrow:string; description:string; children:ReactNode }) {
  return <main className={`${styles["tool-workspace"]} ${styles[`tool-workspace--${tone}`]}`}>
    <header className={styles["tool-workspace__header"]}>
      <h1 className={styles["tool-workspace__eyebrow"]}>{eyebrow}</h1>
      <p className={styles["tool-workspace__description"]}>{description}</p>
    </header>
    {children}
  </main>;
}

export function ToolWorkspaceGrid({ children }: { children:ReactNode }) { return <div className={styles["tool-workspace__grid"]}>{children}</div>; }

export function ToolPanel({ label, children }: { label:string; children:ReactNode }) {
  return <section className={styles["tool-panel"]}>
    <h2 className={styles["tool-panel__label"]}>{label}</h2>{children}
  </section>;
}

export function ToolSnippets({ children }: { children:ReactNode }) { return <section className={styles["tool-snippets"]}>{children}</section>; }

export function ToolSnippet({ label, children, action }: { label:string; children:ReactNode; action:ReactNode }) {
  return <div className={styles["tool-snippet"]}><div className={styles["tool-snippet__top"]}><span>{label}</span>{action}</div><code className={styles["tool-snippet__code"]}>{children}</code></div>;
}
