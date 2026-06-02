import { youtubeEmbedUrl } from "@/lib/youtube";
import { cn } from "@/lib/utils";

type Props = {
  youtubeId: string;
  title: string;
  className?: string;
};

export function YoutubeEmbed({ youtubeId, title, className }: Props) {
  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-xl bg-pln-navy",
        className,
      )}
    >
      <iframe
        src={youtubeEmbedUrl(youtubeId)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
