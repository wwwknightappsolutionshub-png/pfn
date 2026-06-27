import { revalidatePath } from "next/cache";

export function revalidateFrontendPaths(paths: string[]) {
  for (const path of paths) {
    revalidatePath(path);
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
  if (slug) {
    revalidatePath(`/resources/${slug}`);
  }
}
