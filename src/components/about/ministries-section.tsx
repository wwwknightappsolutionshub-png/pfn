"use client";

import { ABOUT_MINISTRIES } from "@/components/about/about-content";
import { BookConsultationModal } from "@/components/about/book-consultation-modal";

export function MinistriesSection() {
  return (
    <section className="bg-pln-navy pln-section-tight text-pln-ivory">
      <div className="pln-container">
        <p className="text-center font-sans text-xs font-semibold uppercase tracking-[0.35em] text-pln-gold">
          Ministries
        </p>
        <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ABOUT_MINISTRIES.map(([title, desc], i) => (
            <article
              key={title}
              className="relative border border-pln-gold/25 bg-pln-navy-light/40 p-6 backdrop-blur-sm sm:p-8"
            >
              <span className="font-display text-4xl font-bold text-pln-gold/25 sm:text-5xl">
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
