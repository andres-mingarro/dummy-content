"use client";

import Link from "next/link";
import { useLang } from "@/providers/LangProvider";
import styles from "./Footer.module.scss";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className={`${styles.footer} Footer`}>
      <span className={styles.copy} suppressHydrationWarning>
        © {new Date().getFullYear()} Dummy Content. {t.footer.copyright}
      </span>
      <div className={styles.links}>
        <Link href="/support" className={styles.link}>
          {t.footer.support}
        </Link>
        <Link href="/terms" className={styles.link}>
          {t.footer.terms}
        </Link>
      </div>
    </footer>
  );
}
