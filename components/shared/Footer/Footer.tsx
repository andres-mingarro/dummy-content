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
      <Link href="/terms" className={styles.link}>
        {t.footer.terms}
      </Link>
    </footer>
  );
}
