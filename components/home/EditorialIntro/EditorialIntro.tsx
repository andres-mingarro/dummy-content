import type { Lang } from "@/lib/i18n/translations";
import styles from "./EditorialIntro.module.scss";
export default function EditorialIntro({lang}:{lang:Lang}) { return <div className={styles["editorial-intro"]}><span className={styles["editorial-intro__eyebrow"]}>02 — {lang === "es" ? "LA HISTORIA" : "THE STORY"}</span><p className={styles["editorial-intro__statement"]}>{lang === "es" ? "Todo lo que necesitás saber sobre el contenido que no necesita decir nada." : "Everything you need to know about content that doesn't need to say anything."}</p></div>; }
