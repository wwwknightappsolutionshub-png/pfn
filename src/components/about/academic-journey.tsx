"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type Credential = {
  title: string;
  institution: string;
  detail?: string | null;
};

type JourneyStep = {
  step: string;
  certificate: string;
  institution: string;
  detail?: string;
};

const JOURNEY_CARD_COUNT = 4;

const defaultJourney: JourneyStep[] = [
  {
    step: "01",
    certificate: "First Class Honours",
    institution: "Obafemi Awolowo University",
    detail: "Undergraduate excellence",
  },
  {
    step: "02",
    certificate: "MA with Distinction",
    institution: "SOAS University of London",
    detail: "Graduate studies",
  },
  {
    step: "03",
    certificate: "PhD",
    institution: "University of Nottingham",
    detail: "Doctoral research",
  },
  {
    step: "04",
    certificate: "Research & Teaching",
    institution: "International ministry",
    detail: "Scholarship in practice",
  },
];

function toJourneySteps(credentials?: Credential[] | null): JourneyStep[] {
  const mapped: JourneyStep[] = (credentials ?? [])
    .slice(0, JOURNEY_CARD_COUNT)
    .map((c, i) => ({
      step: String(i + 1).padStart(2, "0"),
      certificate: c.title,
      institution: c.institution,
      detail: c.detail ?? undefined,
    }));

  if (mapped.length >= JOURNEY_CARD_COUNT) {
    return mapped.slice(0, JOURNEY_CARD_COUNT);
  }

  for (let i = mapped.length; i < JOURNEY_CARD_COUNT; i++) {
    const fill = defaultJourney[i];
    if (fill) mapped.push({ ...fill, step: String(i + 1).padStart(2, "0") });
  }

  return mapped.slice(0, JOURNEY_CARD_COUNT);
}

export function AcademicJourney({
  credentials,
}: {
  credentials?: Credential[] | null;
}) {
  const steps = toJourneySteps(credentials);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const cards = root.querySelectorAll<HTMLElement>(".journey-step-card");
    if (!cards.length) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(cards, { opacity: 1, y: 0, clearProps: "transform,opacity" });
      return;
    }

    gsap.set(cards, { opacity: 1, y: 0 });

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        immediateRender: false,
        stagger: 0.12,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          once: true,
          invalidateOnRefresh: true,
        },
      });
      ScrollTrigger.refresh();
    }, root);

    return () => {
      ctx.revert();
      gsap.set(cards, { opacity: 1, y: 0, clearProps: "transform,opacity" });
    };
  }, [steps]);

  return (
    <div ref={ref} className="relative mt-14">
      <div
        className="absolute left-0 right-0 top-[4.5rem] hidden h-px bg-pln-navy/10 lg:block"
        aria-hidden
      />
      <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {steps.slice(0, JOURNEY_CARD_COUNT).map((item, i) => (
          <li key={`${item.step}-${item.certificate}`} className="relative">
            {i < steps.length - 1 && (
              <span
                className="absolute -right-2 top-12 z-10 hidden font-sans text-pln-navy/20 lg:inline"
                aria-hidden
              >
                →
              </span>
            )}
            <article
              className={cn(
                "journey-step-card opacity-100 group flex h-full min-h-[220px] flex-col rounded-2xl border border-pln-navy/10 bg-white p-6",
                "shadow-[0_4px_20px_rgba(11,20,38,0.04)]",
                "transition-all duration-300 ease-out",
                "hover:-translate-y-1.5 hover:border-pln-gold-on-light",
                "hover:bg-gradient-to-b hover:from-white hover:to-[rgba(201,162,39,0.1)]",
                "hover:shadow-[0_20px_48px_rgba(122,95,16,0.2)]",
                "hover:ring-2 hover:ring-pln-gold-on-light/40",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={cn(
                    "font-sans text-xs font-bold tabular-nums tracking-widest",
                    "text-pln-section-light-muted transition-colors duration-300",
                    "group-hover:text-pln-gold-on-light",
                  )}
                >
                  {item.step}
                </span>
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border border-pln-navy/12",
                    "bg-pln-section-light-bg text-pln-navy/30 transition-all duration-300",
                    "group-hover:scale-110 group-hover:border-pln-gold-on-light group-hover:bg-pln-gold/15 group-hover:text-pln-gold-on-light",
                  )}
                >
                  <Award size={18} strokeWidth={1.5} />
                </span>
              </div>
              <p
                className={cn(
                  "mt-6 font-display text-xl font-bold leading-tight text-pln-section-light-heading",
                  "transition-colors duration-300 group-hover:text-pln-gold-on-light",
                )}
              >
                {item.certificate}
              </p>
              <p
                className={cn(
                  "mt-3 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-pln-section-light-muted",
                  "transition-colors duration-300 group-hover:text-pln-section-light-heading",
                )}
              >
                {item.institution}
              </p>
              {item.detail && (
                <p
                  className={cn(
                    "mt-auto pt-4 text-sm leading-relaxed text-pln-section-light-muted",
                    "transition-colors duration-300 group-hover:text-pln-section-light-body",
                  )}
                >
                  {item.detail}
                </p>
              )}
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
