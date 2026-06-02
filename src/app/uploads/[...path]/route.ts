import { serveMediaFromSegments } from "@/lib/serve-media-file";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await params;
  return serveMediaFromSegments(segments);
}
