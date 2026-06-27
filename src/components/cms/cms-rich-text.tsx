"use client";

import { RichText } from "@payloadcms/richtext-lexical/react";
import { cn } from "@/lib/utils";

type Variant = "light" | "dark" | "article";

const variantClasses: Record<Variant, string> = {
  light:
    "text-pln-section-light-body [&_h2]:text-pln-section-light-heading [&_h3]:text-pln-section-light-heading [&_a]:text-pln-gold-on-light [&_blockquote]:border-pln-gold-on-light [&_blockquote]:text-pln-section-light-muted",
  dark: "text-pln-ivory/85 [&_h2]:text-pln-ivory [&_h3]:text-pln-ivory [&_a]:text-pln-gold [&_blockquote]:border-pln-gold [&_blockquote]:text-pln-ivory/70",
  article:
    "text-pln-charcoal-muted dark:text-pln-ivory/80 [&_h2]:text-pln-charcoal dark:[&_h2]:text-pln-ivory [&_h3]:text-pln-charcoal dark:[&_h3]:text-pln-ivory [&_a]:text-pln-gold-on-light [&_blockquote]:border-pln-gold-on-light [&_blockquote]:text-pln-section-light-muted",
};

type Props = {
  data: unknown;
  className?: string;
  variant?: Variant;
};

export function CmsRichText({ data, className, variant = "light" }: Props) {
  if (!data || typeof data !== "object") return null;

  return (
    <RichText
      data={data as Parameters<typeof RichText>[0]["data"]}
      className={cn(
        "pln-rich-text font-body text-base leading-relaxed",
        "[&_p]:mt-4 [&_p:first-child]:mt-0",
        "[&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold",
        "[&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold",
        "[&_a]:underline [&_a]:underline-offset-2",
        "[&_blockquote]:mt-6 [&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:italic",
        "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6",
        "[&_li]:mt-2",
        variantClasses[variant],
        className,
      )}
    />
  );
}
