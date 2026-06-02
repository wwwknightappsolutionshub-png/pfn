import "server-only";

import { createReadStream, existsSync } from "fs";
import path from "path";
import { Readable } from "stream";
import { NextResponse } from "next/server";

const MEDIA_DIR = path.resolve(process.cwd(), "media");

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".mp4": "video/mp4",
};

export function resolveMediaFilePath(segments: string[]): string | null {
  const decoded = segments.map((s) => decodeURIComponent(s)).join("/");
  const mediaRoot = path.resolve(MEDIA_DIR);
  const resolved = path.resolve(MEDIA_DIR, decoded);

  if (
    resolved !== mediaRoot &&
    !resolved.startsWith(`${mediaRoot}${path.sep}`)
  ) {
    return null;
  }

  return resolved;
}

export function serveMediaFile(filePath: string): NextResponse {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] ?? "application/octet-stream";
  const stream = createReadStream(filePath);
  const webStream = Readable.toWeb(stream) as ReadableStream;

  return new NextResponse(webStream, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

export function serveMediaFromSegments(segments: string[]): NextResponse {
  const filePath = resolveMediaFilePath(segments);
  if (!filePath || !existsSync(filePath)) {
    return new NextResponse("Not found", { status: 404 });
  }
  return serveMediaFile(filePath);
}
