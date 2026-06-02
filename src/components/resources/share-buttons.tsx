"use client";

import { Share2 } from "lucide-react";

type Props = { url: string; title: string };

export function ShareButtons({ url, title }: Props) {
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);

  const links = [
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encoded}&text=${text}`,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
    },
  ];

  return (
    <div className="mt-8 flex items-center gap-4">
      <Share2 size={16} className="text-pln-gold" />
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-xs uppercase tracking-[0.15em] text-pln-ivory/60 hover:text-pln-gold"
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}
