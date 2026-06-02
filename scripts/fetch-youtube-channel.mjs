/**
 * Fetches recent public videos from a YouTube @handle (no API key).
 * Usage: node scripts/fetch-youtube-channel.mjs [the148peter]
 */

const handle = (process.argv[2] || "the148peter").replace(/^@/, "");
const profileUrl = `https://www.youtube.com/@${handle}`;
const videosUrl = `${profileUrl}/videos`;

const SKIP_TITLE = /keyboard shortcuts|playback|subtitles|spherical|general/i;

async function fetchHtml(target) {
  const res = await fetch(target, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${target}`);
  return res.text();
}

function extractChannelId(page) {
  return (
    page.match(/"browseId":"(UC[^"]+)"/)?.[1] ??
    page.match(/"externalId":"(UC[^"]+)"/)?.[1] ??
    page.match(/"channelId":"(UC[^"]+)"/)?.[1] ??
    page.match(/channel_id=(UC[^"&]+)/)?.[1] ??
    null
  );
}

function collectVideos(obj, out = []) {
  if (!obj || typeof obj !== "object") return out;

  if (obj.gridVideoRenderer) {
    const g = obj.gridVideoRenderer;
    const title = g.title?.simpleText ?? g.title?.runs?.[0]?.text ?? null;
    const id = g.videoId;
    if (id && title && !SKIP_TITLE.test(title)) {
      out.push({ youtubeId: id, title });
    }
  }

  if (obj.richItemRenderer?.content?.videoRenderer) {
    const v = obj.richItemRenderer.content.videoRenderer;
    const title = v.title?.simpleText ?? v.title?.runs?.[0]?.text ?? null;
    const id = v.videoId;
    if (id && title && !SKIP_TITLE.test(title)) {
      out.push({ youtubeId: id, title });
    }
  }

  for (const v of Object.values(obj)) {
    if (Array.isArray(v)) v.forEach((item) => collectVideos(item, out));
    else collectVideos(v, out);
  }
  return out;
}

async function fetchFromRss(channelId) {
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const res = await fetch(rssUrl);
  if (!res.ok) return [];
  const xml = await res.text();
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];
  return entries
    .map((entry) => {
      const block = entry[1];
      const id =
        block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ??
        block.match(/watch\?v=([^"&]+)/)?.[1];
      const title = block.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
      return id && title ? { youtubeId: id, title } : null;
    })
    .filter(Boolean);
}

async function enrichTitles(items) {
  const out = [];
  for (const item of items) {
    try {
      const oembed = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${item.youtubeId}&format=json`,
      );
      if (oembed.ok) {
        const data = await oembed.json();
        if (data.title) {
          out.push({ ...item, title: data.title });
          continue;
        }
      }
    } catch {
      /* use fallback title */
    }
    out.push(item);
  }
  return out;
}

const [profileHtml, html] = await Promise.all([
  fetchHtml(profileUrl),
  fetchHtml(videosUrl),
]);

const channelId = extractChannelId(profileHtml) ?? extractChannelId(html);

let videos = [];
if (channelId) {
  videos = await fetchFromRss(channelId);
}

const dataMatch = html.match(/var ytInitialData = (\{.+?\});<\/script>/s);
if (!videos.length && dataMatch) {
  try {
    videos = collectVideos(JSON.parse(dataMatch[1]));
  } catch (e) {
    console.error("JSON parse failed:", e.message);
  }
}

if (!videos.length) {
  const idRe = /"videoId":"([a-zA-Z0-9_-]{11})"/g;
  const ids = [...html.matchAll(idRe)].map((m) => m[1]);
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) continue;
    seen.add(id);
    videos.push({ youtubeId: id, title: `Video ${seen.size}` });
  }
}

const unique = [];
const seenIds = new Set();
for (const v of videos) {
  if (seenIds.has(v.youtubeId)) continue;
  seenIds.add(v.youtubeId);
  unique.push(v);
}

const filtered = unique.filter((v) => !SKIP_TITLE.test(v.title));
const enriched = await enrichTitles(filtered.slice(0, 16));

console.log(
  JSON.stringify(
    { handle, channelId, count: enriched.length, videos: enriched },
    null,
    2,
  ),
);
