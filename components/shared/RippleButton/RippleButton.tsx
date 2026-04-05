"use client";

import React, { MouseEvent, useEffect, useState } from "react";
import styles from "./RippleButton.module.scss";

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rippleColor?: string;
  duration?: number;
}

export const RippleButton = React.forwardRef<HTMLButtonElement, RippleButtonProps>(
  (
    {
      className,
      style,
      children,
      rippleColor = "var(--accent)",
      duration = 600,
      onClick,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<
      Array<{ x: number; y: number; size: number; key: number }>
    >([]);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      setRipples((prev) => [...prev, { x, y, size, key: Date.now() }]);
      onClick?.(e);
    };

    useEffect(() => {
      if (ripples.length === 0) return;
      const last = ripples[ripples.length - 1];
      const t = setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.key !== last.key));
      }, duration);
      return () => clearTimeout(t);
    }, [ripples, duration]);

    return (
      <button
        ref={ref}
        className={`RippleButton ${styles.button} ${className ?? ""}`}
        style={style}
        onClick={handleClick}
        {...props}
      >
        <span className={styles.inner}>{children}</span>
        {ripples.map((r) => (
          <span
            key={r.key}
            className={`animate-rippling ${styles.ripple}`}
            style={{
              width: r.size,
              height: r.size,
              top: r.y,
              left: r.x,
              backgroundColor: rippleColor,
              ["--duration" as string]: `${duration}ms`,
            }}
          />
        ))}
      </button>
    );
  }
);

RippleButton.displayName = "RippleButton";
