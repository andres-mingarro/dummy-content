"use client";

import React, { MouseEvent, useEffect, useState } from "react";

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
        className={className}
        style={{ position: "relative", overflow: "hidden", ...style }}
        onClick={handleClick}
        {...props}
      >
        <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
        {ripples.map((r) => (
          <span
            key={r.key}
            className="animate-rippling"
            style={{
              position: "absolute",
              borderRadius: "50%",
              pointerEvents: "none",
              width: r.size,
              height: r.size,
              top: r.y,
              left: r.x,
              backgroundColor: rippleColor,
              opacity: 0.25,
              transform: "scale(0)",
              ["--duration" as string]: `${duration}ms`,
            }}
          />
        ))}
      </button>
    );
  }
);

RippleButton.displayName = "RippleButton";
