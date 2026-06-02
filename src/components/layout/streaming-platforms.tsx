import Link from "next/link";
import {
  normalizeStreamingPlatforms,
  STREAMING_PLATFORM_META,
} from "@/lib/streaming-platforms";
import { cn } from "@/lib/utils";

type Props = {
  links?: { platform?: string | null; url: string }[] | null;
  className?: string;
  variant?: "dark" | "light";
};

export function StreamingPlatforms({
  links,
  className,
  variant = "dark",
}: Props) {
  const platforms = normalizeStreamingPlatforms(links);
  const isDark = variant === "dark";

  return (
    <div className={cn(className)}>
      <p
        className={cn(
          "mb-4 font-sans text-xs font-semibold uppercase tracking-[0.25em]",
          isDark ? "text-pln-gold" : "text-pln-gold-on-light",
        )}
      >
        Streaming platforms
      </p>
      <ul className="flex flex-wrap gap-3">
        {platforms.map(({ platform, url }) => {
          const meta = STREAMING_PLATFORM_META[platform];
          const Icon = meta.Icon;
          return (
            <li key={platform}>
              <Link
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2.5 rounded-full border px-4 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.12em] transition",
                  isDark
                    ? "border-pln-ivory/20 bg-pln-ivory/5 text-pln-ivory hover:border-pln-gold hover:bg-pln-gold/10 hover:text-pln-gold"
                    : "border-pln-navy/12 bg-white text-pln-section-light-heading hover:border-pln-gold-on-light hover:text-pln-gold-on-light",
                )}
                aria-label={`${meta.label} (opens in new tab)`}
              >
                <Icon size={16} strokeWidth={1.5} aria-hidden />
                {meta.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
