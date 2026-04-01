"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/providers/ThemeProvider";
import { useLang } from "@/providers/LangProvider";
import styles from "./Header.module.scss";

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { lang, t, toggleLang } = useLang();

  const navItems = [
    { href: "/images", label: t.header.image },
    { href: "/iframe", label: t.header.iframe },
    { href: "/text",   label: t.header.text  },
  ];

  return (
    <header className={`${styles.header} Header`}>
      <Link href="/images" className={styles.logo}>
        Dummy Content
      </Link>

      <nav className={styles.nav}>
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.link} ${pathname.startsWith(href) ? styles.linkActive : ""}`}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className={styles.controls}>
        <button type="button" className={styles.controlBtn} onClick={toggleLang} aria-label="Toggle language">
          {lang === "es" ? "EN" : "ES"}
        </button>

        <button type="button" className={styles.controlBtn} onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}
