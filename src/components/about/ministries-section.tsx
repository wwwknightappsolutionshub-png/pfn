"use client";

import { ABOUT_MINISTRIES } from "@/components/about/about-content";
import { BookConsultationModal } from "@/components/about/book-consultation-modal";

export function MinistriesSection() {
  return (
    <section className="bg-pln-navy py-20 text-pln-ivory lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="text-center font-sans text-xs font-semibold uppercase tracking-[0.35em] text-pln-gold">
          Ministries
        </p>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {ABOUT_MINISTRIES.map(([title, desc], i) => (
            <article
              key={title}
              className="relative border border-pln-gold/25 bg-pln-navy-light/40 p-8 backdrop-blur-sm"
            >
              <span className="font-display text-5xl font-bold text-pln-gold/25">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-pln-ivory">
                {title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-pln-ivory/70">
                {desc}
              </p>
            </article>
          ))}
        </div>
        <div className="flex justify-center">
          <BookConsultationModal />
        </div>
      </div>
    </section>
  );
}
