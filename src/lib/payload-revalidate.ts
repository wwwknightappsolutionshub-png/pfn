import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";
import {
  revalidateAllPublicPages,
  revalidateArticlePages,
  revalidateFrontendPaths,
} from "@/lib/revalidate-frontend";

export const revalidateOnPublicContentChange: CollectionAfterChangeHook = ({
  doc,
  collection,
}) => {
  if (collection?.slug === "articles" && doc && typeof doc === "object") {
    const slug =
      "slug" in doc && typeof doc.slug === "string" ? doc.slug : undefined;
    revalidateArticlePages(slug);
    return doc;
  }

  revalidateAllPublicPages();
  return doc;
};

export const revalidateOnPublicContentDelete: CollectionAfterDeleteHook = ({
  doc,
  collection,
}) => {
  if (collection?.slug === "articles" && doc && typeof doc === "object") {
    const slug =
      "slug" in doc && typeof doc.slug === "string" ? doc.slug : undefined;
    revalidateArticlePages(slug);
    return doc;
  }

  revalidateAllPublicPages();
  return doc;
};

export function createGlobalRevalidateHook(
  paths: string[],
): GlobalAfterChangeHook {
  return ({ doc }) => {
    revalidateFrontendPaths(paths);
    return doc;
  };
}

export const revalidateHomepageGlobal: GlobalAfterChangeHook = ({ doc }) => {
  revalidateAllPublicPages();
  return doc;
};
