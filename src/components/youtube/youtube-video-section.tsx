import { YoutubeVideoGrid } from "@/components/youtube/youtube-video-grid";
import type { YoutubeVideoItem } from "@/lib/youtube";

type Props = {
  title: string;
  subtitle?: string;
  videos: YoutubeVideoItem[];
  channelUrl?: string | null;
  sectionLabel?: string;
  dark?: boolean;
  variant?: "default" | "light" | "dark";
  scrollOnHover?: boolean;
};

export function YoutubeVideoSection({
  title,
  subtitle,
  videos,
  channelUrl,
  sectionLabel = "Teaching Channel",
  dark = false,
  variant,
  scrollOnHover = true,
}: Props) {
  if (!videos.length) return null;

  const resolvedVariant = variant ?? (dark ? "dark" : "default");
  const isLight = resolvedVariant === "light";
  const isDark = resolvedVariant === "dark";

  return (
    <section
      className={
        isDark
          ? "bg-pln-navy py-28 text-pln-ivory lg:py-40"
          : isLight
            ? "py-20 lg:py-28"
            : "border-y border-pln-charcoal/10 py-28 dark:border-pln-ivory/10 lg:py-40"
      }
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p
          className={`font-sans text-xs font-semibold uppercase tracking-[0.35em] ${
            isLight ? "text-pln-gold-on-light" : "text-pln-gold"
          }`}
        >
          {sectionLabel}
        </p>
        <h2
          className={`mt-5 max-w-2xl font-display text-4xl font-extrabold leading-tight lg:text-5xl ${
            isLight
              ? "border-l-4 border-pln-gold-on-light pl-6 text-pln-section-light-heading"
              : ""
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`mt-6 max-w-xl font-body text-lg leading-relaxed ${
              isDark
                ? "text-pln-ivory/70"
                : isLight
                  ? "text-pln-section-light-muted"
                  : "text-pln-charcoal-muted dark:text-pln-ivory/70"
            }`}
          >
            {subtitle}
          </p>
        )}
        <div className="mt-14">
          <YoutubeVideoGrid
            videos={videos}
            channelUrl={channelUrl}
            scrollOnHover={scrollOnHover}
            variant={isLight ? "light" : isDark ? "dark" : "default"}
          />
        </div>
      </div>
    </section>
  );
}
