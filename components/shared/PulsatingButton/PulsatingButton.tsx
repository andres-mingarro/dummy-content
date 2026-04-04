"use client";

import React, { useImperativeHandle, useLayoutEffect, useRef } from "react";

interface PulsatingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string;
  duration?: string;
  distance?: string;
}

export const PulsatingButton = React.forwardRef<HTMLButtonElement, PulsatingButtonProps>(
  (
    {
      className,
      style,
      children,
      pulseColor,
      duration = "1.5s",
      distance = "8px",
      ...props
    },
    ref
  ) => {
    const innerRef = useRef<HTMLButtonElement>(null);
    useImperativeHandle(ref, () => innerRef.current!);

    useLayoutEffect(() => {
      const button = innerRef.current;
      if (!button) return;

      if (pulseColor) {
        button.style.removeProperty("--bg");
        return;
      }

      let rafId = 0;
      let currentBg = "";

      const updateBg = () => {
        rafId = 0;
        const nextBg = getComputedStyle(button).backgroundColor;
        if (nextBg === currentBg) return;
        currentBg = nextBg;
        button.style.setProperty("--bg", nextBg);
      };

      const schedule = () => {
        if (rafId) return;
        rafId = window.requestAnimationFrame(updateBg);
      };

      updateBg();

      const themeObs = new MutationObserver(schedule);
      themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

      const btnObs = new MutationObserver(schedule);
      btnObs.observe(button, { attributes: true });

      const events = ["blur", "focus", "pointerenter", "pointerleave"] as const;
      for (const ev of events) button.addEventListener(ev, schedule);

      return () => {
        if (rafId) window.cancelAnimationFrame(rafId);
        themeObs.disconnect();
        btnObs.disconnect();
        for (const ev of events) button.removeEventListener(ev, schedule);
      };
    }, [pulseColor]);

    return (
      <button
        ref={innerRef}
        className={className}
        style={{
          position: "relative",
          ...(pulseColor && { "--pulse-color": pulseColor } as React.CSSProperties),
          "--duration": duration,
          "--distance": distance,
          ...style,
        } as React.CSSProperties}
        {...props}
      >
        <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
        <span
          aria-hidden="true"
          className="animate-pulse-ripple"
          style={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            background: "inherit",
          }}
        />
      </button>
    );
  }
);

PulsatingButton.displayName = "PulsatingButton";
