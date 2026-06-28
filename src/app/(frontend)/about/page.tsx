import { AboutPageEditorial } from "@/components/about/about-page-editorial";
import { getAboutPage } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { getMediaUrlOrPlaceholder } from "@/lib/media";
import { unstable_noStore as noStore } from "next/cache";

export const metadata = buildMetadata({
  title: "About | 148Inspirations",
  description:
    "Meet Peter Olusanjo and discover the mission of 148Inspirations — teaching a godly and profitable life.",
  path: "/about",
});

export default async function AboutPage() {
  noStore();

  const about = await getAboutPage();

  return (
    <AboutPageEditorial
      about={about}
      portraitUrl={getMediaUrlOrPlaceholder(about?.portrait, "portrait")}
    />
  );
}
