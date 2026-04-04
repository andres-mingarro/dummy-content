"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/providers/LangProvider";
import Logo from "@/components/shared/Logo/Logo";
import { RippleButton } from "@/components/shared/RippleButton/RippleButton";
import { AnimatedThemeToggler } from "@/components/shared/AnimatedThemeToggler/AnimatedThemeToggler";
import styles from "./Header.module.scss";

export default function Header() {
  const pathname = usePathname();
  const { lang, t, toggleLang } = useLang();

  const navItems = [
    { href: "/images", label: t.header.image },
    { href: "/text",   label: t.header.text  },
    { href: "/iframe", label: t.header.iframe },
  ];

  return (
    <header className={`${styles.header} Header`}>
      <Link href="/" className={styles.logo}>
        <Logo variant={3} name={false} />
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
        <RippleButton type="button" className={styles.controlBtn} onClick={toggleLang} aria-label="Toggle language">
          {lang === "es" ? <><FlagUS />&nbsp;English</> : <><FlagAR />&nbsp;Español</>}
        </RippleButton>

        <AnimatedThemeToggler className={styles.controlBtn} />
      </div>
    </header>
  );
}

function FlagUS() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7410 3900" width="20" height="11">
      <rect width="7410" height="3900" fill="#b22234"/>
      <rect y="300" width="7410" height="300" fill="#fff"/>
      <rect y="900" width="7410" height="300" fill="#fff"/>
      <rect y="1500" width="7410" height="300" fill="#fff"/>
      <rect y="2100" width="7410" height="300" fill="#fff"/>
      <rect y="2700" width="7410" height="300" fill="#fff"/>
      <rect y="3300" width="7410" height="300" fill="#fff"/>
      <rect width="2964" height="2100" fill="#3c3b6e"/>
    </svg>
  );
}

function FlagAR() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="20" height="13">
      <rect width="900" height="600" fill="#74acdf"/>
      <rect y="200" width="900" height="200" fill="#fff"/>
      <circle cx="450" cy="300" r="60" fill="#f6b40e"/>
    </svg>
  );
}

