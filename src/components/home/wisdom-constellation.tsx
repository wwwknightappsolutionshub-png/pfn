"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ConstellationTopic } from "@/lib/homepage-hero";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const connections: [number, number][] = [
  [0, 5],
  [5, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 0],
  [5, 3],
  [1, 3],
];

/** Place thumbnail away from constellation edges */
function thumbnailPlacement(x: number, y: number) {
  const above = y > 55;
  const left = x < 45;
  const right = x > 55;

  if (above) {
    return {
      className: "bottom-full left-1/2 mb-4 -translate-x-1/2",
    };
  }
  if (left) {
    return {
      className: "top-1/2 right-full mr-4 -translate-y-1/2",
    };
  }
  if (right) {
    return {
      className: "top-1/2 left-full ml-4 -translate-y-1/2",
    };
  }
  return {
    className: "top-full left-1/2 mt-4 -translate-x-1/2",
  };
}

type Topic = ConstellationTopic;

function ConstellationTopic({
  topic,
  isActive,
  onEnter,
  onLeave,
  onToggle,
  hoverThumbnailSrc,
  hoverThumbnailAlt,
}: {
  topic: Topic;
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onToggle: () => void;
  hoverThumbnailSrc: string;
  hoverThumbnailAlt: string;
}) {
  const placement = thumbnailPlacement(topic.x, topic.y);

  return (
    <button
      type="button"
      className={cn(
        "constellation-node group absolute -translate-x-1/2 -translate-y-1/2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pln-gold-on-light",
        isActive ? "z-30" : "z-10",
      )}
      style={{ left: `${topic.x}%`, top: `${topic.y}%` }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={onToggle}
      aria-label={`${topic.label} — Peter Olusanjo`}
    >
      <div
        className={cn(
          "relative flex flex-col items-center",
          isActive && "pln-topic-shake-active",
        )}
      >
        <span className="absolute -inset-5 rounded-full border border-pln-gold-on-light/0 transition group-hover:border-pln-gold-on-light/60 group-focus-visible:border-pln-gold-on-light/60" />
        <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-pln-gold-on-light shadow-[0_0_16px_rgba(122,95,16,0.4)] ring-2 ring-pln-section-light-bg" />
        <span
          className={cn(
            "absolute left-1/2 top-full mt-2 max-w-[7.5rem] -translate-x-1/2 rounded-md px-2 py-1 text-center font-sans text-[9px] font-semibold uppercase leading-tight tracking-[0.12em] shadow-sm transition sm:max-w-none sm:whitespace-nowrap sm:px-2.5 sm:text-[10px] sm:tracking-[0.16em] lg:text-xs",
            isActive
              ? "bg-pln-section-light-heading text-pln-section-light-bg"
              : "bg-pln-section-light-bg/95 text-pln-section-light-heading",
          )}
        >
          {topic.label}
        </span>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 4 }}
            transition={{ duration: 0.28, ease: [0.25, 0.8, 0.2, 1] }}
            className={cn("pointer-events-none absolute z-30", placement.className)}
          >
            <div className="h-20 w-20 overflow-hidden rounded-2xl border-2 border-pln-gold-on-light/40 bg-pln-section-light-bg shadow-[0_12px_32px_rgba(11,20,38,0.2)]">
              <Image
                src={hoverThumbnailSrc}
                alt={hoverThumbnailAlt}
                width={80}
                height={80}
                className="h-20 w-20 object-cover object-top"
                priority={false}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

type Props = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  topics: ConstellationTopic[];
  hoverThumbnailSrc: string;
  hoverThumbnailAlt?: string;
};

export function WisdomConstellation({
  title,
  subtitle,
  ctaLabel,
  topics,
  hoverThumbnailSrc,
  hoverThumbnailAlt = "Peter Olusanjo",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".constellation-node", {
        scale: 0,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
        },
      });
      gsap.from(".constellation-line", {
        opacity: 0,
        duration: 1.2,
        stagger: 0.05,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 65%",
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-pln-navy/10 bg-pln-section-light-bg pln-section text-pln-section-light-body"
    >
      <div className="pln-container">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4 lg:pt-20">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-pln-gold-on-light">
              Section I
            </p>
            <h2 className="mt-5 border-l-4 border-pln-gold-on-light pl-4 font-display pln-section-title text-pln-section-light-heading sm:pl-6">
              {title}
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-pln-section-light-muted">
              {subtitle}
            </p>
            <Button asChild variant="gold" size="lg" className="mt-8">
              <Link href="/resources">
                <Play size={16} fill="currentColor" />
                {ctaLabel}
              </Link>
            </Button>
          </div>

          <div className="relative aspect-square overflow-hidden rounded-sm bg-pln-navy/[0.03] p-4 ring-1 ring-pln-navy/10 sm:p-6 lg:col-span-8 lg:overflow-visible lg:p-10">
            <svg
              viewBox="0 0 100 100"
              className="h-full w-full"
              aria-hidden
            >
              {connections.map(([a, b], i) => (
                <line
                  key={i}
                  className="constellation-line"
                  stroke="rgba(122, 95, 16, 0.45)"
                  x1={topics[a].x}
                  y1={topics[a].y}
                  x2={topics[b].x}
                  y2={topics[b].y}
                  strokeWidth="0.22"
                />
              ))}
            </svg>

            {topics.map((topic) => (
              <ConstellationTopic
                key={topic.id}
                topic={topic}
                isActive={hoveredId === topic.id}
                onEnter={() => setHoveredId(topic.id)}
                onLeave={() => setHoveredId(null)}
                onToggle={() =>
                  setHoveredId((prev) =>
                    prev === topic.id ? null : topic.id,
                  )
                }
                hoverThumbnailSrc={hoverThumbnailSrc}
                hoverThumbnailAlt={hoverThumbnailAlt}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
