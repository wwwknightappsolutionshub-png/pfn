"use client";

import type { YoutubeVideoItem } from "@/lib/youtube";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { YoutubeEmbed } from "@/components/youtube/youtube-embed";
import { cn } from "@/lib/utils";

type Props = {
  video: YoutubeVideoItem | null;
  onClose: () => void;
  variant?: "default" | "light" | "dark";
};

export function YoutubeVideoPlayerModal({
  video,
  onClose,
  variant = "default",
}: Props) {
  if (!video) return null;

  const isLight = variant === "light";

  return (
    <Dialog
      open
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <DialogContent
        className={cn(
          "max-h-[min(92vh,820px)] max-w-[calc(100%-2rem)] gap-0 overflow-hidden p-0 sm:max-w-4xl",
        )}
      >
        <div className="p-4 sm:p-6">
          <YoutubeEmbed youtubeId={video.youtubeId} title={video.title} />
        </div>
        <div className="border-t border-pln-navy/10 px-6 pb-6 pt-4 sm:px-8">
          <DialogTitle className="pr-8 text-left text-xl sm:text-2xl">
            {video.title}
          </DialogTitle>
          {video.description && (
            <DialogDescription
              className={cn(
                "mt-2 text-left text-base leading-relaxed",
                isLight && "text-pln-section-light-muted",
              )}
            >
              {video.description}
            </DialogDescription>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
