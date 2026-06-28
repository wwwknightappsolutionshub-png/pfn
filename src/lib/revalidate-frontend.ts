import { revalidatePath } from "next/cache";

function canRevalidateFrontend(): boolean {
  if (process.env.PAYLOAD_SEEDING === "true") return false;
  return true;
}

export function revalidateFrontendPaths(paths: string[]) {
  if (!canRevalidateFrontend()) return;

  for (const path of paths) {
    try {
      revalidatePath(path);
    } catch {
      // No Next.js static generation context (CLI seed, scripts, etc.)
    }
  }
}

export const PUBLIC_PAGE_PATHS = [
  "/",
  "/about",
  "/services",
  "/events",
  "/resources",
  "/contact",
] as const;

export function revalidateAllPublicPages() {
  revalidateFrontendPaths([...PUBLIC_PAGE_PATHS]);
}

export function revalidateArticlePages(slug?: string | null) {
  revalidateFrontendPaths(["/", "/resources"]);
  if (slug && canRevalidateFrontend()) {
    try {
      revalidatePath(`/resources/${slug}`);
    } catch {
      /* CLI / non-Next context */
    }
  }
}
