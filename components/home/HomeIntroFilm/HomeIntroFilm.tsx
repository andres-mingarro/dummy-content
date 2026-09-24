"use client";

import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { bebasNeue } from "@/components/shared/Logo/Logo";
import type { Lang } from "@/lib/i18n/translations";
import styles from "./HomeIntroFilm.module.scss";

// The intro film is a canvas program (built from the procedural-film project with tools/web-bundle.cjs):
// every frame is computed from its time T alone, so scroll progress maps straight to a frame, forwards and back.
const FILM_SRC = "/film/intro.js";
const FILM_W = 1920;
// Frame shown when motion is reduced: the finished page, the film's clearest single image.
const STILL_T = 13.9;

interface FilmApi {
  DURATION: number;
  FPS: number;
  mount(canvas: HTMLCanvasElement, opts?: { scale?: number }): void;
  renderFrame(T: number): unknown;
}

declare global {
  interface Window {
    FILM?: Partial<FilmApi> & { LANG?: Lang; FONTS?: { caps: string; capsWeight: number; capsSqueeze: number } };
  }
}

const COPY = {
  en: "Intro film: an empty placeholder becomes an image, text, an embed and finally a whole page. Scroll to play it.",
  es: "Film de introducción: un placeholder vacío se convierte en imagen, texto, un embed y finalmente una página completa. Hacé scroll para reproducirlo.",
} as const;

let filmPromise: Promise<FilmApi> | null = null;

/** Loads the film script once per page. The language and the site's Bebas Neue are injected before it runs. */
function loadFilm(lang: Lang): Promise<FilmApi> {
  if (filmPromise) return filmPromise;
  const family = bebasNeue.style.fontFamily;
  filmPromise = document.fonts
    .load(`400 100px ${family}`)
    .catch(() => [])
    .then(
      () =>
        new Promise<FilmApi>((resolve, reject) => {
          window.FILM = { LANG: lang, FONTS: { caps: family, capsWeight: 400, capsSqueeze: 1 } };
          const script = document.createElement("script");
          script.src = FILM_SRC;
          script.async = true;
          script.onload = () => resolve(window.FILM as FilmApi);
          script.onerror = () => {
            filmPromise = null;
            reject(new Error("intro film failed to load"));
          };
          document.head.appendChild(script);
        }),
    );
  return filmPromise;
}

export default function HomeIntroFilm({ lang }: { lang: Lang }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const filmRef = useRef<FilmApi | null>(null);
  const frameRef = useRef(-1);
  const rafRef = useRef(0);
  const [ready, setReady] = useState(false);
  const reduceMotion = useReducedMotion();
  // Applied after mount: the server HTML has no media query, and hydration keeps server attributes as they are.
  const [still, setStill] = useState(false);
  useEffect(() => setStill(!!reduceMotion), [reduceMotion]);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const timeAt = useCallback(
    (progress: number) => {
      const film = filmRef.current;
      if (!film) return 0;
      if (reduceMotion) return STILL_T;
      const last = film.DURATION - 1 / film.FPS;
      return Math.min(last, Math.max(0, progress * last));
    },
    [reduceMotion],
  );

  // Draws at most once per animation frame, and only when the film frame actually changes.
  const draw = useCallback(
    (force = false) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const film = filmRef.current;
        if (!film) return;
        const T = timeAt(scrollYProgress.get());
        const frame = Math.round(T * film.FPS);
        if (!force && frame === frameRef.current) return;
        frameRef.current = frame;
        film.renderFrame(frame / film.FPS);
      });
    },
    [scrollYProgress, timeAt],
  );

  // Load the script only when the section is about to be reached: nothing is downloaded before.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let cancelled = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        loadFilm(lang)
          .then((film) => {
            if (cancelled) return;
            filmRef.current = film;
            setReady(true);
          })
          .catch(() => {});
      },
      { rootMargin: "150% 0px" },
    );
    observer.observe(section);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [lang]);

  // Mount at the displayed size (device pixels, capped at the film's 1920 px) and remount on resize.
  useEffect(() => {
    const canvas = canvasRef.current;
    const film = filmRef.current;
    if (!ready || !canvas || !film) return;
    const mount = () => {
      const scale = Math.min(1, (canvas.clientWidth * window.devicePixelRatio) / FILM_W);
      film.mount(canvas, { scale: Math.max(0.2, scale) });
      draw(true);
    };
    mount();
    const observer = new ResizeObserver(mount);
    observer.observe(canvas);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [ready, draw]);

  useMotionValueEvent(scrollYProgress, "change", () => draw());

  const sectionClass = `${styles["home-intro-film"]} ${still ? styles["home-intro-film--still"] : ""}`;
  return (
    <section ref={sectionRef} className={sectionClass} aria-label={COPY[lang]}>
      <div className={styles["home-intro-film__sticky"]}>
        <div className={`${styles["home-intro-film__frame"]} ${ready ? styles["home-intro-film__frame--ready"] : ""}`}>
          <canvas ref={canvasRef} className={styles["home-intro-film__canvas"]} role="img" aria-label={COPY[lang]} />
        </div>
      </div>
    </section>
  );
}
