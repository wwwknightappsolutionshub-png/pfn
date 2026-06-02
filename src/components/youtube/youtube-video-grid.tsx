"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useCallback, useState, useEffect } from "react";
import { Play } from "lucide-react";
import type { YoutubeVideoItem } from "@/lib/youtube";
import { youtubeThumbnail } from "@/lib/youtube";
import { YoutubeVideoPlayerModal } from "@/components/youtube/youtube-video-player-modal";
import { cn } from "@/lib/utils";

type Props = {
  videos: YoutubeVideoItem[];
  channelUrl?: string | null;
  className?: string;
  variant?: "default" | "light" | "dark";
  /** When true, shows a 4-column grid that scrolls horizontally on mouse move (desktop only) */
  scrollOnHover?: boolean;
};

export function YoutubeVideoGrid({
  videos,
  channelUrl,
  className,
  variant = "default",
  scrollOnHover = true,
}: Props) {
  const isLight = variant === "light";
  const scrollRef = useRef<HTMLDivElement>(null);
  const [playingVideo, setPlayingVideo] = useState<YoutubeVideoItem | null>(
    null,
  );
  const [hoverScrollEnabled, setHoverScrollEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (hover: hover)");
    const update = () => setHoverScrollEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const canHoverScroll = scrollOnHover && hoverScrollEnabled;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canHoverScroll || playingVideo) return;
      const el = scrollRef.current;
      if (!el || el.scrollWidth <= el.clientWidth) return;

      const rect = el.getBoundingClientRect();
      const ratio = Math.min(
        1,
        Math.max(0, (e.clientX - rect.left) / rect.width),
      );
      const maxScroll = el.scrollWidth - el.clientWidth;
      el.scrollLeft = ratio * maxScroll;
    },
    [canHoverScroll, playingVideo],
  );

  if (!videos.length) return null;

  return (
    <div className={cn("relative", className)}>
      <div
        ref={scrollRef}
        onMouseMove={handleMouseMove}
        className={cn(
          "pln-scroll-x",
          canHoverScroll && !playingVideo && "cursor-ew-resize lg:cursor-ew-resize",
        )}
      >
        {videos.map((video) => (
          <button
            key={video.id}
            type="button"
            onClick={() => setPlayingVideo(video)}
            className="group relative min-w-[min(85vw,320px)] flex-shrink-0 snap-start text-left sm:min-w-[calc(50%-8px)] lg:min-w-[calc(25%-12px)]"
          >
            <div className="relative aspect-video overflow-hidden bg-pln-navy">
              <Image
                src={youtubeThumbnail(video.youtubeId)}
                alt={video.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 25vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-pln-navy/30 transition group-hover:bg-pln-navy/10" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-pln-ivory/40 bg-pln-navy/60 text-pln-gold backdrop-blur-sm transition group-hover:scale-110 group-hover:border-pln-gold sm:h-14 sm:w-14">
                  <Play size={20} fill="currentColor" className="sm:hidden" />
                  <Play size={22} fill="currentColor" className="hidden sm:block" />
                </span>
              </span>
            </div>
            <h3
              className={cn(
                "mt-3 font-display text-base leading-snug transition sm:text-lg",
                isLight
                  ? "text-pln-section-light-heading group-hover:text-pln-gold-on-light"
                  : "group-hover:text-pln-gold",
              )}
            >
              {video.title}
            </h3>
            {video.description && (
              <p
                className={cn(
                  "mt-1 line-clamp-2 text-sm",
                  isLight
                    ? "text-pln-section-light-muted"
                    : "text-pln-charcoal-muted dark:text-pln-ivory/60",
                )}
              >
                {video.description}
              </p>
            )}
          </button>
        ))}
      </div>

      {scrollOnHover && videos.length > 4 && (
        <p
          className={cn(
            "mt-3 font-sans text-[10px] uppercase tracking-[0.25em]",
            isLight
              ? "text-pln-section-light-muted"
              : "text-pln-charcoal-muted dark:text-pln-ivory/50",
          )}
        >
          {canHoverScroll
            ? "Move cursor over videos to browse →"
            : "Swipe to browse videos →"}
        </p>
      )}

      {channelUrl && (
        <Link
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "mt-6 inline-block font-sans text-xs font-semibold uppercase tracking-[0.25em] hover:underline sm:mt-8",
            isLight ? "text-pln-gold-on-light" : "text-pln-gold",
          )}
        >
          View full YouTube channel →
        </Link>
      )}

      <YoutubeVideoPlayerModal
        video={playingVideo}
        onClose={() => setPlayingVideo(null)}
        variant={variant}
      />
    </div>
  );
}
