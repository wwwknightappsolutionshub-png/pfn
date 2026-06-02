"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  headline: string;
  subheadline: string;
};

export function CinematicHero({ headline, subheadline }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        scaleX: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      });
      gsap.to(".hero-headline-word", {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      });
      gsap.from(".hero-sub", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 1.2,
        ease: "power2.out",
      });

      if (sectionRef.current) {
        gsap.to(sectionRef.current, {
          opacity: 0.3,
          scale: 0.95,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (lineRef.current) {
        gsap.to(lineRef.current, {
          height: "100vh",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=80%",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const words = headline.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-pln-navy pb-24 pt-32 text-pln-ivory lg:pb-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(201,162,39,0.12),transparent_50%)]" />
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-pln-gold/5 to-transparent" />

      <div
        ref={lineRef}
        className="absolute left-8 top-0 hidden w-px origin-top bg-pln-gold/40 lg:block"
        style={{ height: "0%" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <p className="hero-line mb-8 h-px w-24 origin-left bg-pln-gold" />
        <p className="mb-6 font-sans text-xs uppercase tracking-[0.4em] text-pln-gold">
          Profitable Living Network
        </p>
        <h1 className="max-w-5xl font-display text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.05] tracking-tight">
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="hero-headline-word mr-[0.25em] inline-block translate-y-8 opacity-0"
            >
              {word}
            </span>
          ))}
        </h1>
        <motion.p
          className="hero-sub mt-10 max-w-xl font-body text-xl italic text-pln-ivory/80 lg:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {subheadline}
        </motion.p>
        <div className="mt-20 flex items-center gap-4 font-sans text-xs uppercase tracking-[0.3em] text-pln-ivory/50">
          <span>Scroll to explore</span>
          <span className="inline-block h-px w-16 animate-pulse bg-pln-gold" />
        </div>
      </div>
    </section>
  );
}
