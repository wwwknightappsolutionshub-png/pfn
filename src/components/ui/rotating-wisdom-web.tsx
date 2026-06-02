"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const WEB_LINES = 16;
const center = 100;
const radius = 92;

function webRadii(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    return {
      x2: center + Math.cos(angle) * radius,
      y2: center + Math.sin(angle) * radius,
    };
  });
}

const radii = webRadii(WEB_LINES);
const ringRadii = [28, 48, 68, 88];

type Props = {
  className?: string;
  /** 0–1 opacity multiplier for the outer web */
  intensity?: "subtle" | "default";
};

export function RotatingWisdomWeb({
  className,
  intensity = "default",
}: Props) {
  const outerOpacity = intensity === "subtle" ? "opacity-[0.22]" : "opacity-[0.35]";

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
      >
        <svg
          viewBox="0 0 200 200"
          className={cn(
            "h-[min(140%,800px)] w-[min(140%,800px)] max-h-none max-w-none",
            outerOpacity,
          )}
        >
          {radii.map((r, i) => (
            <line
              key={`outer-${i}`}
              x1={center}
              y1={center}
              x2={r.x2}
              y2={r.y2}
              stroke="rgba(201, 162, 39, 0.55)"
              strokeWidth="0.35"
            />
          ))}
          {ringRadii.map((r) => (
            <circle
              key={`outer-ring-${r}`}
              cx={center}
              cy={center}
              r={r}
              fill="none"
              stroke="rgba(248, 245, 240, 0.12)"
              strokeWidth="0.4"
            />
          ))}
          {radii.map((r, i) => (
            <circle
              key={`outer-node-${i}`}
              cx={r.x2}
              cy={r.y2}
              r="1.2"
              fill="rgba(201, 162, 39, 0.7)"
            />
          ))}
        </svg>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: -360 }}
        transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
      >
        <svg
          viewBox="0 0 200 200"
          className="h-[min(95%,520px)] w-[min(95%,520px)] opacity-25"
        >
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const r = 55;
            return (
              <line
                key={`inner-${i}`}
                x1={center + Math.cos(angle) * 20}
                y1={center + Math.sin(angle) * 20}
                x2={center + Math.cos(angle) * r}
                y2={center + Math.sin(angle) * r}
                stroke="rgba(248, 245, 240, 0.35)"
                strokeWidth="0.3"
              />
            );
          })}
          <circle
            cx={center}
            cy={center}
            r="20"
            fill="none"
            stroke="rgba(201, 162, 39, 0.4)"
            strokeWidth="0.5"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-pln-gold/20"
        animate={{ scale: [1, 1.04, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
