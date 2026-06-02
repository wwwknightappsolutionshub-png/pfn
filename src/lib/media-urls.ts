/** Client-safe Payload media URL helpers (no Node.js APIs) */

export function mediaFilenameToUploadsPath(filename: string): string {
  const segments = filename.split("/").map((part) => encodeURIComponent(part));
  return `/uploads/${segments.join("/")}`;
}

/** Map legacy Payload URLs stored in the CMS to the public uploads route */
export function normalizeMediaSrc(url: string): string {
  if (url.startsWith("/uploads/")) return url;
  const legacy = url.match(/\/api\/media\/file\/(.+)$/);
  if (legacy?.[1]) {
    const decoded = decodeURIComponent(legacy[1]);
    return mediaFilenameToUploadsPath(decoded);
  }
  return url;
}
