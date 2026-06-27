"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CinematicHeroSlide } from "@/lib/homepage-hero";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/** Time each slide stays visible before auto-advance */
const SLIDE_DURATION_MS = 14000;

const columnEase = [0.25, 0.8, 0.2, 1] as const;

const columnEnter = {
  left: {
    hidden: { opacity: 0, x: -72 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.15, ease: columnEase },
    },
  },
  right: {
    hidden: { opacity: 0, x: 72 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.15, delay: 0.55, ease: columnEase },
    },
  },
};

const slideTransition = { duration: 1.15, ease: columnEase };

const panelHoverTransition = { duration: 0.55, ease: columnEase };

const panelVariants = {
  rest: {
    y: 0,
    scale: 1,
    borderColor: "rgba(201, 162, 39, 0.25)",
    boxShadow: "0 0 0 rgba(201, 162, 39, 0)",
  },
  hover: {
    y: -6,
    scale: 1.015,
    borderColor: "rgba(201, 162, 39, 0.55)",
    boxShadow:
      "0 24px 48px rgba(0, 0, 0, 0.35), 0 0 40px rgba(201, 162, 39, 0.15), inset 0 1px 0 rgba(248, 245, 240, 0.08)",
  },
};

type HeroRightPanelProps = {
  slideIndex: number;
  total: number;
  imageSrc: string;
  imageAlt: string;
  panelTitle: string;
  panelBody: string;
  panelExtra?: ReactNode;
  showAboutLink?: boolean;
  /** Where to anchor crop on desktop; mobile shows the full image */
  imageFocus?: "center" | "top";
};

function HeroRightPanel({
  slideIndex,
  total,
  imageSrc,
  imageAlt,
  panelTitle,
  panelBody,
  panelExtra,
  showAboutLink,
  imageFocus = "center",
}: HeroRightPanelProps) {
  const desktopObjectPosition =
    imageFocus === "top" ? "object-[center_15%]" : "object-center";

  return (
    <motion.div
      className="group relative flex w-full cursor-default flex-col overflow-hidden rounded-xl border border-pln-gold/25 lg:min-h-full lg:rounded-none"
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={panelVariants}
      transition={panelHoverTransition}
    >
      {/* Image — full photo on mobile/tablet; cinematic crop on desktop */}
      <div className="relative h-[min(58vh,520px)] min-h-[300px] w-full shrink-0 overflow-hidden bg-pln-navy sm:h-[min(62vh,580px)] sm:min-h-[340px] md:max-lg:h-[min(64vh,620px)] lg:absolute lg:inset-0 lg:h-auto lg:min-h-full">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className={cn(
            "object-contain object-center max-lg:object-contain",
            imageFocus === "top" && "max-lg:object-top",
            "lg:object-cover",
            desktopObjectPosition,
            "transition duration-700 lg:group-hover:scale-[1.03]",
          )}
          sizes="(max-width: 1024px) 100vw, 42vw"
          priority={slideIndex === 0}
        />

        {/* Desktop-only overlays — caption sits below image on smaller screens */}
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-l from-pln-navy/80 via-pln-navy/35 to-pln-navy/15 lg:block" />
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-pln-navy via-pln-navy/50 to-transparent lg:block" />

        <motion.div
          className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(ellipse_at_80%_0%,rgba(201,162,39,0.18),transparent_55%)] lg:block"
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={panelHoverTransition}
        />

        <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
          <motion.div
            className="absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-pln-ivory/12 to-transparent"
            variants={{ rest: { x: "-100%" }, hover: { x: "220%" } }}
            transition={{ duration: 1, ease: columnEase }}
          />
        </div>

        <motion.div
          className="pointer-events-none absolute bottom-0 left-0 hidden h-px w-full origin-left bg-gradient-to-r from-transparent via-pln-gold to-transparent lg:block"
          variants={{ rest: { scaleX: 0, opacity: 0 }, hover: { scaleX: 1, opacity: 1 } }}
          transition={panelHoverTransition}
        />

        <motion.div
          className="absolute -right-px -top-px hidden border-r-2 border-t-2 border-pln-gold lg:block"
          variants={{
            rest: { width: 80, height: 80, opacity: 0.7 },
            hover: { width: 96, height: 96, opacity: 1 },
          }}
          transition={panelHoverTransition}
        />
      </div>

      {/* Caption — below image on mobile/tablet; overlay on desktop */}
      <div className="relative z-10 flex flex-col bg-pln-navy p-5 sm:p-6 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-auto lg:bg-pln-navy/75 lg:p-10 lg:backdrop-blur-md">
        <motion.p
          className="font-sans text-xs uppercase tracking-[0.3em] text-pln-gold"
          variants={{ rest: { letterSpacing: "0.3em" }, hover: { letterSpacing: "0.38em" } }}
          transition={panelHoverTransition}
        >
          {String(slideIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </motion.p>
        <motion.p
          className="mt-3 font-display text-xl leading-snug sm:mt-4 sm:text-2xl lg:text-3xl"
          variants={{ rest: { color: "rgba(248, 245, 240, 1)" }, hover: { color: "rgba(201, 162, 39, 1)" } }}
          transition={panelHoverTransition}
        >
          {panelTitle}
        </motion.p>
        <p className="mt-2 font-body text-sm leading-relaxed text-pln-ivory/75 transition-colors duration-500 group-hover:text-pln-ivory/90 sm:mt-3 lg:text-base">
          {panelBody}
        </p>
        <div className="mt-4 space-y-4 transition-transform duration-500 group-hover:translate-y-[-2px] sm:mt-6 sm:space-y-6">
          {panelExtra}
          {showAboutLink && (
            <Link
              href="/about"
              className="inline-block font-sans text-xs uppercase tracking-[0.2em] text-pln-gold transition-all duration-500 group-hover:tracking-[0.28em]"
            >
              Academic profile →
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

type Props = {
  slides: CinematicHeroSlide[];
  channelUrl?: string | null;
};

type Slide = CinematicHeroSlide & {
  panelExtra?: ReactNode;
};

function buildPanelExtra(slide: CinematicHeroSlide): ReactNode | undefined {
  if (slide.id === "mission" && slide.highlights?.length) {
    return (
      <div className="grid grid-cols-1 gap-3 border-t border-pln-ivory/10 pt-4 sm:grid-cols-3 sm:gap-4 sm:pt-6 lg:mt-2 lg:pt-8">
        {slide.highlights.map((item) => (
          <div key={`${item.label}-${item.value}`}>
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-pln-gold">
              {item.label}
            </p>
            <p className="mt-2 font-display text-sm lg:text-base">{item.value}</p>
          </div>
        ))}
      </div>
    );
  }

  if (slide.id === "pillars" && slide.pillarLabels?.length) {
    return (
      <ul className="mt-4 flex flex-wrap gap-2 sm:mt-6 lg:mt-8">
        {slide.pillarLabels.map((pillar) => (
          <li
            key={pillar}
            className="border border-pln-ivory/15 px-3 py-1.5 font-sans text-[11px] uppercase tracking-[0.12em] text-pln-ivory/80"
          >
            {pillar}
          </li>
        ))}
      </ul>
    );
  }

  if (slide.id === "gather" && slide.quote) {
    return (
      <blockquote className="mt-4 border-l-2 border-pln-gold pl-5 sm:mt-6 lg:mt-8">
        <p className="font-body text-sm italic leading-relaxed text-pln-ivory/70">
          &ldquo;{slide.quote}&rdquo;
        </p>
        {slide.quoteCitation && (
          <cite className="mt-3 block font-sans text-xs uppercase tracking-[0.2em] text-pln-gold not-italic">
            {slide.quoteCitation}
          </cite>
        )}
      </blockquote>
    );
  }

  return undefined;
}

export function CinematicHeroEditorial({
  slides: heroSlides,
  channelUrl,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const slides: Slide[] = heroSlides.map((slide) => ({
    ...slide,
    panelExtra: buildPanelExtra(slide),
  }));

  const total = slides.length;

  const goTo = useCallback(
    (index: number) => {
      setActive((index + total) % total);
    },
    [total],
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, [paused, next, active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        gsap.to(".hero-ed-parallax", {
          y: 80,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-0 overflow-x-hidden bg-pln-navy text-pln-ivory lg:min-h-[100svh]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured messages"
    >
      <div className="hero-ed-parallax pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(201,162,39,0.08)_0%,transparent_45%,rgba(11,20,38,0.9)_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(rgba(248,245,240,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(248,245,240,0.5) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute -right-16 top-1/4 h-[280px] w-[280px] rounded-full border border-pln-gold/15 sm:-right-32 sm:h-[400px] sm:w-[400px] lg:h-[520px] lg:w-[520px]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-pln-navy to-transparent" />
      </div>

      <div className="relative z-10 min-h-0 lg:min-h-[100svh] lg:overflow-hidden">
        <motion.div
          className="flex h-full min-h-0 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] lg:min-h-[100svh]"
          animate={{ x: `-${active * 100}%` }}
          transition={slideTransition}
        >
          {slides.map((slide, slideIndex) => {
            const isActive = active === slideIndex;

            return (
              <div
                key={slide.id}
                className="flex w-full flex-shrink-0 items-start px-4 pb-28 pt-20 sm:px-6 sm:pb-32 sm:pt-24 lg:min-h-[100svh] lg:items-center lg:px-10 lg:py-32"
                aria-hidden={!isActive}
              >
                <div className="mx-auto grid w-full max-w-7xl items-stretch gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-10 xl:gap-14">
                  {/* Left column — shifted toward centre */}
                  <motion.div
                    className="flex flex-col justify-center lg:col-span-6 xl:col-span-6"
                    variants={columnEnter.left}
                    initial="hidden"
                    animate={isActive ? "visible" : "hidden"}
                  >
                    <div className="w-full max-w-xl lg:mx-auto lg:max-w-[32rem] lg:translate-x-6 xl:max-w-[34rem] xl:translate-x-10">
                    <p className="mb-6 inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.35em] text-pln-gold">
                      <span className="h-px w-10 bg-pln-gold" />
                      {slide.kicker}
                    </p>

                    <h1 className="font-display text-[clamp(2rem,6vw,4.25rem)] font-semibold leading-[1.1] tracking-tight text-balance">
                      {slide.title}
                    </h1>

                    <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-pln-ivory/75 sm:mt-8 sm:text-lg lg:text-xl">
                      {slide.description}
                    </p>

                    {slide.id === "mission" && (
                      <motion.div
                        className="mt-10 flex flex-wrap gap-4"
                        initial={{ opacity: 0, y: 16 }}
                        animate={
                          isActive
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 16 }
                        }
                        transition={{ delay: 0.95, duration: 0.65 }}
                      >
                        <Button asChild variant="gold" size="lg">
                          <Link href="/resources">
                            Explore teachings
                            <ArrowRight size={18} />
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          size="lg"
                          className="border-pln-ivory/30 text-pln-ivory hover:border-pln-gold hover:text-pln-gold"
                        >
                          <Link href={channelUrl || "/resources"}>
                            <Play size={16} />
                            Watch on YouTube
                          </Link>
                        </Button>
                      </motion.div>
                    )}

                    {slide.id === "gather" && (
                      <motion.div
                        className="mt-10 flex flex-wrap gap-4"
                        initial={{ opacity: 0, y: 16 }}
                        animate={
                          isActive
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 16 }
                        }
                        transition={{ delay: 0.95, duration: 0.65 }}
                      >
                        <Button asChild variant="gold" size="lg">
                          <Link href="/events">View events</Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          size="lg"
                          className="border-pln-ivory/30 text-pln-ivory hover:border-pln-gold hover:text-pln-gold"
                        >
                          <Link href="/about">Meet Peter Olusanjo</Link>
                        </Button>
                      </motion.div>
                    )}
                    </div>
                  </motion.div>

                  {/* Right column — portrait / preview image */}
                  <motion.div
                    className="flex w-full max-lg:mx-auto max-lg:max-w-2xl lg:col-span-6 lg:min-h-[min(72vh,680px)]"
                    variants={columnEnter.right}
                    initial="hidden"
                    animate={isActive ? "visible" : "hidden"}
                  >
                    <HeroRightPanel
                      slideIndex={slideIndex}
                      total={total}
                      imageSrc={slide.imageSrc}
                      imageAlt={slide.imageAlt}
                      panelTitle={slide.panelTitle}
                      panelBody={slide.panelBody}
                      panelExtra={slide.panelExtra}
                      showAboutLink={slide.id === "gather"}
                      imageFocus={slide.id === "gather" ? "top" : "center"}
                    />
                  </motion.div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 left-0 right-0 z-20 px-4 pb-safe sm:bottom-8 sm:px-6 lg:bottom-10 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}: ${slide.kicker}`}
                aria-current={i === active ? "true" : undefined}
                className={cn(
                  "h-1 transition-all duration-500",
                  i === active
                    ? "w-12 bg-pln-gold"
                    : "w-6 bg-pln-ivory/25 hover:bg-pln-ivory/50",
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="flex h-11 w-11 items-center justify-center border border-pln-ivory/20 text-pln-ivory transition hover:border-pln-gold hover:text-pln-gold"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="flex h-11 w-11 items-center justify-center border border-pln-ivory/20 text-pln-ivory transition hover:border-pln-gold hover:text-pln-gold"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <p className="hidden font-sans text-xs uppercase tracking-[0.25em] text-pln-ivory/40 sm:block">
            {paused ? "Paused" : "Auto-advancing"} · Scroll to explore
          </p>
        </div>
      </div>
    </section>
  );
}
