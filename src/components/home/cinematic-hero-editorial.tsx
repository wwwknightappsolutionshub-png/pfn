"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeroSlideImages } from "@/lib/hero-images";
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
}: HeroRightPanelProps) {
  return (
    <motion.div
      className="group relative flex min-h-[280px] w-full cursor-default flex-col overflow-hidden border border-pln-gold/25 sm:min-h-[360px] lg:min-h-full"
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={panelVariants}
      transition={panelHoverTransition}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
        sizes="(max-width: 1024px) 100vw, 42vw"
        priority={slideIndex === 0}
      />

      <div className="absolute inset-0 bg-gradient-to-l from-pln-navy/80 via-pln-navy/35 to-pln-navy/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-pln-navy via-pln-navy/50 to-transparent" />

      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(201,162,39,0.18),transparent_55%)]"
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        transition={panelHoverTransition}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-pln-ivory/12 to-transparent"
          variants={{ rest: { x: "-100%" }, hover: { x: "220%" } }}
          transition={{ duration: 1, ease: columnEase }}
        />
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-transparent via-pln-gold to-transparent"
        variants={{ rest: { scaleX: 0, opacity: 0 }, hover: { scaleX: 1, opacity: 1 } }}
        transition={panelHoverTransition}
      />

      <motion.div
        className="absolute -right-px -top-px border-r-2 border-t-2 border-pln-gold"
        variants={{
          rest: { width: 80, height: 80, opacity: 0.7 },
          hover: { width: 96, height: 96, opacity: 1 },
        }}
        transition={panelHoverTransition}
      />

      <div className="relative z-10 mt-auto flex flex-col bg-pln-navy/75 p-5 backdrop-blur-md sm:p-6 lg:p-10">
        <motion.p
          className="font-sans text-xs uppercase tracking-[0.3em] text-pln-gold"
          variants={{ rest: { letterSpacing: "0.3em" }, hover: { letterSpacing: "0.38em" } }}
          transition={panelHoverTransition}
        >
          {String(slideIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </motion.p>
        <motion.p
          className="mt-4 font-display text-2xl leading-snug lg:text-3xl"
          variants={{ rest: { color: "rgba(248, 245, 240, 1)" }, hover: { color: "rgba(201, 162, 39, 1)" } }}
          transition={panelHoverTransition}
        >
          {panelTitle}
        </motion.p>
        <p className="mt-3 font-body text-sm leading-relaxed text-pln-ivory/75 transition-colors duration-500 group-hover:text-pln-ivory/90 lg:text-base">
          {panelBody}
        </p>
        <div className="mt-6 space-y-6 transition-transform duration-500 group-hover:translate-y-[-2px]">
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
  headline: string;
  subheadline: string;
  channelUrl?: string | null;
  heroImages: HeroSlideImages;
};

const pillars = [
  "Relationships",
  "Business",
  "Finance",
  "Career",
  "Health",
  "Spiritual Growth",
];

type Slide = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  panelTitle: string;
  panelBody: string;
  panelExtra?: ReactNode;
};

export function CinematicHeroEditorial({
  headline,
  subheadline,
  channelUrl,
  heroImages,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const slides: Slide[] = [
    {
      id: "mission",
      kicker: "Profitable Living Network",
      title: headline,
      description: subheadline,
      imageSrc: heroImages.mission.src,
      imageAlt: heroImages.mission.alt,
      panelTitle: "Godly wisdom. Profitable life.",
      panelBody:
        "A Christian mission teaching how to live with excellence in every sphere — rooted in Scripture and proven in experience.",
      panelExtra: (
        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-pln-ivory/10 pt-6 sm:mt-8 sm:grid-cols-3 sm:gap-4 sm:pt-8">
          {[
            { label: "Weekly", value: "Wisdom Snippets" },
            { label: "Monthly", value: "School of Wisdom" },
            { label: "Mission", value: "1 Tim. 4:7–8" },
          ].map((item) => (
            <div key={item.value}>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-pln-gold">
                {item.label}
              </p>
              <p className="mt-2 font-display text-sm lg:text-base">{item.value}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "pillars",
      kicker: "Wisdom for everyday living",
      title: "Six pillars. One integrated life in Christ.",
      description:
        "Practical teaching across relationships, business, finance, career, health, and spiritual growth — connected, intentional, and transformative.",
      imageSrc: heroImages.pillars.src,
      imageAlt: heroImages.pillars.alt,
      panelTitle: "The constellation of wisdom",
      panelBody:
        "Each area of life informs the others. PLN helps you apply godly principles with clarity and confidence.",
      panelExtra: (
        <ul className="mt-8 flex flex-wrap gap-2">
          {pillars.map((pillar) => (
            <li
              key={pillar}
              className="border border-pln-ivory/15 px-3 py-1.5 font-sans text-[11px] uppercase tracking-[0.12em] text-pln-ivory/80"
            >
              {pillar}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "gather",
      kicker: "Join the journey",
      title: "Learn. Apply. Grow. Influence. Impact.",
      description:
        "Every Monday — Wisdom Snippets. Third Friday monthly — School of Wisdom. Step into a community pursuing godliness with purpose.",
      imageSrc: heroImages.gather.src,
      imageAlt: heroImages.gather.alt,
      panelTitle: "Led by Peter Olusanjo",
      panelBody:
        "Speaker, teacher, and scholar — equipping believers to flourish with academic rigour and pastoral depth.",
      panelExtra: (
        <blockquote className="mt-8 border-l-2 border-pln-gold pl-5">
          <p className="font-body text-sm italic leading-relaxed text-pln-ivory/70">
            &ldquo;Train yourself to be godly. For physical training is of some
            value, but godliness has value for all things.&rdquo;
          </p>
          <cite className="mt-3 block font-sans text-xs uppercase tracking-[0.2em] text-pln-gold not-italic">
            1 Timothy 4:7–8
          </cite>
        </blockquote>
      ),
    },
  ];

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
      className="relative min-h-[100svh] overflow-hidden bg-pln-navy text-pln-ivory"
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

      <div className="relative z-10 min-h-[100svh] overflow-hidden">
        <motion.div
          className="flex h-full min-h-[100svh] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
          animate={{ x: `-${active * 100}%` }}
          transition={slideTransition}
        >
          {slides.map((slide, slideIndex) => {
            const isActive = active === slideIndex;

            return (
              <div
                key={slide.id}
                className="flex min-h-[100svh] w-full flex-shrink-0 items-center px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-32"
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
                    className="flex lg:col-span-6 lg:min-h-[min(72vh,680px)]"
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
