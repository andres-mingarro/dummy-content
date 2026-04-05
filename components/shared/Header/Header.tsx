"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useLang } from "@/providers/LangProvider";
import Logo from "@/components/shared/Logo/Logo";
import { RippleButton } from "@/components/shared/RippleButton/RippleButton";
import { AnimatedThemeToggler } from "@/components/shared/AnimatedThemeToggler/AnimatedThemeToggler";
import styles from "./Header.module.scss";

export default function Header() {
  const pathname = usePathname();
  const { lang, t, toggleLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => { setMenuOpen(false); setIsClosing(false); }, 200);
  };

  // Cerrar menu al cambiar de ruta
  useEffect(() => { if (menuOpen) closeMenu(); }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Bloquear scroll cuando el menu está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navItems = [
    { href: "/images", label: t.header.image },
    { href: "/text",   label: t.header.text  },
    { href: "/iframe", label: t.header.iframe },
  ];

  return (
    <>
      <header className={`${styles.header} Header`}>
        <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
          <Logo variant={3} name={false} />
        </Link>

        {/* Nav desktop */}
        <nav className={`${styles.nav} ${styles.navDesktop}`}>
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

        {/* Controls desktop */}
        <div className={`${styles.controls} ${styles.controlsDesktop}`}>
          <RippleButton type="button" className={styles.controlBtn} onClick={toggleLang} aria-label="Toggle language">
            {lang === "es" ? <><FlagUS />&nbsp;English</> : <><FlagAR />&nbsp;Español</>}
          </RippleButton>
          <AnimatedThemeToggler className={styles.controlBtn} />
        </div>

        {/* Hamburger mobile */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
          onClick={() => menuOpen ? closeMenu() : setMenuOpen(true)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
        </button>
      </header>

      {/* Mobile menu */}
      {(menuOpen || isClosing) && (
        <div className={`${styles.mobileMenu} ${isClosing ? styles.closing : ""} MobileMenu`}>
          <nav className={styles.mobileNav}>
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`${styles.mobileLink} ${pathname.startsWith(href) ? styles.mobileLinkActive : ""}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className={styles.mobileDivider} />

          <div className={styles.mobileControls}>
            <RippleButton type="button" className={styles.mobileControlBtn} onClick={toggleLang} aria-label="Toggle language">
              {lang === "es" ? <><FlagUS />&nbsp;English</> : <><FlagAR />&nbsp;Español</>}
            </RippleButton>
            <AnimatedThemeToggler className={styles.mobileControlBtn} />
          </div>
        </div>
      )}
    </>
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
