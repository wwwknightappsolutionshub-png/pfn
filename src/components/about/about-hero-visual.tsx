"use client";

import Image from "next/image";
import { RotatingWisdomWeb } from "@/components/ui/rotating-wisdom-web";

type Props = { portraitUrl: string };

export function AboutHeroVisual({ portraitUrl }: Props) {
  return (
    <div className="relative min-h-[55vh] overflow-hidden border-t border-pln-gold/15 lg:min-h-full lg:border-l lg:border-t-0">
      <RotatingWisdomWeb />
      <Image
        src={portraitUrl}
        alt="Peter Olusanjo"
        fill
        className="z-10 object-cover object-top"
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <div className="absolute inset-0 z-20 bg-gradient-to-l from-transparent via-pln-navy/10 to-pln-navy/40 lg:to-pln-navy/55" />
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-pln-navy/50 via-transparent to-transparent lg:from-pln-navy/30" />
    </div>
  );
}
