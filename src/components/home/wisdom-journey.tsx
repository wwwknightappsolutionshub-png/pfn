"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { JOURNEY_STEPS } from "@/components/home/journey-steps";

gsap.registerPlugin(ScrollTrigger);

type Props = { title: string };

/** Section II — pinned scroll; step progress drives the tall portrait image */
export function WisdomJourney({ title }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const active = JOURNEY_STEPS[activeStep];
  const stepCount = JOURNEY_STEPS.length;

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * (stepCount - 0.15)}`,
        pin: pin,
        pinSpacing: true,
        scrub: 0.35,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);
          const idx = Math.min(
            stepCount - 1,
            Math.max(0, Math.floor(p * stepCount + 0.02)),
          );
          setActiveStep((prev) => (prev === idx ? prev : idx));
        },
      });
    }, section);

    return () => ctx.revert();
  }, [stepCount]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-pln-navy text-pln-ivory"
      aria-label="Wisdom journey"
    >
      <div
        ref={pinRef}
        className="relative flex min-h-[100dvh] flex-col justify-center py-20 lg:py-0"
      >
        <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <div className="flex flex-col justify-center">
            <p className="font-sans text-xs uppercase tracking-[0.35em] text-pln-gold">
              Section II
            </p>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-bold lg:text-5xl">
              {title}
            </h2>

            <div className="mt-8 h-1 w-full max-w-xs overflow-hidden rounded-full bg-pln-ivory/15 lg:mt-10">
              <div
                className="h-full origin-left rounded-full bg-pln-gold transition-transform duration-150"
                style={{ transform: `scaleX(${Math.max(0.04, progress)})` }}
              />
            </div>

            <ul className="mt-10 space-y-3 lg:mt-12 lg:space-y-4">
              {JOURNEY_STEPS.map((step, i) => (
                <li
                  key={step.key}
                  className={cn(
                    "flex items-baseline gap-4 border-l-2 py-1 pl-4 transition-all duration-300",
                    activeStep === i
                      ? "border-pln-gold opacity-100"
                      : "border-transparent opacity-40",
                  )}
                >
                  <span className="font-sans text-[10px] tabular-nums tracking-widest text-pln-gold/90">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p
                      className={cn(
                        "font-display text-xl transition-colors duration-300 lg:text-2xl",
                        activeStep === i ? "text-pln-gold" : "text-pln-ivory",
                      )}
                    >
                      {step.label}
                    </p>
                    <p
                      className={cn(
                        "mt-1 max-w-md font-body text-sm text-pln-ivory/65 transition-all duration-300",
                        activeStep === i
                          ? "max-h-24 opacity-100"
                          : "max-h-0 overflow-hidden opacity-0 lg:max-h-24 lg:opacity-70",
                      )}
                    >
                      {step.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="mt-10 border-pln-ivory/30 text-pln-ivory hover:border-pln-gold hover:bg-pln-gold/10 hover:text-pln-gold lg:mt-12"
            >
              <Link href="/about">Meet Peter</Link>
            </Button>
          </div>

          <div className="flex items-center justify-center lg:justify-end lg:self-stretch lg:py-8">
            <div className="relative aspect-[3/4] h-[min(72dvh,640px)] w-full max-w-[min(100%,400px)] overflow-hidden rounded-2xl border border-pln-gold/30 shadow-[0_28px_70px_rgba(0,0,0,0.45)] sm:max-w-[440px] lg:h-[min(78dvh,720px)] lg:max-w-[480px] lg:w-[min(42vw,480px)]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.key}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={active.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 90vw, 480px"
                    priority={activeStep === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pln-navy/90 via-pln-navy/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-pln-gold">
                      {String(activeStep + 1).padStart(2, "0")} /{" "}
                      {String(stepCount).padStart(2, "0")}
                    </p>
                    <p className="mt-2 font-display text-3xl text-pln-ivory lg:text-4xl">
                      {active.label}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <p className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-sans text-[10px] uppercase tracking-[0.4em] text-pln-ivory/35 lg:block">
          Scroll to advance
        </p>
      </div>
    </section>
  );
}
