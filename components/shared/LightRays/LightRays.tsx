"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { motion } from "motion/react";

interface LightRaysProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  count?: number;
  color?: string;
  blur?: number;
  speed?: number;
  length?: string;
}

type LightRay = {
  id: string;
  left: number;
  rotate: number;
  width: number;
  swing: number;
  delay: number;
  duration: number;
  intensity: number;
};

const createRays = (count: number, cycle: number): LightRay[] => {
  if (count <= 0) return [];
  return Array.from({ length: count }, (_, index) => {
    const left = 8 + Math.random() * 84;
    const rotate = -28 + Math.random() * 56;
    const width = 160 + Math.random() * 160;
    const swing = 0.8 + Math.random() * 1.8;
    const delay = Math.random() * cycle;
    const duration = cycle * (0.75 + Math.random() * 0.5);
    const intensity = 0.6 + Math.random() * 0.5;
    return { id: `${index}-${Math.round(left * 10)}`, left, rotate, width, swing, delay, duration, intensity };
  });
};

function Ray({ left, rotate, width, swing, delay, duration, intensity }: LightRay) {
  return (
    <motion.div
      className="LightRay"
      style={
        {
          pointerEvents: "none",
          position: "absolute",
          top: "-12%",
          left: `${left}%`,
          height: "var(--light-rays-length)",
          width: `${width}px`,
          transformOrigin: "top",
          translate: "-50% 0",
          borderRadius: "9999px",
          background: "linear-gradient(to bottom, color-mix(in srgb, var(--light-rays-color) 70%, transparent), transparent)",
          mixBlendMode: "screen",
          filter: "blur(var(--light-rays-blur))",
          opacity: 0,
        } as CSSProperties
      }
      initial={{ rotate }}
      animate={{
        opacity: [0, intensity, 0],
        rotate: [rotate - swing, rotate + swing, rotate - swing],
      }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay, repeatDelay: duration * 0.1 }}
    />
  );
}

export function LightRays({
  className,
  style,
  count = 7,
  color = "rgba(160, 210, 255, 0.2)",
  blur = 36,
  speed = 14,
  length = "70vh",
  ref,
  ...props
}: LightRaysProps) {
  const [rays, setRays] = useState<LightRay[]>([]);
  const cycleDuration = Math.max(speed, 0.1);

  useEffect(() => {
    setRays(createRays(count, cycleDuration));
  }, [count, cycleDuration]);

  return (
    <div
      ref={ref}
      className={`LightRays${className ? ` ${className}` : ""}`}
      style={
        {
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          isolation: "isolate",
          overflow: "hidden",
          "--light-rays-color": color,
          "--light-rays-blur": `${blur}px`,
          "--light-rays-length": length,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.6,
            background: "radial-gradient(circle at 20% 15%, color-mix(in srgb, var(--light-rays-color) 45%, transparent), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.6,
            background: "radial-gradient(circle at 80% 10%, color-mix(in srgb, var(--light-rays-color) 35%, transparent), transparent 75%)",
          }}
        />
        {rays.map((ray) => (
          <Ray key={ray.id} {...ray} />
        ))}
      </div>
    </div>
  );
}
