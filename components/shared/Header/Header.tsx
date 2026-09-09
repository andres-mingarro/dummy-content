"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useLang } from "@/providers/LangProvider";
import Logo from "@/components/shared/Logo/Logo";
import { RippleButton } from "@/components/shared/RippleButton/RippleButton";
import { AnimatedThemeToggler } from "@/components/shared/AnimatedThemeToggler/AnimatedThemeToggler";
import styles from "./Header.module.scss";

type ToolVariant = "image" | "text" | "iframe";

export default function Header() {
  const pathname = usePathname();
  const { lang, t, toggleLang, href } = useLang();
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

  const navItems: { href: string; label: string; variant: ToolVariant }[] = [
    { href: href("/images"), label: t.header.image,  variant: "image"  },
    { href: href("/text"),   label: t.header.text,    variant: "text"   },
    { href: href("/iframe"), label: t.header.iframe,  variant: "iframe" },
  ];

  return (
    <>
      <header className={`${styles["header"]} Header`}>
        <Link href={href("/")} className={styles["header__logo"]} onClick={() => setMenuOpen(false)}>
          <Logo variant={3} name={false} />
        </Link>

        {/* Nav desktop */}
        <nav className={`${styles["header__nav"]} ${styles["header__nav--desktop"]}`}>
          {navItems.map(({ href, label, variant }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={[
                  styles["header__link"],
                  styles[`header__link--${variant}`],
                  isActive ? styles["header__link--active"] : "",
                ].join(" ").trim()}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Controls desktop */}
        <div className={`${styles["header__controls"]} ${styles["header__controls--desktop"]}`}>
          <a href="https://ko-fi.com/J3J11XDZ6I" target="_blank" rel="noopener noreferrer" className={styles["header__coffee-btn"]}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img height="30" style={{ border: 0, height: 30 }} src="https://storage.ko-fi.com/cdn/kofi1.png?v=6" alt="Buy Me a Coffee at ko-fi.com" className={styles["header__coffee-icon--light"]} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img height="30" style={{ border: 0, height: 30 }} src="https://storage.ko-fi.com/cdn/kofi3.png?v=6" alt="Buy Me a Coffee at ko-fi.com" className={styles["header__coffee-icon--dark"]} />
          </a>
          <RippleButton type="button" className={styles["header__control-btn"]} onClick={toggleLang} aria-label="Toggle language">
            {lang === "es" ? <><FlagUS />&nbsp;English</> : <><FlagAR />&nbsp;Español</>}
          </RippleButton>
          <AnimatedThemeToggler className={styles["header__control-btn"]} />
        </div>

        {/* Hamburger mobile */}
        <button
          className={`${styles["header__hamburger"]} ${menuOpen ? styles["header__hamburger--open"] : ""}`}
          onClick={() => menuOpen ? closeMenu() : setMenuOpen(true)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <span className={styles["header__hamburger-bar"]} />
          <span className={styles["header__hamburger-bar"]} />
          <span className={styles["header__hamburger-bar"]} />
        </button>
      </header>

      {/* Mobile menu */}
      {(menuOpen || isClosing) && (
        <div className={`${styles["mobile-menu"]} ${isClosing ? styles["mobile-menu--closing"] : ""} MobileMenu`}>
          <nav className={styles["mobile-menu__nav"]}>
            {navItems.map(({ href, label, variant }) => {
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={[
                    styles["mobile-menu__link"],
                    styles[`mobile-menu__link--${variant}`],
                    isActive ? styles["mobile-menu__link--active"] : "",
                  ].join(" ").trim()}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className={styles["mobile-menu__divider"]} />

          <a href="https://ko-fi.com/J3J11XDZ6I" target="_blank" rel="noopener noreferrer" className={styles["mobile-menu__coffee-btn"]}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img height="30" style={{ border: 0, height: 30 }} src="https://storage.ko-fi.com/cdn/kofi1.png?v=6" alt="Buy Me a Coffee at ko-fi.com" className={styles["mobile-menu__coffee-icon--light"]} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img height="30" style={{ border: 0, height: 30 }} src="https://storage.ko-fi.com/cdn/kofi3.png?v=6" alt="Buy Me a Coffee at ko-fi.com" className={styles["mobile-menu__coffee-icon--dark"]} />
          </a>

          <div className={styles["mobile-menu__divider"]} />

          <div className={styles["mobile-menu__controls"]}>
            <RippleButton type="button" className={styles["mobile-menu__control-btn"]} onClick={toggleLang} aria-label="Toggle language">
              {lang === "es" ? <><FlagUS />&nbsp;English</> : <><FlagAR />&nbsp;Español</>}
            </RippleButton>
            <AnimatedThemeToggler className={styles["mobile-menu__control-btn"]} />
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
