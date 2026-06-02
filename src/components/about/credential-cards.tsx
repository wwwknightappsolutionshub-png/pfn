"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const defaultCredentials = [
  {
    title: "PhD",
    institution: "University of Nottingham",
    detail: "Doctoral research excellence",
  },
  {
    title: "First Class",
    institution: "Obafemi Awolowo University",
    detail: "Outstanding undergraduate achievement",
  },
  {
    title: "Distinction",
    institution: "SOAS University of London",
    detail: "Graduate studies with distinction",
  },
];

type Credential = {
  title: string;
  institution: string;
  detail?: string | null;
};

export function CredentialCards({
  credentials,
}: {
  credentials?: Credential[] | null;
}) {
  const items = credentials?.length ? credentials : defaultCredentials;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".credential-card", {
        y: 60,
        opacity: 0,
        rotateX: 8,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="grid gap-6 md:grid-cols-3"
      style={{ perspective: "1000px" }}
    >
      {items.map((cred, i) => (
        <div
          key={`${cred.title}-${i}`}
          className="credential-card rounded-2xl border border-pln-navy/10 bg-white p-8 shadow-[0_8px_28px_rgba(11,20,38,0.06)] transition hover:border-pln-gold-on-light/40 hover:shadow-[0_12px_36px_rgba(11,20,38,0.1)]"
        >
          <p className="font-display text-4xl font-bold text-pln-gold-on-light">
            {cred.title}
          </p>
          <p className="mt-4 font-sans text-sm font-semibold uppercase tracking-[0.15em] text-pln-section-light-heading">
            {cred.institution}
          </p>
          {cred.detail && (
            <p className="mt-3 text-sm leading-relaxed text-pln-section-light-muted">
              {cred.detail}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
