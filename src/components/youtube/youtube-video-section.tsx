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
          ? "bg-pln-navy pln-section text-pln-ivory"
          : isLight
            ? "pln-section-tight"
            : "border-y border-pln-charcoal/10 pln-section dark:border-pln-ivory/10"
      }
    >
      <div className="pln-container">
        <p
          className={`font-sans text-xs font-semibold uppercase tracking-[0.35em] ${
            isLight ? "text-pln-gold-on-light" : "text-pln-gold"
          }`}
        >
          {sectionLabel}
        </p>
        <h2
          className={`mt-4 max-w-2xl pln-section-title sm:mt-5 ${
            isLight
              ? "border-l-4 border-pln-gold-on-light pl-4 text-pln-section-light-heading sm:pl-6"
              : ""
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`mt-4 max-w-xl font-body text-base leading-relaxed sm:mt-6 sm:text-lg ${
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
        <div className="mt-10 sm:mt-12 lg:mt-14">
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
