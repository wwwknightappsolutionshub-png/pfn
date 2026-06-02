"use client";

import { RichText } from "@payloadcms/richtext-lexical/react";
import { cn } from "@/lib/utils";

type Props = {
  data: unknown;
  className?: string;
};

export function ArticleRichText({ data, className }: Props) {
  if (!data || typeof data !== "object") return null;

  return (
    <RichText
      data={data as Parameters<typeof RichText>[0]["data"]}
      className={cn(
        "pln-rich-text font-body text-base leading-relaxed text-pln-section-light-body",
        "[&_p]:mt-4 [&_p:first-child]:mt-0",
        "[&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-pln-section-light-heading",
        "[&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-pln-section-light-heading",
        "[&_a]:text-pln-gold-on-light [&_a]:underline [&_a]:underline-offset-2",
        "[&_blockquote]:mt-6 [&_blockquote]:border-l-4 [&_blockquote]:border-pln-gold-on-light [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-pln-section-light-muted",
        "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6",
        "[&_li]:mt-2",
        className,
      )}
    />
  );
}
