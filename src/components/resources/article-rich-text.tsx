"use client";

import { CmsRichText } from "@/components/cms/cms-rich-text";

type Props = {
  data: unknown;
  className?: string;
};

/** @deprecated Use CmsRichText directly */
export function ArticleRichText({ data, className }: Props) {
  return <CmsRichText data={data} className={className} variant="light" />;
}
