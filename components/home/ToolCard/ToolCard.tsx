import Link from "next/link";
import { bebasNeue } from "@/components/shared/Logo/Logo";
import styles from "./ToolCard.module.scss";

export type ToolVariant = "image" | "text" | "iframe";

interface ToolCardProps { href:string; number:string; sample:string; label:string; description:string; action:string; variant:ToolVariant }

function ToolVisual({ variant }: { variant: ToolVariant }) {
  if (variant === "image") return <><span className={styles["tool-card__sun"]}/><span className={styles["tool-card__mountain"]}/><span className={styles["tool-card__dimension"]}>1200 × 630</span></>;
  if (variant === "text") return <div className={styles["tool-card__lines"]}>{[92,78,88,55].map(width=><i key={width} style={{width:`${width}%`}}/>)}</div>;
  return <div className={styles["tool-card__browser"]}><i/><i/><i/><span><b/><b/><b/></span></div>;
}

export default function ToolCard({ href, number, sample, label, description, action, variant }: ToolCardProps) {
  return (
    <Link href={href} className={`${styles["tool-card"]} ${styles[`tool-card--${variant}`]}`}>
      <div className={styles["tool-card__meta"]}><span>{number}</span><span>{sample}</span></div>
      <div className={styles["tool-card__content"]}>
        <h3 className={`${bebasNeue.className} ${styles["tool-card__title"]}`}>{label}</h3>
        <p className={styles["tool-card__description"]}>{description}</p>
        <span className={styles["tool-card__action"]}>{action}<i aria-hidden="true">↗</i></span>
      </div>
      <div className={styles["tool-card__visual"]} aria-hidden="true"><ToolVisual variant={variant}/></div>
    </Link>
  );
}
