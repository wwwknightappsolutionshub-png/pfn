"use client";

import Image from "next/image";
import { RotatingWisdomWeb } from "@/components/ui/rotating-wisdom-web";
import { PLACEHOLDER_IMAGES } from "@/lib/placeholders";

export function ServicesHero() {
  return (
    <section className="grid min-h-0 border-b border-pln-gold/20 bg-pln-navy text-pln-ivory lg:min-h-[65vh] lg:grid-cols-2">
      <div className="flex flex-col justify-center px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-28 xl:px-16">
        <div className="w-full max-w-xl lg:mx-auto lg:max-w-lg lg:translate-x-6 xl:max-w-xl xl:translate-x-8">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-pln-gold">
            Services
          </p>
          <h1 className="mt-4 border-l-4 border-pln-gold pl-4 pln-page-title sm:mt-6 sm:pl-6 lg:text-6xl">
            Wisdom applied with excellence
          </h1>
          <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-pln-ivory/80 sm:mt-8 sm:text-lg">
            Partner with PLN for mentoring, consultancy, conferences, and speaking
            — each engagement designed for transformation and Kingdom impact.
          </p>
        </div>
      </div>

      <div className="relative min-h-[36vh] overflow-hidden border-t border-pln-gold/15 sm:min-h-[42vh] lg:min-h-full lg:border-l lg:border-t-0">
        <RotatingWisdomWeb />
        <Image
          src={PLACEHOLDER_IMAGES.article}
          alt=""
          fill
          className="z-10 object-cover object-center opacity-40 mix-blend-luminosity"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        <div className="absolute inset-0 z-20 bg-gradient-to-l from-pln-navy/90 via-pln-navy/50 to-pln-navy/20" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-pln-navy/60 via-transparent to-pln-navy/25" />
        <div className="absolute bottom-8 left-8 right-8 z-30 hidden lg:block">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-pln-gold">
            Mentoring · Consultancy · Conferences
          </p>
        </div>
      </div>
    </section>
  );
}
