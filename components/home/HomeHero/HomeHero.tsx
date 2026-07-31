"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import BrandWordmark from "@/components/shared/BrandWordmark/BrandWordmark";
import type { Lang } from "@/lib/i18n/translations";
import styles from "./HomeHero.module.scss";

export default function HomeHero({ lang, title, lead }: { lang: Lang; title: string; lead: string }) {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 180]);
  const heroOpacity = useTransform(scrollYProgress, [0, .82], [1, reduceMotion ? 1 : 0]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -240]);
  const orbRotate = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 70]);

  return (
    <section ref={heroRef} className={styles["home-hero"]}>
      <div className={styles["home-hero__grid"]} aria-hidden="true" />
      <motion.div className={`${styles["home-hero__orb"]} ${styles["home-hero__orb--primary"]}`} style={{ y: orbY, rotate: orbRotate }} aria-hidden="true" />
      <motion.div className={`${styles["home-hero__orb"]} ${styles["home-hero__orb--secondary"]}`} style={{ y: heroY, rotate: orbRotate }} aria-hidden="true" />
      <motion.div className={styles["home-hero__content"]} style={{ y: heroY, opacity: heroOpacity }}>
        <p className={styles["home-hero__eyebrow"]}><span aria-hidden="true" />{lang === "es" ? "Tu kit de prototipado" : "Your prototyping toolkit"}</p>
        <BrandWordmark size="hero" className={styles["home-hero__brand"]} />
        <h1 className={styles["home-hero__title"]}>{title}</h1>
        <p className={styles["home-hero__lead"]}>{lead}</p>
        <a href="#tools" className={styles["home-hero__scroll-link"]}>
          <span>{lang === "es" ? "Explorar herramientas" : "Explore the tools"}</span><i aria-hidden="true">↓</i>
        </a>
      </motion.div>
    </section>
  );
}
