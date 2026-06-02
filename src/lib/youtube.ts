export type YoutubeVideoItem = {
  id: number;
  title: string;
  youtubeId: string;
  description?: string | null;
};

export function youtubeThumbnail(id: string, quality: "hq" | "mq" = "hq") {
  const file = quality === "hq" ? "hqdefault.jpg" : "mqdefault.jpg";
  return `https://img.youtube.com/vi/${id}/${file}`;
}

export function youtubeWatchUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function youtubeEmbedUrl(id: string) {
  return `https://www.youtube.com/embed/${id}?rel=0&autoplay=1`;
}

/** Extract video ID from youtube.com / youtu.be URLs */
export function parseYoutubeIdFromUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.replace(/^\//, "").split("/")[0];
      return id || null;
    }
    if (
      parsed.hostname.includes("youtube.com") ||
      parsed.hostname.includes("youtube-nocookie.com")
    ) {
      const v = parsed.searchParams.get("v");
      if (v) return v;
      const shorts = parsed.pathname.match(/^\/shorts\/([^/]+)/);
      if (shorts?.[1]) return shorts[1];
      const embed = parsed.pathname.match(/^\/embed\/([^/]+)/);
      if (embed?.[1]) return embed[1];
    }
  } catch {
    return null;
  }
  return null;
}
